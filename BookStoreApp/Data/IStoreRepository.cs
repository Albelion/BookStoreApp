using BookStoreApp.Data.Models;

namespace BookStoreApp.Data{
public interface IStoreRepository{
    IQueryable<Book> Books{get;}
    IQueryable<Rating> Ratings {get;}
    IQueryable<Author> Authors {get;}
    Task<string> SaveImageAsync(IFormFile imageFile);
    bool IsImageExists(string imageName);
    void DeleteImage(string imageName);
    Task SaveBookAsync(Book b);
    Task CreateBookAsync(Book b);
    Task DeleteBookAsync(Book b);
    Task UpdateBookAsync(Book b);
    Task SaveAuthorAsync(Author a);
    void AddAuthor(Author a);
    Task DeleteAuthorAsync(Author a);
    Task SaveRatingAsync(Rating r);
    void AddRating(Rating r);
    Task UpdateRatingAsync(Rating b);
    Task DeleteRatingAsync(Rating r);
}
}
