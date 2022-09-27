using BookStoreApp.Data.Models;

namespace BookStoreApp.Data{
    public interface IBookCache{
        Book? Get(int bookId);
        void Remove(int bookId);
        void Set(Book book);
    }
}