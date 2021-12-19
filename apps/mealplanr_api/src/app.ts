require('dotenv').config();
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import { deserializeUser } from './middleware';
import * as swaggerDocument from './swagger.json';
import { categorySM } from './collections/category/category.model';
import { ingredientSM } from './collections/ingredient/ingredient.model';
import { recipeSM } from './collections/recipe/recipe.model';
import { sessionSM } from './collections/session/session.model';
import { storeSM } from './collections/store/store.model';
import { userSM } from './collections/user/user.model';
import usersRouter, {
	usersDelete,
	usersExistsGet,
	usersGet,
	usersPost,
	usersPut,
} from './routes/users';
import sessionsRouter, {
	sessionsPost,
	sessionsGet,
	sessionsDelete,
} from './routes/sessions';
import recipeRouter, {
	recipesDelete,
	recipesGet,
	recipesPost,
	recipesPut,
} from './routes/recipes';
import storeRouter, {
	storesDelete,
	storesGet,
	storesPost,
	storesPut,
} from './routes/stores';
import categoryRouter, {
	categoriesDelete,
	categoriesGet,
	categoriesPost,
	categoriesPut,
} from './routes/categories';
import ingredientRouter, {
	ingredientsDelete,
	ingredientsGet,
	ingredientsPost,
	ingredientsPut,
} from './routes/ingredients';

const compression = require('compression');

const app = express();

// this will attach the user to every single request
// that comes into the application
app.use(deserializeUser);

// need to use this in order to understand the JSON body from RESTful requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use this to compress the responses (gzip Compression)
app.use(compression());

// assigning app-wide cache settings
app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost',
	'http://bhelpful.net',
	'http://bhelpful.net:3000',
];
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg =
					'The CORS policy for this site does not ' +
					'allow access from the specified Origin.';
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

// defining the parsed swagger file in order to be able to add to it
var parsedSwaggerDoc = JSON.parse(JSON.stringify(swaggerDocument));

// Adding mongoose models to swagger docs
parsedSwaggerDoc.definitions.Ingredient = ingredientSM;
parsedSwaggerDoc.definitions.Category = categorySM;
parsedSwaggerDoc.definitions.Session = sessionSM;
parsedSwaggerDoc.definitions.Store = storeSM;
parsedSwaggerDoc.definitions.Recipe = recipeSM;
parsedSwaggerDoc.definitions.User = userSM;

// This is where the basic routes are defined
// (for each route the different methods will be added to the swagger file)
app.use('/users', usersRouter);
parsedSwaggerDoc.paths['/users'] = {
	...usersPost,
	...usersGet,
	...usersPut,
	...usersDelete,
};
parsedSwaggerDoc.paths['/users/exists'] = {
	...usersExistsGet,
};

app.use('/sessions', sessionsRouter);
parsedSwaggerDoc.paths['/sessions'] = {
	...sessionsPost,
	...sessionsGet,
	...sessionsDelete,
};

app.use('/recipes', recipeRouter);
parsedSwaggerDoc.paths['/recipes'] = {
	...recipesPost,
	...recipesPut,
	...recipesGet,
	...recipesDelete,
};

app.use('/stores', storeRouter);
parsedSwaggerDoc.paths['/stores'] = {
	...storesPost,
	...storesPut,
	...storesGet,
	...storesDelete,
};

app.use('/categories', categoryRouter);
parsedSwaggerDoc.paths['/categories'] = {
	...categoriesPost,
	...categoriesPut,
	...categoriesGet,
	...categoriesDelete,
};

app.use('/ingredients', ingredientRouter);
parsedSwaggerDoc.paths['/ingredients'] = {
	...ingredientsPost,
	...ingredientsPut,
	...ingredientsGet,
	...ingredientsDelete,
};

// set up the Swagger UI
app.use('/api-docs', serve, setup(parsedSwaggerDoc));

export default app;
