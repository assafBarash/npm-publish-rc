import { promises as fs } from 'fs';

export const JsonManager = async () => {
  const state = JSON.parse(await fs.readFile('package.json', 'utf8')) as Record<
    string,
    unknown
  >;

  const manager = {
    write: () => fs.writeFile('package.json', JSON.stringify(state, null, 2)),
    getVersion: () => state.version as string,
    updateVersion: (newVersion: string) => {
      state.version = newVersion;
    },
  };

  return manager;
};
