import {execSync} from 'child_process';
import {writeFileSync} from 'fs';

const commitHash = execSync('git rev-parse HEAD').toString().trim();
const msg = execSync('git log -1 --pretty=%B').toString().trim();
const time = Date.now() / 1000;

// write the commit hash to a .env file
writeFileSync('.env', `COMMIT_HASH=${commitHash}\nCOMMIT_MSG=${msg}\nCOMMIT_TIME=${time}\n`);