import { execSync } from 'child_process';
import { getCurrentBranchName } from './get-branch-name/get-branch-name';
import { JsonManager } from './json-manager';
import { getRcVersion } from './get-rc-version/get-rc-version';

const main = async () => {
  const branchName = getCurrentBranchName();
  const jsonManager = await JsonManager();

  if (!branchName) {
    throw new Error('Branch name not found');
  }

  const newVersion = getRcVersion({
    semanticVersion: jsonManager.getVersion(),
    rcName: branchName,
  });

  execSync('npm run build', { stdio: 'inherit' });
  jsonManager.updateVersion(newVersion);
  jsonManager.write();
};

main();
