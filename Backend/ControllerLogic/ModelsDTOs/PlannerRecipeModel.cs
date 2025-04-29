namespace Backend.ControllerLogic.ModelsDTOs
{
    public class PlannerRecipeModel
    {
        public int Id { get; set; }
        public int PlannerId { get; set; }
        public int RecipeId { get; set; }
        public string DayOfWeek { get; set; } = default!;

        public string PlannerName { get; set; } = string.Empty;
        public string RecipeName { get; set; } = string.Empty;
    
    }
}


