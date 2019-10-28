using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SEC.Models.DAL.User;

namespace SEC.Models.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public UserRepo Users { get; }
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users = new UserRepo(_context);
        }

        public int complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
