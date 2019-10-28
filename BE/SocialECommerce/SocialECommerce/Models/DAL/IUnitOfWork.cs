using SEC.Models.DAL.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEC.Models.DAL
{
    interface IUnitOfWork:IDisposable
    {
        UserRepo Users { get; }
        int complete();
    }
}
