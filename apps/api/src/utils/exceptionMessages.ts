export class ExceptionMessages {
	entity: string;

	constructor(entity: string) {
		this.entity = entity;
	}

	public NOT_FOUND(): string {
		return `${this.entity} not found`;
	}

	public ALREADY_EXISTS(): string {
		return `${this.entity} already exists`;
	}

	public INTERNAL_SERVER_ERROR(): string {
		return `Internal Server Error`;
	}

	public BAD_REQUEST(): string {
		return `Bad Request`;
	}

	public UNAUTHORIZED(): string {
		return `Unauthorized`;
	}
}
