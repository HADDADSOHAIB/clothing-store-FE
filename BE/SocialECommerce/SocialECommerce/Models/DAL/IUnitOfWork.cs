using SocialECommerce.Models.DAL.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialECommerce.Models.DAL
{
    interface IUnitOfWork:IDisposable
    {
        UserRepo Users { get; }
        int complete();
    }
}
