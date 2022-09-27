using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using BookStoreApp.Infrastructure;
using BookStoreApp.Data.Models;
using BookStoreApp.Data;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApp.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController:ControllerBase{
        private const string defalutNameRole = "user";
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;
        public AuthController(IConfiguration configuration, IUserService userService, IUserRepository repo)
        {
            _config = configuration;
            _userService = userService;
            _userRepository = repo;
        }
        [HttpGet, Authorize]
        public ActionResult<string> GetMe(){
            var userName = _userService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromForm] RegisterModel registerModel){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            User? existUser = await _userRepository.IsUserExists(registerModel.Email!);
            if(existUser!=null){
                return BadRequest("Пользователь с таким email уже зарегистрирован");
            }
            User user = new User();
            _userService.CreatePasswordHash(registerModel.Password!, out byte[] passwordHash, out byte[] passwordSalt);
            user.FirstName = registerModel.FirstName!;
            user.LastName = registerModel.LastName!;
            user.Email = registerModel.Email!;
            user.PhoneNumber = registerModel.PhoneNumber!;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            Role? role = await _userRepository.IsRoleExists(defalutNameRole);
            if(role!=null){
                user.Role = role;
            }
            else{
                Role newRole = new Role(){Name = "user"};
                await _userRepository.SaveRoleAsync(newRole);
                user.Role = newRole;
            }
            await _userRepository.SaveUserAsync(user);
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<AuthorizedUserResponse>> Login([FromForm] LoginModel loginModel){
            User? user = await _userRepository.IsUserExists(loginModel.Email);
            if(user==null){
                return BadRequest("Пользователь не найден");
            }
            if(!_userService.VerifyPasswordHash(loginModel.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Неправильный пароль");
            }
            string token = CreateToken(user);
            AuthorizedUserResponse response = new AuthorizedUserResponse(){Email = user.Email, UserId = user.UserId, Role = user.Role.Name, Token = token, PhoneNumber = user.PhoneNumber, FullName = user.FirstName+" "+$"{user.LastName}"};
            return Ok(response);
        }

        private string CreateToken(User user){
            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _config.GetSection("AppSettings:Token").Value
            ));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token =new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}