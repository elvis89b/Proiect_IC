using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLogic.Context;
using Backend.DataAccessLogic.Entities;

namespace Backend.DataAccessLogic.Repositories
{
    public class PlannerRepository
    {
        private readonly AppDbContext _context;
        public PlannerRepository(AppDbContext context) => _context = context;

        public async Task<Planner?> GetByUserIdAsync(int userId)
            => await _context.Planners
                             .FirstOrDefaultAsync(p => p.UserId == userId);

        public async Task AddPlannerAsync(Planner planner)
        {
            _context.Planners.Add(planner);
            await _context.SaveChangesAsync();
        }
        public async Task<Recipe?> GetRecipeByNameAsync(string name)
                => await _context.Recipes.FirstOrDefaultAsync(r => r.Name == name);

        public async Task AddRecipeAsync(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
        }
        public async Task AddPlannerRecipeAsync(PlannerRecipe plannerRecipe)
        {
            _context.PlannerRecipes.Add(plannerRecipe);
            await _context.SaveChangesAsync();
        }
    }
}
