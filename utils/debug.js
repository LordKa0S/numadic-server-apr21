import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const getDebugger = require('debug');

export default getDebugger;
