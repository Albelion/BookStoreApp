using Microsoft.EntityFrameworkCore;
using BookStoreApp.Data.Models;
namespace BookStoreApp.Data{
public class BookStoreDbContext:DbContext{
    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options):base(options){}
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Author> Authors => Set<Author>();
    public DbSet<Rating> Ratings => Set<Rating>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
}
}
