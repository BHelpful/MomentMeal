import { BaseExceptionMessages } from '../base/base.exceptionMessages';

export class StoreExceptionMessages extends BaseExceptionMessages {
	public readonly NOT_FOUND = 'Store not found';
	public readonly ALREADY_EXISTS = 'Store already exists';
	public readonly INTERNAL_SERVER_ERROR = 'Internal Server Error';
}
