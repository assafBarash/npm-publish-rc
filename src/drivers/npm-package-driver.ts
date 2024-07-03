import fs from 'fs/promises';

export const NpmPackageDriver = async () => {
  const state = JSON.parse(await fs.readFile('package.json', 'utf8')) as Record<
    string,
    unknown
  >;

  const manager = {
    getVersion: () => state.version as string,
    updateVersion: async (newVersion: string) => {
      state.version = newVersion;
      await fs.writeFile('package.json', JSON.stringify(state, null, 2));
    },
  };

  return manager;
};
