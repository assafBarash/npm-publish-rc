import { NpmPackageDriver } from './drivers/npm-package-driver';
import { getRcVersion } from './logic/get-rc-version/get-rc-version';
import { processArgs } from './process-args';
import { NpmCliDriver } from './drivers/npm-cli-driver';
import { GitDriver } from './drivers/git-driver';

const main = async () => {
  const { dryRun, rc } = processArgs();

  const npmPackageDriver = await NpmPackageDriver();
  const npmCliDrier = NpmCliDriver();
  const gitDriver = GitDriver();
  const rcName = typeof rc === 'string' ? rc : gitDriver.getCurrentBranchName();

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
    npmCliDrier.build();
    await npmPackageDriver.updateVersion(newVersion);
    npmCliDrier.publish({ tag: 'rc' });
  }
};

main();
