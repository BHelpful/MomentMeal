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
import {
	IIngredientBackend,
	IIngredientBackendResponse,
} from '../models/ingredient.model';
import { IngredientService } from '../services/ingredient.service';

@Route('ingredients')
@Tags('Ingredient')
export class IngredientsController extends Controller {
	@Get('{ingredientId}')
	public async getIngredient(
		@Path() ingredientId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<IIngredientBackendResponse> {
		const ingredientService = new IngredientService();
		const ingredient = await ingredientService.getById(ingredientId);
		if (!ingredient) {
			return notFoundResponse(404, { reason: 'Ingredient not found' });
		}
		return ingredient;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createIngredient(
		@Body() requestBody: IIngredientBackend
	): Promise<IIngredientBackendResponse> {
		this.setStatus(201); // set return status 201
		return new IngredientService().create(
			requestBody
		) as Promise<IIngredientBackend>;
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{ingredientId}')
	public async updateIngredient(
		@Path() ingredientId: string,
		@Body() requestBody: IIngredientBackend,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() alreadyExistsResponse: TsoaResponse<409, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<IIngredientBackendResponse> {
		const ingredientService = new IngredientService();
		const ingredient = await ingredientService.getById(ingredientId);
		if (!ingredient) {
			return notFoundResponse(404, { reason: 'Ingredient not found' });
		}

		if (ingredient.name === requestBody.name) {
			return alreadyExistsResponse(409, {
				reason: 'Ingredient already exists',
			});
		}

		const updatedIngredient = await ingredientService.update(
			ingredientId,
			requestBody
		);
		if (!updatedIngredient) {
			return internalServerError(500, {
				reason: 'Failed to update ingredient',
			});
		}

		return updatedIngredient;
	}

	@SuccessResponse('204', 'resource deleted successfully')
	@Delete('{ingredientId}')
	public async deleteIngredient(
		@Path() ingredientId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<void> {
		const ingredientService = new IngredientService();
		const ingredient = await ingredientService.getById(ingredientId);
		if (!ingredient) {
			return notFoundResponse(404, { reason: 'Ingredient not found' });
		}

		try {
			await ingredientService.delete(ingredientId);
		} catch (error) {
			return internalServerError(500, {
				reason: 'Failed to delete ingredient',
			});
		}
	}
}
