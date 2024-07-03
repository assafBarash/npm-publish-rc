import { GitDriver } from '../drivers/git-driver';

export const getRcName = async (rc: string) => {
  const rcName = await (typeof rc === 'string'
    ? rc
    : GitDriver().getCurrentBranchName());

  if (!rcName) throw new Error('INVALID_RC_NAME');
  else return rcName;
};
