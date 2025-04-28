using Backend.BusinessLogic.Services;
using Backend.ControllerLogic.ModelsDTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeService _recipeService;

        public RecipeController(RecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecipes()
        {
            var result = await _recipeService.GetAllRecipesAsync();

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Items);
        }

        [HttpPost]
        public async Task<IActionResult> AddRecipe([FromBody] RecipeDto recipeModel)
        {
            var result = await _recipeService.AddRecipeAsync(recipeModel);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(new { message = "Recipe added successfully." });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRecipe([FromBody] RecipeDto recipeModel)
        {
            var result = await _recipeService.UpdateRecipeAsync(recipeModel);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(new { message = "Recipe updated successfully." });
        }

        [HttpDelete("{recipeId}")]
        public async Task<IActionResult> DeleteRecipe(int recipeId)
        {
            var result = await _recipeService.DeleteRecipeAsync(recipeId);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(new { message = "Recipe deleted successfully." });
        }
    }
}


