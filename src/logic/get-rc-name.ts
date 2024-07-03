import { GitDriver } from '../drivers/git-driver';
import { ErrorCodes } from '../utils/error-codes';

export const getRcName = async (rc: string) => {
  const rcName = await (typeof rc === 'string'
    ? rc
    : GitDriver().getCurrentBranchName());

  if (!rcName) throw new Error(ErrorCodes.InvalidRcName);
  else return rcName;
};
