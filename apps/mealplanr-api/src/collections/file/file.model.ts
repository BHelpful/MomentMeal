import { Schema, Document, model } from 'mongoose';
import m2s = require('mongoose-to-swagger');

export interface FileDocument extends Document {
	_id: string;
	name: string;
	type: [string];
}
export const FileSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Name of the file',
	},
	type: {
		type: [String],
		required: true,
		description:
			'The type of file (can have multiple e.g. spicy, appetizer ...)',
	},
});

const fileModel = model<FileDocument>('categories', FileSchema);

export const fileSM = m2s(fileModel);

export default fileModel;
