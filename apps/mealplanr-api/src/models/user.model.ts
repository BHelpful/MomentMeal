import {
	EmailPattern,
	NamePattern,
	PasswordPattern,
} from './../utils/patternTypes';
import { Schema, Document, model } from 'mongoose';
import { Omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import {
	Plan,
	PlanResponse,
	PlanSubSchema,
	ShoppingList,
	ShoppingListResponse,
	ShoppingListSubSchema,
	UserOptions,
	UserOptionsResponse,
	UserOptionsSubSchema,
} from './util/subDocuments';
import { ResponseModel } from './util/ResponseModel';
import { IRecipeBackend } from './recipe.model';
import { IIngredientBackend } from './ingredient.model';
import sanitize from 'mongo-sanitize';

interface IUserModel {
	name?: NamePattern;
	email: EmailPattern;
	password?: PasswordPattern;
	recipeCollection?: string[] | IRecipeBackend[];
	options?: UserOptions;
	plan?: Plan;
	oAuth?: string;
	availableIngredients?: string[] | IIngredientBackend[];
	shoppingList?: ShoppingList;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object here requires email, password, and password confirmation.
 */
interface IUserPost extends IUserModel {
	password: PasswordPattern;
	passwordConfirmation: PasswordPattern;
}

// Fields that exist only in the backend responses
interface IUserResponse extends Omit<IUserModel, 'password'>, ResponseModel {
	recipeCollection?: IRecipeBackend[] | string[];
	options?: UserOptionsResponse;
	plan?: PlanResponse;
	availableIngredients?: IIngredientBackend[] | string[];
	shoppingList?: ShoppingListResponse;
}

interface IUserDoc extends IUserModel, Document {}

const UserSchemaFields: Record<
	keyof Omit<IUserModel, 'comparePassword' | 'passwordConfirmation'>,
	unknown
> = {
	name: { type: String, description: 'Name of the user' },
	email: {
		type: String,
		required: true,
		unique: true,
		description: 'Email of the user',
	},
	password: { type: String, description: 'Password of the user' },
	recipeCollection: {
		type: [Schema.Types.ObjectId],
		ref: 'recipes',
		description:
			'List of recipes now owned by the user (ObjectId referring to recipes)',
	},
	options: { type: UserOptionsSubSchema, description: 'User options' },
	plan: { type: PlanSubSchema, description: 'The MealPlan of the user' },
	oAuth: { type: String, description: 'OAuth of the user' },
	availableIngredients: {
		type: [Schema.Types.ObjectId],
		ref: 'ingredients',
		description: 'List of ingredients already available to the user at home',
	},
	shoppingList: {
		type: ShoppingListSubSchema,
		description: 'Shopping list of the user',
	},
};

const UserSchema = new Schema(UserSchemaFields, { timestamps: true });

// we need to get user's password into a hash before it is added to the database
// this is done in the model using the bcrypt
UserSchema.pre('save', async function (next) {
	const user = this as IUserDoc;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// Random additional data
	const salt = await bcrypt.genSalt(
		parseInt(process.env.SALT_WORKER_FACTOR as string, 10)
	);

	const hash = bcrypt.hashSync(user.password as string, salt);

	// Replace the password with the hash
	user.password = hash;

	return next();
});

/**
 * This function encrypts a password and validates
 * with the existing encrypted password from the user.
 *
 * @remarks
 * This function is added to the UserSchema.
 *
 * @param candidatePassword - a password to compare against the user's password
 * @returns a boolean value indicating whether the password is correct
 */
UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	candidatePassword = sanitize(candidatePassword);
	const user = this as IUserDoc;

	return bcrypt
		.compare(candidatePassword, user.password as string)
		.catch(() => false);
};

const User = model<IUserDoc>('users', UserSchema);

export { User, IUserDoc, IUserModel, IUserPost, IUserResponse };
