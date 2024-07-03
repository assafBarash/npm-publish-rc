import { ExecSyncOptions, execSync } from 'child_process';

export const GitDriver = ({ execConfig }: GitDriverConstructor = {}) => {
  const exec = (command: string) => execSync(command, execConfig);
  const driver = {
    getCurrentBranchName: (): string | null => {
      try {
        const stdout = exec('git rev-parse --abbrev-ref HEAD');
        return stdout.toString().trim();
      } catch (error) {
        console.error(
          'Failed to get current branch name:',
          (error as Error).message,
        );
        return null;
      }
    },
  };

  return driver;
};

type GitDriverConstructor = {
  execConfig?: ExecSyncOptions;
};
