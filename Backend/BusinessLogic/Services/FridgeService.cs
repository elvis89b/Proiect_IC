using Backend.DataAccessLogic.Repositories;
using Backend.ControllerLogic.ModelsDTOs;
using Backend.DataAccessLogic.Entities;

namespace Backend.BusinessLogic.Services
{
    public class FridgeService
    {
        private readonly FridgeRepository _fridgeRepository;

        public FridgeService(FridgeRepository fridgeRepository)
        {
            _fridgeRepository = fridgeRepository;
        }

        public async Task<(bool Success, string Message, List<FridgeModel> Items)> GetFridgeItemsAsync(int userId)
        {
            var items = await _fridgeRepository.GetItemsByUserIdAsync(userId);
            if (items == null || !items.Any())
            {
                return (false, "No items found for this user.", new List<FridgeModel>());
            }

            // Conversia din FridgeItem în FridgeModel
            var itemsDTO = items.Select(item => new FridgeModel
            {
                Id = item.Id,
                UserId = item.UserId,
                Ingredient = item.Ingredient,
                Quantity = item.Quantity,
                Calories = item.Calories
            }).ToList();

            return (true, "Items retrieved successfully.", itemsDTO);
        }

        public async Task<(bool Success, string Message)> AddFridgeItemAsync(FridgeModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Ingredient))
            {
                return (false, "Ingredient name is required.");
            }

            var item = new FridgeItem
            {
                UserId = model.UserId,
                Ingredient = model.Ingredient,
                Quantity = model.Quantity,
                Calories = model.Calories
            };

            await _fridgeRepository.AddItemAsync(item);
            return (true, "Item added successfully.");
        }

        public async Task<(bool Success, string Message)> UpdateFridgeItemAsync(FridgeModel model)
        {
            if (model == null || model.Id <= 0)
            {
                return (false, "Valid item ID is required.");
            }

            var updatedItem = new FridgeItem
            {
                Id = model.Id,
                UserId = model.UserId,
                Ingredient = model.Ingredient,
                Quantity = model.Quantity,
                Calories = model.Calories
            };

            await _fridgeRepository.UpdateItemAsync(updatedItem);
            return (true, "Item updated successfully.");
        }

        public async Task<(bool Success, string Message)> DeleteFridgeItemAsync(int itemId)
        {
            if (itemId <= 0)
            {
                return (false, "Valid item ID is required.");
            }

            await _fridgeRepository.DeleteItemAsync(itemId);
            return (true, "Item deleted successfully.");
        }
    }
}
