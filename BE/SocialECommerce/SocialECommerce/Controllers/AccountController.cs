using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SocialECommerce.Models.DTO;
using SocialECommerce.Services;

namespace SocialECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            IAuthService authService
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromBody] CredentialsDto credentialsDto)
        {
            var user = new IdentityUser
            {
                UserName = credentialsDto.Email,
                Email = credentialsDto.Email
            };
            var result = await _userManager.CreateAsync(user, credentialsDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest("Unexpected Error");
            }

            await _signInManager.SignInAsync(user, false);

            return Ok("{\"token\":\"" + _authService.GenerateJwtToken(user) + "\"}");

        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] CredentialsDto credentialsDto)
        {
            var result = await _signInManager.PasswordSignInAsync(credentialsDto.Email, credentialsDto.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest("Unexpected Error");
            }

            var appUser = _userManager.Users.SingleOrDefault(r => r.Email == credentialsDto.Email);
            return Ok("{\"token\":\""+ _authService.GenerateJwtToken(appUser) + "\"}");
        }
        [HttpPost("check")]
        public async Task<IActionResult> check([FromBody] EmailDto emailDto)
        {
            var result = await _userManager.FindByEmailAsync(emailDto.Email);
            if (result != null)
            {
                return BadRequest();
            }
            return Ok("{\"result\":\"email is ok\"}");
        }
    }
}
