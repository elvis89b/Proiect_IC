namespace Backend.DataAccessLogic.Entities
{
    public class PlannerRecipe
    {
        public int Id { get; set; }
        public int PlannerId { get; set; }
        public int RecipeId { get; set; }
        public string DayOfWeek { get; set; } = default!;
        public Planner? Planner { get; set; }
        public Recipe? Recipe { get; set; }
    }
}


