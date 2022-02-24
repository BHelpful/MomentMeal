// Fields that exist both on the frontend and the backend
export interface IStoreShared {
	name: string;
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStoreBackend extends IStoreShared {}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStoreFrontend extends IStoreShared {}
