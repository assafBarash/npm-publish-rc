import { ExecOptions } from 'child_process';
import { execPromise } from '../utils/exec-promise';

type GitDriverConstructor = {
  execConfig?: ExecOptions;
};

export const GitDriver = ({ execConfig }: GitDriverConstructor = {}) => {
  const exec = (command: string) => execPromise(command, execConfig);
  const driver = {
    getCurrentBranchName: async (): Promise<string | null> => {
      try {
        const stdout = await exec('git rev-parse --abbrev-ref HEAD');
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
