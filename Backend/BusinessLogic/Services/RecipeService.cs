using Backend.DataAccessLogic.Repositories;
using Backend.ControllerLogic.ModelsDTOs;
using Backend.DataAccessLogic.Entities;

namespace Backend.BusinessLogic.Services
{
    public class RecipeService
    {
        private readonly RecipeRepository _recipeRepository;

        public RecipeService(RecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        public async Task<(bool Success, string Message, List<RecipeDto> Items)> GetAllRecipesAsync()
        {
            var recipes = await _recipeRepository.GetAllRecipesAsync();
            if (recipes == null || !recipes.Any())
            {
                return (false, "No recipes found.", new List<RecipeDto>());
            }

            var recipeModels = recipes.Select(r => new RecipeDto(r.Id, r.Name, r.Description)).ToList();

            return (true, "Recipes retrieved successfully.", recipeModels);
        }


        public async Task<(bool Success, string Message)> AddRecipeAsync(RecipeDto model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Name))
            {
                return (false, "Recipe name is required.");
            }

            var recipe = new Recipe
            {
                Name = model.Name,
                Description = model.Description
            };

            await _recipeRepository.AddRecipeAsync(recipe);
            return (true, "Recipe added successfully.");
        }

        public async Task<(bool Success, string Message)> UpdateRecipeAsync(RecipeDto model)
        {
            if (model == null || model.Id <= 0)
            {
                return (false, "Valid recipe ID is required.");
            }

            var existingRecipe = await _recipeRepository.GetRecipeByIdAsync(model.Id);
            if (existingRecipe == null)
            {
                return (false, "Recipe not found.");
            }

            existingRecipe.Name = model.Name;
            existingRecipe.Description = model.Description;

            await _recipeRepository.UpdateRecipeAsync(existingRecipe);
            return (true, "Recipe updated successfully.");
        }

        public async Task<(bool Success, string Message)> DeleteRecipeAsync(int recipeId)
        {
            if (recipeId <= 0)
            {
                return (false, "Valid recipe ID is required.");
            }

            await _recipeRepository.DeleteRecipeAsync(recipeId);
            return (true, "Recipe deleted successfully.");
        }


    }
}


