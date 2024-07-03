import { NpmPackageDriver } from '../drivers/npm-package-driver';
import { getRcVersion } from './get-rc-version/get-rc-version';

export const getVersionByPackage = async (rcName: string) => {
  const npmPackageDriver = await NpmPackageDriver();
  return getRcVersion({
    semanticVersion: npmPackageDriver.getVersion(),
    rcName,
  });
};
