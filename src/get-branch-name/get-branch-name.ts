import { ExecSyncOptions, execSync } from 'child_process';

type Params = {
  execSyncConfig?: ExecSyncOptions;
};

export const getCurrentBranchName = ({ execSyncConfig }: Params = {}):
  | string
  | null => {
  try {
    const stdout = execSync('git rev-parse --abbrev-ref HEAD', execSyncConfig);
    return stdout.toString().trim();
  } catch (error) {
    console.error(
      'Failed to get current branch name:',
      (error as Error).message,
    );
    return null;
  }
};
