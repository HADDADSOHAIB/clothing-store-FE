using Microsoft.AspNetCore.Identity;

namespace SocialECommerce.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(IdentityUser user);
    }
}