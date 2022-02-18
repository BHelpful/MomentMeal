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
import { CategoriesService } from './category.service';
import { CategoryCreationParams, CategoryDocument } from './category.model';

@Route('categories')
@Tags("Category")
export class CategoriesController extends Controller {
	@Get('{categoryId}')
	public async getCategory(
		@Path() categoryId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<CategoryDocument> {
		const categoryService = new CategoriesService();
		const category = await categoryService.get(categoryId);
		if (!category) {
			return notFoundResponse(404, { reason: 'Category not found' });
		}
		return category;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createCategory(
		@Body() requestBody: CategoryCreationParams
	): Promise<CategoryDocument> {
		this.setStatus(201); // set return status 201
		return new CategoriesService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{categoryId}')
	public async updateCategory(
		@Path() categoryId: string,
		@Body() requestBody: CategoryCreationParams,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() alreadyExistsResponse: TsoaResponse<409, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<CategoryDocument> {
		const categoryService = new CategoriesService();
		const category = await categoryService.get(categoryId);
		if (!category) {
			return notFoundResponse(404, { reason: 'Category not found' });
		}

		if (category.name === requestBody.name) {
			return alreadyExistsResponse(409, { reason: 'Category already exists' });
		}

		const updatedCategory = await categoryService.update(
			{ _id: categoryId },
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
		const category = await categoryService.get(categoryId);
		if (!category) {
			return notFoundResponse(404, { reason: 'Category not found' });
		}

		const deletedCategory = await categoryService.delete(categoryId);
		if (!deletedCategory) {
			return internalServerError(500, { reason: 'Failed to delete category' });
		}
	}
}
