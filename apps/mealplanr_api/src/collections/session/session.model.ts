import { Schema, Document, model } from 'mongoose';
import { UserDocument } from '../user/user.model';
const m2s = require('mongoose-to-swagger');

export interface SessionDocument extends Document {
	userId: UserDocument['_id'];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const SessionSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			description:
				'The user associated with this session. (ObjectId refering to users)',
		},
		valid: {
			type: Boolean,
			default: true,
			description: 'Is this session valid?',
		},
		userAgent: {
			type: String,
			description:
				'The user agent is the service used to login (e.g. postman, chrome ...)',
		},
	},
	{ timestamps: true }
);

const sessionModel = model<SessionDocument>('session', SessionSchema);

export const sessionSM = m2s(sessionModel);

export default sessionModel;
