import { Schema, Document, model } from 'mongoose';

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

const fileModel = model<FileDocument>('files', FileSchema);


export default fileModel;
