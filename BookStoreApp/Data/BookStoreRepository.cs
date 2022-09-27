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

    public IQueryable<Book> Books => context.Books.Include(r=>r.Ratings).ThenInclude(a=>a.Users).ThenInclude(r=>r.Role).Include(a=>a.Authors);

    public IQueryable<Rating> Ratings => context.Ratings.Include(b=>b.Book).Include(u=>u.Users).ThenInclude(r=>r.Role);
    

    public IQueryable<Author> Authors => context.Authors.Include(a=>a.Books).ThenInclude(r=>r.Ratings).ThenInclude(a=>a.Users).ThenInclude(r=>r.Role);

        public void AddAuthor(Author a)
        {
            context.Authors.Add(a);
       }

        public void AddRating(Rating r)
        {
            context.Ratings.Add(r);
        }

        public async Task DeleteAuthorAsync(Author a)
        {
            context.Authors.Remove(a);
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
        public async Task SaveAuthorAsync(Author a)
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
            string imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if(IsImageExists(imageName)){
                System.IO.File.Delete(imagePath);   
            }                
        }

        public bool IsImageExists(string imageName)
        {
            string imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            return System.IO.File.Exists(imagePath)?true:false;
        }
    }
}
