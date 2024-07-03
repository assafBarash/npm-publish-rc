import { NpmCliDriver } from '../drivers/npm-cli-driver';
import { NpmPackageDriver } from '../drivers/npm-package-driver';

export const publishRc = async (newVersion: string) => {
  const npmPackageDriver = await NpmPackageDriver();
  const npmCliDrier = NpmCliDriver();

  await npmCliDrier.build();
  await npmPackageDriver.updateVersion(newVersion);
  await npmCliDrier.publish({ tag: 'rc' });
};
