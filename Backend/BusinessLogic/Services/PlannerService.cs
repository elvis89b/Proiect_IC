using System.Threading.Tasks;
using Backend.DataAccessLogic.Entities;
using Backend.DataAccessLogic.Repositories;

namespace Backend.BusinessLogic.Services
{
    public class PlannerService
    {
        private readonly PlannerRepository _plannerRepository;

        public PlannerService(PlannerRepository plannerRepository)
        {
            _plannerRepository = plannerRepository;
        }

        public async Task<int> InsertRecipeIfNewAsync(string name, string desc)
        {
            var rec = await _plannerRepository.GetRecipeByNameAsync(name);
            if (rec == null)
            {
                rec = new Recipe { Name = name, Description = desc };
                await _plannerRepository.AddRecipeAsync(rec);
            }
            return rec.Id;
        }

        public async Task AddToPlannerAsync(int userId, int recipeId, string day)
        {
            var planner = await _plannerRepository.GetByUserIdAsync(userId);

            if (planner == null)
            {
                planner = new Planner { UserId = userId };
                await _plannerRepository.AddPlannerAsync(planner);
            }

            var link = new PlannerRecipe
            {
                PlannerId = planner.Id,
                RecipeId = recipeId,
                DayOfWeek = day
            };

            await _plannerRepository.AddPlannerRecipeAsync(link);
        }

        public async Task<Planner> GetOrCreatePlannerAsync(int userId)
        {
            var planner = await _plannerRepository.GetByUserIdAsync(userId);
            if (planner == null)
            {
                planner = new Planner { UserId = userId };
                await _plannerRepository.AddPlannerAsync(planner);
            }
            return planner;
        }

    }
}
