using Microsoft.AspNetCore.Mvc;
using Backend.ControllerLogic.ModelsDTOs;
using Backend.BusinessLogic.Services;

namespace Backend.ControllerLogic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }
        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromQuery] string password)
        {
            var (success, message) = await _authService.LoginUserAsync(username, password);

            if (!success)
            {
                if (message == "Username does not exist.")
                {
                    return NotFound(new { message });
                }
                else if (message == "Wrong password for username.")
                {
                    return Unauthorized(new { message });
                }
                else
                {
                    return BadRequest(new { message });
                }
            }

            return Ok(new { message });
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
