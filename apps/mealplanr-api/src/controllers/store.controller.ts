import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Res,
	Route,
	SuccessResponse,
	Tags,
	TsoaResponse,
	Request,
} from 'tsoa';
import { IStoreBackend, IStoreBackendResponse } from '../models/store.model';
import { StoreService } from '../services/store.service';
import express from 'express';

@Route('stores')
@Tags('Store')
export class StoresController extends Controller {
	@Get('{storeId}')
	public async getStore(
		@Request() req: express.Request,
		@Path() storeId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<IStoreBackendResponse> {
		console.log(req.session);

		const storeService = new StoreService();
		const store = await storeService.getById(storeId);
		if (!store) {
			return notFoundResponse(404, { reason: 'Store not found' });
		}
		return store;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createStore(
		@Body() requestBody: IStoreBackend
	): Promise<IStoreBackendResponse> {
		this.setStatus(201); // set return status 201
		return new StoreService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{storeId}')
	public async updateStore(
		@Path() storeId: string,
		@Body() requestBody: IStoreBackend,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() alreadyExistsResponse: TsoaResponse<409, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<IStoreBackendResponse> {
		const storeService = new StoreService();
		const store = await storeService.getById(storeId);
		if (!store) {
			return notFoundResponse(404, { reason: 'Store not found' });
		}

		if (store.name === requestBody.name) {
			return alreadyExistsResponse(409, { reason: 'Store already exists' });
		}

		const updatedStore = await storeService.update(storeId, requestBody);
		if (!updatedStore) {
			return internalServerError(500, { reason: 'Failed to update store' });
		}

		return updatedStore;
	}

	@SuccessResponse('204', 'resource deleted successfully')
	@Delete('{storeId}')
	public async deleteStore(
		@Path() storeId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<void> {
		const storeService = new StoreService();
		const store = await storeService.getById(storeId);
		if (!store) {
			return notFoundResponse(404, { reason: 'Store not found' });
		}

		try {
			await storeService.delete(storeId);
		} catch (error) {
			return internalServerError(500, { reason: 'Failed to delete store' });
		}
	}
}
