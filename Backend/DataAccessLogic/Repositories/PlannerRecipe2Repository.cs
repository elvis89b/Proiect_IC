using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLogic.Context;
using Backend.DataAccessLogic.Entities;

namespace Backend.DataAccessLogic.Repositories
{
    public class PlannerRecipeRepository
    {
        private readonly AppDbContext _context;

        public PlannerRecipeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<PlannerRecipe>> GetRecipesByPlannerIdAsync(int plannerId)
        {
            return await _context.PlannerRecipes
                .Where(pr => pr.PlannerId == plannerId)
                .Include(pr => pr.Planner)
                .Include(pr => pr.Recipe)
                .ToListAsync();
        }

        public async Task AddRecipeAsync(PlannerRecipe plannerRecipe)
        {
             var existingRecipe = await _context.PlannerRecipes
               .Where(pr => pr.PlannerId == plannerRecipe.PlannerId && pr.RecipeId == plannerRecipe.RecipeId && pr.DayOfWeek == plannerRecipe.DayOfWeek)
             .FirstOrDefaultAsync();


            if (existingRecipe != null)
            {
                throw new InvalidOperationException(
                     $"Recipe already added to the planner for {plannerRecipe.DayOfWeek}.");
            }

            _context.PlannerRecipes.Add(plannerRecipe);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRecipeAsync(PlannerRecipe plannerRecipe)
        {
            _context.PlannerRecipes.Update(plannerRecipe);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRecipeAsync(int recipeId)
        {
            var plannerRecipe = await _context.PlannerRecipes.FindAsync(recipeId);
            if (plannerRecipe != null)
            {
                _context.PlannerRecipes.Remove(plannerRecipe);
                await _context.SaveChangesAsync();
            }
        }
    }
}


