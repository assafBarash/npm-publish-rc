import {
  getCurrentBranchName,
  getCurrentBranchNameCommandString,
} from './get-branch-name';
import { expect, test } from '@jest/globals';
import { CpTestkit } from '../test-utils/cp-testkit';

jest.mock('child_process');

describe('getCurrentBranchName', () => {
  const cpTestkit = CpTestkit();
  beforeEach(() => {
    cpTestkit.reset();
  });

  test('getCurrentBranchName should return the current branch name', () => {
    cpTestkit
      .mockExecSync({
        input: getCurrentBranchNameCommandString,
        output: 'main',
      })
      .setup();

    const branchName = getCurrentBranchName();
    expect(branchName).toEqual('main');
  });

  test('getCurrentBranchName should handle errors gracefully', () => {
    cpTestkit
      .mockExecSync({
        input: getCurrentBranchNameCommandString,
        output: null,
      })
      .setup();

    const branchName = getCurrentBranchName();
    expect(branchName).toEqual(null);
  });
});
