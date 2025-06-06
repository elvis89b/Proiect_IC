﻿using Backend.DataAccessLogic.Repositories;
using Backend.ControllerLogic.ModelsDTOs;
using Backend.DataAccessLogic.Entities;
using Backend.ControllerLogic.Controllers;

namespace Backend.BusinessLogic.Services
{
    public class AuthService
    {
        private readonly UserRepository _userRepository;

        public AuthService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<(bool Success, string Message)> LoginUserAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return (false, "Username and password are required.");
            }

            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null)
            {
                return (false, "Username does not exist.");
            }

            if (user.Password != password)
            {
                return (false, "Wrong password for username.");
            }

            return (true, "Login successful.");
        }
        public async Task<(bool Success, string Message)> RegisterUserAsync(RegisterModel model)
        {
            if (model == null ||
                string.IsNullOrWhiteSpace(model.Username) ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Password) ||
                string.IsNullOrWhiteSpace(model.RepeatPassword))
            {
                return (false, "All fields are required.");
            }

            if (model.Password != model.RepeatPassword)
            {
                return (false, "Passwords do not match.");
            }

            var existingUser = await _userRepository.GetByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return (false, "An account with this email already exists.");
            }

            var newUser = new User
            {
                Username = model.Username,
                Email = model.Email,
                Password = model.Password
            };

            await _userRepository.AddAsync(newUser);
            return (true, "User registered successfully.");
        }

        public async Task<(bool Success, string Message)> CheckIfEmailExistsAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return (false, "Email is required.");
            }

            var user = await _userRepository.GetByEmailAsync(email); 
            if (user == null)
            {
                return (false, "Email not found.");
            }

            return (true, "Email found. Proceed to reset.");
        }

        public async Task<(bool Success, string Message)> ResetUserPasswordByEmailAsync(string email, string newPassword)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                return (false, "User not found.");
            }
            user.Password = newPassword;
            await _userRepository.UpdateAsync(user);
            return (true, "Password reset successfully.");
        }


        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _userRepository.GetByUsernameAsync(username);
        }

    }
}
