using Microsoft.EntityFrameworkCore;
using BookStoreApp.Data.Models;
namespace BookStoreApp.Data{
public class BookStoreDbContext:DbContext{
    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options):base(options){}
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Autor> Autors => Set<Autor>();
    public DbSet<Rating> Ratings => Set<Rating>();
    public DbSet<Order> Orders => Set<Order>();
}
}
