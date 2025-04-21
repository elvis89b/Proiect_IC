using Microsoft.AspNetCore.Mvc;
using Backend.ControllerLogic.ModelsDTOs;
using Backend.BusinessLogic.Services;
using Backend.DataAccessLogic.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.ControllerLogic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly AppDbContext _db;
        public AuthController(AuthService authService, AppDbContext db)
        {
            _authService = authService;
            _db = db;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] LoginModel model)
        {
            var user = await _db.Users
                                .FirstOrDefaultAsync(u =>
                                  u.Username == model.Username &&
                                  u.Password == model.Password);  
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            return Ok(new
            {
                userId = user.Id,
                username = user.Username
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var (success, message) = await _authService.RegisterUserAsync(model);
            if (!success)
            {
                return BadRequest(new { message });
            }
            return Ok(new { message });
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var (success, message) = await _authService.CheckIfEmailExistsAsync(model.Email);
            
            if (!success)
            {
                return NotFound(new { message });
            }

            return Ok(new { message });
        }

         // Endpoint pentru resetarea parolei
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var (success, message) = await _authService.ResetUserPasswordAsync(model.Username, model.NewPassword);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }

    
    }
}
