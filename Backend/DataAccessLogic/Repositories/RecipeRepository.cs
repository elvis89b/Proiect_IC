using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLogic.Entities;
using Backend.DataAccessLogic.Context;


namespace Backend.DataAccessLogic.Repositories
{
    public class RecipeRepository
    {
        private readonly AppDbContext _context;

        public RecipeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Recipe>> GetAllRecipesAsync()
        {
            return await _context.Recipes.ToListAsync();
        }

        public async Task<Recipe> GetRecipeByIdAsync(int id)
        {
            return await _context.Recipes.FindAsync(id);
        }

        public async Task AddRecipeAsync(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRecipeAsync(Recipe recipe)
        {
            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRecipeAsync(int recipeId)
        {
            var recipe = await _context.Recipes.FindAsync(recipeId);
            if (recipe != null)
            {
                _context.Recipes.Remove(recipe);
                await _context.SaveChangesAsync();
            }
        }
    }
}


