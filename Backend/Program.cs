using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLogic;
using Backend.DataAccessLogic.Repositories;
using Backend.BusinessLogic.Services;
using Backend.DataAccessLogic.Context;
using Microsoft.Extensions.Options;
using System.Text.Json;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped<PlannerRepository>();
builder.Services.AddScoped<PlannerService>();

builder.Services.AddScoped<FridgeRepository>();
builder.Services.AddScoped<FridgeService>();

builder.Services.AddScoped<RecipeRepository>();
builder.Services.AddScoped<RecipeService>();

builder.Services.AddScoped<PlannerRecipeRepository>();
builder.Services.AddScoped<PlannerRecipeService>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient();
builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
       });


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();


