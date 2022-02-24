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
} from 'tsoa';
import { CategoriesService } from '../services/category.service';
import { ICategoryBackend } from '../models/category.model';

@Route('categories')
@Tags('Category')
export class CategoriesController extends Controller {
	@Get('{categoryId}')
	public async getCategory(
		@Path() categoryId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<ICategoryBackend> {
		const categoryService = new CategoriesService();
		const category = await categoryService.getById(categoryId);
		if (!category) {
			return notFoundResponse(404, { reason: 'Category not found' });
		}
		return category;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createCategory(
		@Body() requestBody: ICategoryBackend
	): Promise<ICategoryBackend> {
		this.setStatus(201); // set return status 201
		return new CategoriesService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{categoryId}')
	public async updateCategory(
		@Path() categoryId: string,
		@Body() requestBody: ICategoryBackend,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() alreadyExistsResponse: TsoaResponse<409, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<ICategoryBackend> {
		const categoryService = new CategoriesService();
		const category = await categoryService.getById(categoryId);
		if (!category) {
			return notFoundResponse(404, { reason: 'Category not found' });
		}

		if (category.name === requestBody.name) {
			return alreadyExistsResponse(409, { reason: 'Category already exists' });
		}

		const updatedCategory = await categoryService.update(
			categoryId,
			requestBody
		);
		if (!updatedCategory) {
			return internalServerError(500, { reason: 'Failed to update category' });
		}

		return updatedCategory;
	}

	@SuccessResponse('204', 'resource deleted successfully')
	@Delete('{categoryId}')
	public async deleteCategory(
		@Path() categoryId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<void> {
		const categoryService = new CategoriesService();
		const category = await categoryService.getById(categoryId);
		if (!category) {
			return notFoundResponse(404, { reason: 'Category not found' });
		}

		try {
			await categoryService.delete(categoryId);
		} catch (error) {
			return internalServerError(500, { reason: 'Failed to delete category' });
		}
	}
}
