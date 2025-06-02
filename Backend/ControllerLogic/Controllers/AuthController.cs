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
        private readonly PlannerService _plannerService;
        public AuthController(AuthService authService, PlannerService plannerService)
        {
            _authService = authService;
            _plannerService = plannerService;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] LoginModel model)
        {
            var (success, message) = await _authService.LoginUserAsync(model.Username, model.Password);

            if (!success)
            {
                return Unauthorized(new { message });
            }

            var user = await _authService.GetUserByUsernameAsync(model.Username);

            var planner = await _plannerService.GetOrCreatePlannerAsync(user.Id);

            return Ok(new
            {
                userId = user.Id,
                username = user.Username,
                plannerId = planner.Id 
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

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var (success, message) = await _authService.ResetUserPasswordByEmailAsync(model.Email, model.NewPassword);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }



    }
}
