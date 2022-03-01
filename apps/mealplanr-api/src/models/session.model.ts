import { Schema, Document, model } from 'mongoose';
import { ResponseModel } from './util/ResponseModel';
import { IUserBackend, IUserBackendResponse } from './user.model';

interface ISessionShared {
	userId: string | IUserBackend;
	valid: boolean;
	userAgent: string;
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISessionBackend extends ISessionShared {}

// Fields that exist only in the backend responses
interface ISessionBackendResponse extends ISessionBackend, ResponseModel {
	userId: IUserBackendResponse | string;
}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISessionFrontend extends ISessionShared {}

interface ISessionDoc extends ISessionBackend, Document {}

const SessionSchemaFields: Record<keyof ISessionBackend, unknown> = {
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		description:
			'The user associated with this session. (ObjectId referring to users)',
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
};

const SessionSchema = new Schema(SessionSchemaFields, { timestamps: true });
const Session = model<ISessionDoc>('sessions', SessionSchema);

export {
	Session,
	ISessionDoc,
	ISessionBackend,
	ISessionBackendResponse,
	ISessionFrontend,
};
