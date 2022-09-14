using BookStoreApp.Data.Models;

namespace BookStoreApp.Data{
    public interface IUserRepository{
        IQueryable<User> Users {get;}
        IQueryable<Role> Roles {get;}
        Task SaveUserAsync(User user);
        Task SaveRoleAsync(Role role);
        Task<User?> IsUserExists(string email);
        Task<Role?> IsRoleExists(string name);
    }
}