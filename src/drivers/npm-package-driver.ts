import fs from 'fs/promises';
import { ErrorCodes } from '../utils/error-codes';

export const NpmPackageDriver = async () => {
  const state = await readPackageJson();

  const driver = {
    getVersion: () => state.version as string,
    updateVersion: async (newVersion: string) => {
      state.version = newVersion;
      await fs.writeFile('package.json', JSON.stringify(state, null, 2));
    },
  };

  return driver;
};

const readPackageJson = async () => {
  try {
    const state = JSON.parse(
      await fs.readFile('package.json', 'utf8'),
    ) as Record<string, unknown>;
    return state;
  } catch (e) {
    throw new Error(ErrorCodes.InvalidPackageJson);
  }
};
