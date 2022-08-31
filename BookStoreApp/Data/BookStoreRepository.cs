using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApp.Data{
public class BookStoreRepository:IStoreRepository
{
    private BookStoreDbContext context;
    private readonly IWebHostEnvironment _hostEnvironment;
    public BookStoreRepository(BookStoreDbContext ctx, IWebHostEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
        context = ctx;
    }

    public IQueryable<Book> Books => context.Books.Include(r=>r.Ratings).Include(a=>a.Autors);

    public IQueryable<Rating> Ratings => context.Ratings.Include(b=>b.Book);
    

    public IQueryable<Autor> Autors => context.Autors.Include(a=>a.Books);

        public void AddAutor(Autor a)
        {
            context.Autors.Add(a);
       }

        public void AddRating(Rating r)
        {
            context.Ratings.Add(r);
            //await context.SaveChangesAsync();
        }

        public async Task DeleteAutorAsync(Autor a)
        {
            context.Autors.Remove(a);
            await context.SaveChangesAsync();
        }

        public async Task DeleteBookAsync(Book b)
        {
            context.Books.Remove(b);
            await context.SaveChangesAsync();
        }

        public async Task DeleteRatingAsync(Rating r)
        {
            context.Ratings.Remove(r);
            await context.SaveChangesAsync();
        }
        public async Task SaveAutorAsync(Autor a)
        {
            await context.SaveChangesAsync();
        }

        public async Task SaveBookAsync(Book b)
        {
            await context.SaveChangesAsync();
        }

        public async Task SaveRatingAsync(Rating r)
        {
            await context.SaveChangesAsync();
        }

        public async Task CreateBookAsync(Book b)
        {
            context.Books.Add(b);
            await context.SaveChangesAsync();
        }
        public async Task UpdateBookAsync(Book b)
        {
            context.Books.Update(b);
            await context.SaveChangesAsync();
        }

        public async Task UpdateRatingAsync(Rating b)
        {
           context.Ratings.Update(b);
           await context.SaveChangesAsync();
        }

        public async Task<string> SaveImageAsync(IFormFile imageFile)
        {
           string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(20).ToArray()).Replace(' ', '-');
            imageName = imageName +Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create)){
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if(System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
