import { getCurrentBranchName } from './get-branch-name';
import { expect, test } from '@jest/globals';

test('getCurrentBranchName should return the current branch name', () => {
  const branchName = getCurrentBranchName();
  expect(branchName).toEqual('main');
});

test('getCurrentBranchName should handle errors gracefully', () => {
  const branchName = getCurrentBranchName({
    execSyncConfig: { cwd: '../../' },
  });
  expect(branchName).toEqual(null);
});
