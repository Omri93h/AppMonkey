import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'core-ui': path.resolve(__dirname, '../../packages/core-ui/src')
    }
  }
});
