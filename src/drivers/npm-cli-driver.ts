import { execSync, ExecSyncOptionsWithBufferEncoding } from 'child_process';

type NpmCliDriverConstructor = {
  execConfig?: ExecSyncOptionsWithBufferEncoding;
};

export const NpmCliDriver = ({
  execConfig = {
    stdio: 'inherit',
  },
}: NpmCliDriverConstructor = {}) => {
  const exec = (command: string) => execSync(command, execConfig);

  const driver = {
    build: () => exec('npm run build'),
    publish: ({ tag = 'rc' }: PublishParams) =>
      exec(`npm publish --tag ${tag}`),
  };

  return driver;
};

type PublishParams = {
  tag: string;
};
