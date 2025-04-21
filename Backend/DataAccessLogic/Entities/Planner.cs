namespace Backend.DataAccessLogic.Entities
{
    public class Planner
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = default!;
        public ICollection<PlannerRecipe> PlannerRecipes { get; set; } = new List<PlannerRecipe>();
    }
}
