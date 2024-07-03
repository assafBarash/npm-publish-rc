import { execSync } from 'child_process';
import { getCurrentBranchName } from './get-branch-name/get-branch-name';
import { NpmPackageDriver } from './npm-package-manager';
import { getRcVersion } from './get-rc-version/get-rc-version';
import { processArgs } from './process-args';

const main = async () => {
  const { dryRun, rc } = processArgs();

  const npmPackageDriver = await NpmPackageDriver();
  const rcName = typeof rc === 'string' ? rc : getCurrentBranchName();

  if (!rcName) {
    throw new Error('Branch name not found');
  }

  const newVersion = getRcVersion({
    semanticVersion: npmPackageDriver.getVersion(),
    rcName,
  });

  if (dryRun) {
    console.log('## RC Version:', newVersion);
  } else {
    execSync('npm run build', { stdio: 'inherit' });
    // npmDriver.build();
    await npmPackageDriver.updateVersion(newVersion);
    execSync('npm publish --tag rc', { stdio: 'inherit' });
    // npmDriver.publish({ tag: 'rc' });
  }
};

main();
