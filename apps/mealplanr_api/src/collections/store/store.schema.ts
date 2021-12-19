import { object, string, boolean, array, number } from 'yup';

// schema for store
const payload = {
	body: object({
		name: string(),
	}),
};

const query = {
	query: object({
		storeId: string().required('storeId is required'),
	}),
};

export const createStoreSchema = object({
	...payload,
});

export const getStoreSchema = object({
	...query,
});

export const updateStoreSchema = object({
	...query,
	...payload,
});

export const deleteStoreSchema = object({
	...query,
});
