#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const rootPkg = path.join(process.cwd(), 'package.json');

function replacePlaceholders(dir, replacements) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) replacePlaceholders(fullPath, replacements);
    else if (entry.isFile() && entry.name !== 'favicon.png') {
      let content = fs.readFileSync(fullPath, 'utf8');
      for (const [key, value] of Object.entries(replacements)) {
        content = content.split(key).join(value);
      }
      fs.writeFileSync(fullPath, content);
    }
  }
}

const program = new Command();

program
  .name('create-app')
  .description('Generate a new AppMonkey app from template')
  .arguments('<dir>')
  .option('-n, --name <displayName>', 'Display name/title')
  .action((dir, options) => {
    const templateDir = path.join(__dirname, 'template');
    const targetDir = path.join(process.cwd(), 'apps', dir);
    const displayName = options.name || dir;

    if (fs.existsSync(targetDir)) {
      console.error('Directory apps/' + dir + ' already exists');
      process.exit(1);
    }

    // 1) Copy template
    fs.copySync(templateDir, targetDir);

    // Explicitly copy favicon as binary to avoid corruption
    fs.copyFileSync(
      path.join(templateDir, 'public/favicon.png'),
      path.join(targetDir, 'public/favicon.png')
    );

    // 2) Replace placeholders (excluding favicon.png)
    replacePlaceholders(targetDir, {
      '__APP_NAME__': displayName,
      '__APP_DIR__': dir
    });

    // 3) Patch root package.json workspaces
    const pkg = fs.readJSONSync(rootPkg);
    const ws = new Set(pkg.workspaces);
    ws.add(`apps/${dir}`);
    pkg.workspaces = Array.from(ws);
    fs.writeJSONSync(rootPkg, pkg, { spaces: 2 });
    console.log(`Added apps/${dir} to root workspaces`);

    // 4) Install deps
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('Done! cd apps/' + dir + ' && npm run dev');
  });

program.parse(process.argv);
