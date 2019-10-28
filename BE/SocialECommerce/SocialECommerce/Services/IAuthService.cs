using Microsoft.AspNetCore.Identity;

namespace SEC.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(IdentityUser user);
    }
}