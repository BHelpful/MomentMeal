export interface IPaginationModel<T> { /** tsoa doesn't like generics */
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  docs: T[];
}

export class PaginationModel<T> implements IPaginationModel<T> {
	public count!: number;
	public page!: number;
	public limit!: number;
	public totalPages!: number;
	public docs!: T[];

	constructor(args: IPaginationModel<T>) {
		Object.assign(this, args);
	}
}
