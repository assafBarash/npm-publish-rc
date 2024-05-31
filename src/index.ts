import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import { getCurrentBranchName } from './get-branch-name/get-branch-name';

const main = () => {
  const branchName = getCurrentBranchName();

  execSync('npm run build', { stdio: 'inherit' });
  execSync('npm version pre', { stdio: 'inherit' });
};

main();
