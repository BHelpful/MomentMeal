// Fields that exist both on the frontend and the backend
export interface GlobalIStoreShared {
	name: string;
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalIStoreBackend extends GlobalIStoreShared {}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalIStoreFrontend extends GlobalIStoreShared {}
