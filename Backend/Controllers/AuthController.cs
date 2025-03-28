using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null || model.Password != model.RepeatPassword)
            {
                return BadRequest("Invalid data or passwords do not match.");
            }

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == model.Email);

            if (existingUser != null)
            {
                return BadRequest("An account with this email already exists.");
            }

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                Password = model.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }
    }


    public class RegisterModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RepeatPassword { get; set; }
    }
}
