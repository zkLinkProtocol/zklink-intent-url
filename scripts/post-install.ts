import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '..');
const libsDir = path.join(rootDir, 'libs');

fs.readdirSync(libsDir).forEach((dir) => {
  const fullPath = path.join(libsDir, dir);
  if (fs.statSync(fullPath).isDirectory()) {
    if (!fs.existsSync(path.join(fullPath, 'package.json'))) {
      console.warn(`No package.json found in ${fullPath}`);
      return;
    }
    console.log(`Installing dependencies for ${dir}...`);
    execSync('npm install', { stdio: 'inherit', cwd: fullPath });
  }
});
console.log('All dependencies installed.');
process.exit(0);
