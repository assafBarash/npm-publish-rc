const child_process = require('child_process');

// Override execSync method
child_process.execSync = jest.fn();

export const CpTestkit = () => {
  let counter = 0;
  let stack: MockExecSyncParams[] = [];

  const testkit = {
    reset: () => {
      stack = [];
      counter = 0;
    },
    mockExecSync: (params: MockExecSyncParams) => {
      stack.push(params);
      return testkit;
    },
    setup: () => {
      // Set the mock implementation to return the expected output
      child_process.execSync.mockImplementation((input: string) => {
        const params = stack[counter++];
        if (params.input === input) {
          return params.output;
        } else {
          throw new Error(
            `MOCK_ERROR:: command not found ${input}; expected ${params.input}`,
          );
        }
      });
    },
  };
  return testkit;
};

type MockExecSyncParams = {
  input: string;
  output: string | null;
};
