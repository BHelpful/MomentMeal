import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import { deserializeUser } from './middleware';
import usersRouter from './routes/users';
import sessionsRouter from './routes/sessions';
import recipeRouter from './routes/recipes';
import storeRouter from './routes/stores';
import categoryRouter from './routes/categories';
import ingredientRouter from './routes/ingredients';
import fileRouter from './routes/files';

const app = express();
app.disable('x-powered-by');

// this will attach the user to every single request
// that comes into the application
app.use(deserializeUser);

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

// This is where the basic routes are defined
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/recipes', recipeRouter);
app.use('/stores', storeRouter);
app.use('/categories', categoryRouter);
app.use('/ingredients', ingredientRouter);
app.use('/files', fileRouter);

export default app;
