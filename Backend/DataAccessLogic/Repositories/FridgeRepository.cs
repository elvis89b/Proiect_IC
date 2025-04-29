using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLogic.Context;
using Backend.DataAccessLogic.Entities;

namespace Backend.DataAccessLogic.Repositories
{
    public class FridgeRepository
    {
        private readonly AppDbContext _context;

        public FridgeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<FridgeItem>> GetItemsByUserIdAsync(int userId)
        {
            return await _context.FridgeItems
                .Where(item => item.UserId == userId)
                .ToListAsync();
        }

        public async Task AddItemAsync(FridgeItem item)
        {
            _context.FridgeItems.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateItemAsync(FridgeItem item)
        {
            _context.FridgeItems.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteItemAsync(int itemId)
        {
            var item = await _context.FridgeItems.FindAsync(itemId);
            if (item != null)
            {
                _context.FridgeItems.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}


