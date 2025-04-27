using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.DataAccessLogic.Entities
{
    [Table("fridge")]
    public class FridgeItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = default!;
        public string Ingredient { get; set; } 
        public int Quantity { get; set; } 
        public int Calories { get; set; }
    }
}


