namespace Backend.ControllerLogic.ModelsDTOs
{
    public class FridgeModel
    {
        public int Id { get; set; } 
        public int UserId { get; set; }
        public string Ingredient { get; set; }
        public int Quantity { get; set; } 
        public int Calories { get; set; }
    }
}
