import 'dotenv/config';
import express, {
	Response as ExResponse,
	Request as ExRequest,
	NextFunction,
} from 'express';
import { ValidateError } from 'tsoa';
import cors from 'cors';
import compression from 'compression';
import fileRouter from './routes/files';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './routes';
import * as swaggerJson from './swagger.json';
import * as swaggerUI from 'swagger-ui-express';
import Logger from './config/Logger';
import MongoStore from 'connect-mongo';
import { nanoid } from 'nanoid';
import session from 'express-session';
import { IUserResponse } from './models/user.model';

export interface OurSessionData {
	user?: IUserResponse;
	refreshToken?: string;
	accessToken?: string;
	err?: string;
}

declare module 'express-session' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface SessionData extends OurSessionData {}
}

const app = express();
app.disable('x-powered-by');

const oneDay = 1000 * 60 * 60 * 24;
app.use(
	session({
		secret: process.env.PRIVATE_KEY as string,
		genid: function () {
			return nanoid(10); // use UUIDs for session IDs
		},
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
		store: MongoStore.create({
			mongoUrl: "mongodb://localhost:27017/mealplanr",
			dbName: 'mealplanr',
			touchAfter: 24 * 3600, // time period in seconds
			ttl: 14 * 24 * 60 * 60, // = 14 days. Default,
			autoRemove: 'interval',
			autoRemoveInterval: 60, // In minutes.
			crypto: {
				secret: 'squirrel',
			},
		}),
	})
);

// need to use this in order to understand the JSON body from RESTful requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use this to compress the responses (gzip Compression)
app.use(compression());

// assigning app-wide cache settings
app.use(express.static(`${__dirname}/public`, { maxAge: 31_557_600 }));

const allowedOrigins = [
	'http://localhost:4200',
	'http://localhost:3333',
	'http://127.0.0.1:4200', //MongoDB on linux systems don't like localhost
	'http://127.0.0.1:3333',
	'https://bhelpful.net',
	'https://dev.bhelpful.net',
	'.bhelpful.pages.dev', // Wildcard for cloudflare branch deploys
];
app.use(
	// use cors to allow port 4200 and 3333 to access the API
	cors({
		credentials: false,
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg =
					'The CORS policy for this site does not ' +
					'allow access from origin ' +
					origin;
				console.error(new Error(msg));
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This is where the basic routes are defined
app.use('/files', fileRouter);

RegisterRoutes(app);
app.use(
	['/openapi', '/docs', '/swagger'],
	swaggerUI.serve,
	swaggerUI.setup(swaggerJson)
);

app.use(function notFoundHandler(_req, res: ExResponse) {
	res.status(404).send({
		message: 'Not Found',
	});
});

app.use(function errorHandler(
	err: unknown,
	req: ExRequest,
	res: ExResponse,
	next: NextFunction
): ExResponse | void {
	if (err instanceof ValidateError) {
		Logger.error(err, `Caught Validation Error for ${req.path}:`);
		return res.status(422).json({
			message: 'Validation Failed',
			details: err?.fields,
		});
	}
	if (err instanceof Error) {
		Logger.error(err, `Caught Internal Server Error for ${req.path}:`);
		return res.status(500).json({
			message: 'Internal Server Error',
			details: err?.message,
		});
	}

	next();
});

export default app;
