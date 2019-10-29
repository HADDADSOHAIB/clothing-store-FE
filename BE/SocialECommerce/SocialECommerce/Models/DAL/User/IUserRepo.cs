using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialECommerce.Models.DAL.User
{
    interface IUserRepo:IRepository<IdentityUser>
    {

    }
}
