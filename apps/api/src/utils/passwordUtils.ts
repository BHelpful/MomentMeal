import * as bcrypt from 'bcrypt';

export const comparePasswords = async (userPassword, currentPassword) => {
	return await bcrypt.compare(currentPassword, userPassword);
};
