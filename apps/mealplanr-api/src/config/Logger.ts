import pinoLogger from 'pino';
import fs from 'fs';
import dayjs from 'dayjs';
import pinoMS from 'pino-multi-stream';
import pretty from 'pino-pretty';

const levels = {
	crit: 60,
	error: 50,
	warn: 40,
	notice: 30,
	info: 20,
	debug: 10,
};

const streams = [
	// Format the log to terminal
	{
		stream: pretty({
			colorize: true,
		}),
	},
	// Do not format the log to file
	{ stream: fs.createWriteStream('./logs/MealPlanr_API.log', { flags: 'a' }) },
];

/**
 * This logger is used to log messages and displays them in the console.
 *
 * @remarks
 * This logger is created becase it can be formatted like this, and because console.log logs the IO; therefore,
 * as node.js is a single threaded environment, it is important to have a logger that is not logging to the console.
 *
 */
const Logger = pinoLogger(
	{
		base: {
			pid: false,
		},
		level: process.env.PINO_LOG_LEVEL || 'info',
		customLevels: levels,
		timestamp: () => `,"time":"${dayjs().format()}"`,
	},
	pinoMS.multistream(streams)
);

export default Logger;
