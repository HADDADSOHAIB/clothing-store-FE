using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SocialECommerce.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(
            IConfiguration configuration
            ){
            _configuration = configuration;
        }
        public string GenerateJwtToken(IdentityUser user)
        {
            var claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id)
            };

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Secret"]));
            var signingCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
