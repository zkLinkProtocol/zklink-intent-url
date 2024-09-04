import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '..');
const libsDir = path.join(rootDir, 'libs');

fs.readdirSync(libsDir).forEach((dir) => {
  const fullPath = path.join(libsDir, dir);
  const packageJsonPath = path.join(fullPath, 'package.json');
  const nodeModulesPath = path.join(fullPath, 'node_modules');

  if (fs.statSync(fullPath).isDirectory()) {
    if (!fs.existsSync(path.join(fullPath, 'package.json'))) {
      console.warn(`No package.json found in ${fullPath}`);
      return;
    }

    // delete node_modules folder
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`Deleting node_modules for ${dir}...`);
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    }

    if (fs.existsSync(packageJsonPath)) {
      console.log(`Installing dependencies for ${dir}...`);
      execSync('npm install', { stdio: 'inherit', cwd: fullPath });
    }
  }
});

console.log('All dependencies installed.');
process.exit(0);
