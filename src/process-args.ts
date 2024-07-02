import mri from 'mri';

type ProcessArgs = {
  dryRun: boolean;
};

export const processArgs = (): ProcessArgs => {
  return mri(process.argv.slice(2), {
    alias: {
      'dry-run': 'dryRun',
    },
  });
};
