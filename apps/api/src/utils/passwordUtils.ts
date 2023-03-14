import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
	userPassword: string,
	currentPassword: string
) => {
	return await bcrypt.compare(currentPassword, userPassword);
};
