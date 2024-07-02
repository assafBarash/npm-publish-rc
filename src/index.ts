import { execSync } from 'child_process';
import { getCurrentBranchName } from './get-branch-name/get-branch-name';
import { JsonManager } from './json-manager';
import { getRcVersion } from './get-rc-version/get-rc-version';
import { processArgs } from './process-args';

const main = async () => {
  const { dryRun, rc } = processArgs();

  const jsonManager = await JsonManager();
  const rcName = typeof rc === 'string' ? rc : getCurrentBranchName();

  if (!rcName) {
    throw new Error('Branch name not found');
  }

  const newVersion = getRcVersion({
    semanticVersion: jsonManager.getVersion(),
    rcName,
  });

  if (dryRun) {
    console.log('## RC Version:', newVersion);
  } else {
    execSync('npm run build', { stdio: 'inherit' });
    jsonManager.updateVersion(newVersion);
    jsonManager.write();
    execSync('npm publish --tag rc', { stdio: 'inherit' });
  }
};

main();
