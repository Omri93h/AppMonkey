#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

// parse arguments manually
const args = process.argv.slice(2);
const [appDir, appName] = args;

if (!appDir || !appName) {
  console.error('Usage: create-app <app-dir> "<app-name>"');
  process.exit(1);
}

const templateDir = path.resolve(__dirname, 'template');
const targetDir   = path.resolve(process.cwd(), 'apps', appDir);

(async function() {
  try {
    await fs.copy(templateDir, targetDir);
    const pkgPath = path.join(targetDir, 'package.json');
    const pkg     = await fs.readJson(pkgPath);
    pkg.name        = appDir;
    pkg.description = appName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2, EOL: '\n' });
    console.log('✔ Created app "' + appName + '" at apps/' + appDir);
    process.exit(0);
  } catch (err) {
    console.error('✖ Failed to create app "' + appName + '":', err);
    process.exit(1);
  }
})();
