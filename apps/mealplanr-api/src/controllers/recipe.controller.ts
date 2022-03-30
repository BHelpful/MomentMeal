import { Omit } from 'lodash';
import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Query,
	Res,
	Route,
	SuccessResponse,
	Tags,
	TsoaResponse,
} from 'tsoa';
import { IRecipeBackend, IRecipeBackendResponse } from '../models/recipe.model';
import { PaginationModel } from '../models/util/PaginationModel';
import { RecipeService } from '../services/recipe.service';

@Route('recipes')
@Tags('Recipe')
export class RecipesController extends Controller {
	@Get()
	public async getRecipe(
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Query() recipeId?: string,
		@Query() creatorId?: string,
		@Query() limit?: number,
		@Query() selectedRecipe?: number
	): Promise<IRecipeBackendResponse | PaginationModel<IRecipeBackendResponse>> {
		let definedLimit = limit ? limit : 100;
		let definedSelectedRecipe = selectedRecipe ? selectedRecipe : 1;
		definedLimit = Math.min(Math.max(definedLimit, 1), 100);
		definedSelectedRecipe = Math.min(Math.max(definedSelectedRecipe, 0), 1000);

		const definedRecipeId = recipeId ? { recipeId } : {};
		const definedCreatorId = creatorId ? { creatorId } : {};

		const query = { ...definedRecipeId, ...definedCreatorId };

		const recipeService = new RecipeService();
		const recipe = await recipeService.getPaginated(
			query,
			definedLimit,
			definedSelectedRecipe
		);
		if (!recipe) {
			return notFoundResponse(404, { reason: 'Recipe not found' });
		}
		return recipe;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createRecipe(
		@Body() requestBody: Omit<IRecipeBackend, 'ID'>
	): Promise<IRecipeBackendResponse> {
		this.setStatus(201); // set return status 201
		return new RecipeService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put()
	public async updateRecipe(
		@Query() recipeId: string,
		@Body() requestBody: Omit<IRecipeBackend, 'ID'>,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<IRecipeBackendResponse> {
		const recipeService = new RecipeService();
		const recipe = await recipeService.getById(recipeId);
		if (!recipe) {
			return notFoundResponse(404, { reason: 'Recipe not found' });
		}

		const updatedRecipe = await recipeService.update(recipeId, requestBody);
		if (!updatedRecipe) {
			return internalServerError(500, {
				reason: 'Failed to update recipe',
			});
		}

		return updatedRecipe;
	}

	@SuccessResponse('204', 'resource deleted successfully')
	@Delete()
	public async deleteRecipe(
		@Query() recipeId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<void> {
		const recipeService = new RecipeService();
		const recipe = await recipeService.getById(recipeId);
		if (!recipe) {
			return notFoundResponse(404, { reason: 'Recipe not found' });
		}

		try {
			await recipeService.delete(recipeId);
		} catch (error) {
			return internalServerError(500, {
				reason: 'Failed to delete recipe',
			});
		}
	}
}
