import { omit } from 'lodash';
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
import { IRecipeBackend, IRecipeBackendResponse } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Route('recipes')
@Tags('Recipe')
export class RecipesController extends Controller {
	@Get('{recipeId}')
	public async getRecipe(
		@Path() recipeId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<IRecipeBackendResponse> {
		const recipeService = new RecipeService();
		const recipe = await recipeService.getById(recipeId);
		if (!recipe) {
			return notFoundResponse(404, { reason: 'Recipe not found' });
		}
		return recipe;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createRecipe(
		@Body() requestBody: omit<IRecipeBackend, 'ID'>
	): Promise<IRecipeBackendResponse> {


		this.setStatus(201); // set return status 201
		return new RecipeService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{recipeId}')
	public async updateRecipe(
		@Path() recipeId: string,
		@Body() requestBody: omit<IRecipeBackend, 'ID'>,
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
	@Delete('{recipeId}')
	public async deleteRecipe(
		@Path() recipeId: string,
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
