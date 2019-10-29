using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialECommerce.Models.DAL.User
{
    public class UserRepo:Repository<IdentityUser>,IUserRepo
    {
        private readonly DbSet<IdentityUser> _entities;

        public UserRepo(AppDbContext context):base(context)
        {
            _entities = context.Set<IdentityUser>();
        }
    }
}
