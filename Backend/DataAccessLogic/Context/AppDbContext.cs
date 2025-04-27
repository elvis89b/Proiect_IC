using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLogic.Entities;

namespace Backend.DataAccessLogic.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Planner> Planners { get; set; }
        public DbSet<PlannerRecipe> PlannerRecipes { get; set; }
        public DbSet<FridgeItem> FridgeItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Username).HasColumnName("username");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.Password).HasColumnName("password");
            });
            modelBuilder.Entity<Recipe>(e =>
            {
                e.ToTable("recipes");
                e.Property(p => p.Id).HasColumnName("id");
                e.Property(p => p.Name).HasColumnName("name");
                e.Property(p => p.Description).HasColumnName("description");
            });

            modelBuilder.Entity<Planner>(e =>
            {
                e.ToTable("planner");
                e.Property(p => p.Id).HasColumnName("id");
                e.Property(p => p.UserId).HasColumnName("userid");
            });

            modelBuilder.Entity<PlannerRecipe>(e =>
            {
                e.ToTable("planner_recipes");
                e.Property(p => p.Id).HasColumnName("id");
                e.Property(p => p.PlannerId).HasColumnName("plannerid");
                e.Property(p => p.RecipeId).HasColumnName("recipeid");
                e.Property(p => p.DayOfWeek).HasColumnName("dayofweek");
            });

            modelBuilder.Entity<FridgeItem>(e =>
            {
                e.ToTable("fridge");
                e.Property(p => p.Id).HasColumnName("id");
                e.Property(p => p.UserId).HasColumnName("userid");
                e.Property(p => p.Ingredient).HasColumnName("ingredient");
                e.Property(p => p.Quantity).HasColumnName("quantity");
                e.Property(p => p.Calories).HasColumnName("calories");
            });

        }
    }
}


