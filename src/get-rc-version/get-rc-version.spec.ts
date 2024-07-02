import { getRcVersion } from './get-rc-version';

describe('getCurrentBranchName', () => {
  test('should get new version name when pre doesnt exist', () => {
    const newVersion = getRcVersion({
      semanticVersion: '1.2.3',
      rcName: 'rc',
    });

    expect(newVersion).toEqual('1.2.3-rc.0');
  });

  test('should get new version name when pre exists', () => {
    const newVersion = getRcVersion({
      semanticVersion: '1.2.3',
      rcName: 'rc.0',
    });

    expect(newVersion).toEqual('1.2.3-rc.1');
  });

  test('should sanitize partially valid semantic version', () => {
    const newVersion = getRcVersion({
      semanticVersion: '1.2.3-rc.4',
      rcName: 'rc',
    });

    expect(newVersion).toEqual('1.2.3-rc.5');
  });

  test('should throw error when semantic version is invalid', () => {
    expect(() =>
      getRcVersion({
        semanticVersion: '1.2.INVALID',
        rcName: 'rc.0',
      }),
    ).toThrow('INVALID_SEMANTIC_VERSION');
  });

  test('should infer RC from semanticVersion when rcName is included in it', () => {
    const newVersion = getRcVersion({
      semanticVersion: '1.2.3-rc.0',
      rcName: 'rc',
    });
    expect(newVersion).toBe('1.2.3-rc.1');
  });

  test('should override semanticVersion pre when rcName is not included in it', () => {
    const newVersion = getRcVersion({
      semanticVersion: '1.2.3-rc.0',
      rcName: 'rcA',
    });
    expect(newVersion).toBe('1.2.3-rcA.0');
  });
});
