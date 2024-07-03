import { processArgs } from './process-args';
import { publishRc } from './logic/publish-rc';
import { getRcName } from './logic/get-rc-name';
import { getVersionByPackage } from './logic/get-version-by-packge';

const main = async () => {
  const { dryRun, rc } = processArgs();

  const rcName = await getRcName(rc);
  console.log('## RC Name:', rcName);

  const newVersion = await getVersionByPackage(rcName);

  if (dryRun) console.log('## RC Version:', newVersion);
  else publishRc(newVersion);
};

main();
