import { ExecOptions } from 'child_process';
import { execPromise } from '../utils/exec-promise';

type NpmCliDriverConstructor = {
  execConfig?: ExecOptions;
};

export const NpmCliDriver = ({
  execConfig = {},
}: NpmCliDriverConstructor = {}) => {
  const exec = (command: string) => execPromise(command, execConfig);

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
