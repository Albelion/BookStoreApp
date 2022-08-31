using BookStoreApp.Data.Models;

namespace BookStoreApp.Data{
public interface IStoreRepository{
    IQueryable<Book> Books{get;}
    IQueryable<Rating> Ratings {get;}
    IQueryable<Autor> Autors {get;}
    Task<string> SaveImageAsync(IFormFile imageFile);
    void DeleteImage(string imageName);
    Task SaveBookAsync(Book b);
    Task CreateBookAsync(Book b);
    Task DeleteBookAsync(Book b);
    Task UpdateBookAsync(Book b);
    Task SaveAutorAsync(Autor a);
    void AddAutor(Autor a);
    Task DeleteAutorAsync(Autor a);
    Task SaveRatingAsync(Rating r);
    void AddRating(Rating r);
    Task UpdateRatingAsync(Rating b);
    Task DeleteRatingAsync(Rating r);
}
}
