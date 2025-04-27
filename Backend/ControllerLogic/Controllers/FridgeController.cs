using Backend.BusinessLogic.Services;
using Backend.ControllerLogic.ModelsDTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FridgeController : ControllerBase
    {
        private readonly FridgeService _fridgeService;

        public FridgeController(FridgeService fridgeService)
        {
            _fridgeService = fridgeService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetFridgeItems(int userId)
        {
            var itemsResult = await _fridgeService.GetFridgeItemsAsync(userId);

            if (!itemsResult.Success)
            {
                return BadRequest(itemsResult.Message);
            }

            return Ok(itemsResult.Items);
        }

        [HttpPost]
        public async Task<IActionResult> AddFridgeItem([FromBody] FridgeModel itemModel)
        {
            if (itemModel == null || string.IsNullOrWhiteSpace(itemModel.Ingredient))
            {
                return BadRequest("Ingredient name is required.");
            }

            var addResult = await _fridgeService.AddFridgeItemAsync(itemModel);

            if (!addResult.Success)
            {
                return BadRequest(addResult.Message);
            }

            return Ok(new { message = "Item added successfully" });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFridgeItem([FromBody] FridgeModel itemModel)
        {
            if (itemModel == null || itemModel.Id <= 0)
            {
                return BadRequest("Valid item ID is required.");
            }

            var updateResult = await _fridgeService.UpdateFridgeItemAsync(itemModel);

            if (!updateResult.Success)
            {
                return BadRequest(updateResult.Message);
            }

            return Ok(new { message = "Item updated successfully" });
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteFridgeItem(int itemId)
        {
            if (itemId <= 0)
            {
                return BadRequest("Valid item ID is required.");
            }

            var deleteResult = await _fridgeService.DeleteFridgeItemAsync(itemId);

            if (!deleteResult.Success)
            {
                return BadRequest(deleteResult.Message);
            }

            return Ok(new { message = "Item deleted successfully" });
        }
    }
}
