using Backend.BusinessLogic.Services;
using Backend.ControllerLogic.ModelsDTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlannerRecipeController : ControllerBase
    {
        private readonly PlannerRecipeService _plannerRecipeService;
        private readonly PlannerService _plannerService;

        // Injectăm și PlannerService, pe lângă PlannerRecipeService
        public PlannerRecipeController(
            PlannerRecipeService plannerRecipeService,
            PlannerService plannerService)
        {
            _plannerRecipeService = plannerRecipeService;
            _plannerService = plannerService;
        }

        // nou: GET api/plannerRecipe/byUser/5
        // returnează sau creează planner-ul pentru userId=5
        [HttpGet("byUser/{userId}")]
        public IActionResult GetOrCreatePlannerByUser(int userId)
        {
            var planner = _plannerService.GetOrCreatePlanner(userId);
            return Ok(new { id = planner.Id, userId = planner.UserId });
        }

        // deja existent: preia toate reţetele dintr-un planner
        [HttpGet("{plannerId}")]
        public async Task<IActionResult> GetPlannerRecipes(int plannerId)
        {
            var recipesResult = await _plannerRecipeService.GetPlannerRecipesAsync(plannerId);
            if (!recipesResult.Success)
                return BadRequest(recipesResult.Message);
            return Ok(recipesResult.Items);
        }

        [HttpPost]
        public async Task<IActionResult> AddPlannerRecipe([FromBody] PlannerRecipeModel recipeModel)
        {
            if (recipeModel == null
                || recipeModel.PlannerId <= 0
                || recipeModel.RecipeId <= 0
                || string.IsNullOrWhiteSpace(recipeModel.DayOfWeek))
            {
                return BadRequest("PlannerId, RecipeId și DayOfWeek sunt obligatorii.");
            }

            var addResult = await _plannerRecipeService.AddPlannerRecipeAsync(recipeModel);
            if (!addResult.Success)
                return BadRequest(addResult.Message);

            return Ok(new
            {
                message = "Planner recipe adăugată cu succes",
                plannerRecipe = addResult.Items
            });
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePlannerRecipe([FromBody] PlannerRecipeModel recipeModel)
        {
            if (recipeModel == null || recipeModel.Id <= 0)
                return BadRequest("ID valid este obligatoriu.");

            var updateResult = await _plannerRecipeService.UpdatePlannerRecipeAsync(recipeModel);
            if (!updateResult.Success)
                return BadRequest(updateResult.Message);

            return Ok(new { message = "Planner recipe actualizată cu succes" });
        }

        [HttpDelete("{recipeId}")]
        public async Task<IActionResult> DeletePlannerRecipe(int recipeId)
        {
            if (recipeId <= 0)
                return BadRequest("ID valid este obligatoriu.");

            var deleteResult = await _plannerRecipeService.DeletePlannerRecipeAsync(recipeId);
            if (!deleteResult.Success)
                return BadRequest(deleteResult.Message);

            return Ok(new { message = "Planner recipe ștearsă cu succes" });
        }
    }
}
