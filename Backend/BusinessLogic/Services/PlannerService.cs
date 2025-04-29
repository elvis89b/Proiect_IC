using Backend.DataAccessLogic.Context;
using System.Numerics;
using Backend.DataAccessLogic.Entities;

namespace Backend.BusinessLogic.Services
{
    public class PlannerService
    {
        private readonly AppDbContext _db;
        public PlannerService(AppDbContext db) => _db = db;

        public int InsertRecipeIfNew(string name, string desc)
        {
            var rec = _db.Recipes.FirstOrDefault(r => r.Name == name);
            if (rec == null)
            {
                rec = new Recipe { Name = name, Description = desc };
                _db.Recipes.Add(rec);
                _db.SaveChanges();
            }
            return rec.Id;
        }

        public void AddToPlanner(int userId, int recipeId, string day)
        {
           
            var planner = _db.Planners
                             .FirstOrDefault(p => p.UserId == userId);

            if (planner == null)
            {
                planner = new Planner { UserId = userId };
                _db.Planners.Add(planner);
                _db.SaveChanges();                   
            }

     
            var link = new PlannerRecipe
            {
                PlannerId = planner.Id,              
                RecipeId = recipeId,
                DayOfWeek = day
            };

            _db.PlannerRecipes.Add(link);
            _db.SaveChanges();
        }
        public Planner GetOrCreatePlanner(int userId)
        {
            var planner = _db.Planners.FirstOrDefault(p => p.UserId == userId);
            if (planner == null)
            {
                planner = new Planner { UserId = userId };
                _db.Planners.Add(planner);
                _db.SaveChanges();
            }
            return planner;
        }
    }
}
