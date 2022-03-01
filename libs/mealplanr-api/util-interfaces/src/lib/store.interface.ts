// Fields that exist both on the frontend and the backend
export interface Global_IStoreShared {
	name: string;
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Global_IStoreBackend extends Global_IStoreShared {}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Global_IStoreFrontend extends Global_IStoreShared {}
