import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '..');
const libsDir = path.join(rootDir, 'libs');

fs.readdirSync(libsDir).forEach((dir) => {
  const fullPath = path.join(libsDir, dir);
  if (fs.statSync(fullPath).isDirectory()) {
    console.log(`Installing dependencies for ${dir}...`);
    execSync('yarn install', { stdio: 'inherit', cwd: fullPath });
  }
});

console.log('All dependencies installed.');
