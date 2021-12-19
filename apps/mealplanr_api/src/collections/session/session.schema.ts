import { object, string } from 'yup';

export const sessionPostStructure = {
	password: string()
		.required('Password is required')
		.min(6, 'Password is too short - should be 6 chars minimum.')
		.matches(
			/^[a-zA-Z0-9_.-]*$/,
			'Password can only contain Latin letters.'
		),

	email: string()
		.email('Must be a valid email')
		.required('Email is required'),
};

// creates the validation schema
export const createUserSessionSchema = object({
	body: object(sessionPostStructure),
});
