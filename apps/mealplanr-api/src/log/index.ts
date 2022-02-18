import logger from 'pino';
import dayjs from 'dayjs';

/**
 * This logger is used to log messages and displays them in the console.
 *
 * @remarks
 * This logger is created becase it can be formatted like this, and because console.log logs the IO; therefore,
 * as node.js is a single threaded environment, it is important to have a logger that is not logging to the console.
 *
 */
const log = logger({
	prettyPrint: true,
	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
