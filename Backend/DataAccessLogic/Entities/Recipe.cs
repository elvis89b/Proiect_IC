namespace Backend.DataAccessLogic.Entities
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
    }
}
