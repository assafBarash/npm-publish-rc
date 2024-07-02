type Props = {
  semanticVersion: string;
  rcName: string;
};

export const getRcVersion = ({ rcName, semanticVersion }: Props): string => {
  if (semanticVersion.includes(rcName)) {
    const [sv, rc] = semanticVersion.split('-');
    return getRcVersion({ rcName: rc, semanticVersion: sv });
  }
  return `${sanitizeSemanticVersion(semanticVersion)}-${calcRc(rcName)}.${clacPre(rcName)}`;
};

const clacPre = (rcName: string) => {
  const pre = parseInt(rcName.split('.').pop() as string);
  return isNaN(pre) ? 0 : pre + 1;
};

const calcRc = (rcName: string) => {
  const [pre, ...rest] = rcName.split('.').reverse();
  return isNaN(parseInt(pre)) ? pre : rest.reverse().join('.');
};

const sanitizeSemanticVersion = (semanticVersion: string) => {
  const [major, minor, patch] = semanticVersion
    .split('.')
    .map(extractFirstNumber);

  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    throw new Error('INVALID_SEMANTIC_VERSION');
  }

  return `${major}.${minor}.${patch}`;
};

const extractFirstNumber = (input: string) => {
  // Use a regular expression to match the first sequence of digits
  const match = input.match(/^\d+/);
  // If a match is found, convert it to a number and return it
  if (match) {
    return Number(match[0]);
  } else {
    // If no match is found, return NaN
    return NaN;
  }
};
