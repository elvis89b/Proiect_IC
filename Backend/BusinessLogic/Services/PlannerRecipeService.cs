using Backend.DataAccessLogic.Repositories;
using Backend.ControllerLogic.ModelsDTOs;
using Backend.DataAccessLogic.Entities;

namespace Backend.BusinessLogic.Services
{
    public class PlannerRecipeService
    {
        private readonly PlannerRecipeRepository _plannerRecipeRepository;

        public PlannerRecipeService(PlannerRecipeRepository plannerRecipeRepository)
        {
            _plannerRecipeRepository = plannerRecipeRepository;
        }

        public async Task<(bool Success, string Message, List<PlannerRecipeModel> Items)> GetPlannerRecipesAsync(int plannerId)
        {
            var recipes = await _plannerRecipeRepository.GetRecipesByPlannerIdAsync(plannerId);
            if (recipes == null || !recipes.Any())
            {
                return (true, "No recipes found for this planner.", new List<PlannerRecipeModel>());
            }

            var recipesDTO = recipes.Select(recipe => new PlannerRecipeModel
            {
                Id = recipe.Id,
                PlannerId = recipe.PlannerId,
                RecipeId = recipe.RecipeId,
                DayOfWeek = recipe.DayOfWeek
            }).ToList();

            return (true, "Recipes retrieved successfully.", recipesDTO);
        }

        public async Task<(bool Success, string Message, PlannerRecipeModel? Items)> AddPlannerRecipeAsync(PlannerRecipeModel model)
        {
            if (model == null || model.PlannerId <= 0 || model.RecipeId <= 0 || string.IsNullOrWhiteSpace(model.DayOfWeek))
            {
                return (false, "PlannerId, RecipeId, and DayOfWeek are required.", null);
            }

            var plannerRecipe = new PlannerRecipe
            {
                PlannerId = model.PlannerId,
                RecipeId = model.RecipeId,
                DayOfWeek = model.DayOfWeek
            };

            await _plannerRecipeRepository.AddRecipeAsync(plannerRecipe);

            var addedRecipe = new PlannerRecipeModel
            {
                Id = plannerRecipe.Id,
                PlannerId = plannerRecipe.PlannerId,
                RecipeId = plannerRecipe.RecipeId,
                DayOfWeek = plannerRecipe.DayOfWeek
            };

            return (true, "Planner recipe added successfully.", addedRecipe);
        }

        public async Task<(bool Success, string Message)> UpdatePlannerRecipeAsync(PlannerRecipeModel model)
        {
            if (model == null || model.Id <= 0)
            {
                return (false, "Valid recipe ID is required.");
            }

            var updatedRecipe = new PlannerRecipe
            {
                Id = model.Id,
                PlannerId = model.PlannerId,
                RecipeId = model.RecipeId,
                DayOfWeek = model.DayOfWeek
            };

            await _plannerRecipeRepository.UpdateRecipeAsync(updatedRecipe);
            return (true, "Planner recipe updated successfully.");
        }

        public async Task<(bool Success, string Message)> DeletePlannerRecipeAsync(int recipeId)
        {
            if (recipeId <= 0)
            {
                return (false, "Valid recipe ID is required.");
            }

            await _plannerRecipeRepository.DeleteRecipeAsync(recipeId);
            return (true, "Planner recipe deleted successfully.");
        }
    }
}


