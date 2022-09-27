using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApp.Data{
    public class UserRepository : IUserRepository
    {
        private readonly BookStoreDbContext _context;
        public UserRepository(BookStoreDbContext ctx)
        {
            _context = ctx;
        }
        public IQueryable<User> Users => _context.Users.Include(r=>r.Role);

        public IQueryable<Role> Roles => _context.Roles;

        public async Task<Role?> IsRoleExists(string name)
        {
            return await Roles.FirstOrDefaultAsync(r=>r.Name==name);
        }

        public async Task<User?> IsUserExists(string email)
        {
            return await Users.FirstOrDefaultAsync(u=>u.Email == email);
        }

        public async Task SaveRoleAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
        }

        public async Task SaveUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}