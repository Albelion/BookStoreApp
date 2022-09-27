using Microsoft.Extensions.Caching.Memory;
using BookStoreApp.Data.Models;

namespace BookStoreApp.Data{
    public class BookCache : IBookCache
    {
        private MemoryCache _cache {get; set;}
        public BookCache()
        {
            _cache = new MemoryCache(new MemoryCacheOptions{
                SizeLimit = 100
            });
        }
        private string GetCacheKey(int bookId)=>$"Book-{bookId}";
        public Book? Get(int bookId)
        {
            Book? book;
            _cache.TryGetValue(GetCacheKey(bookId), out book);
            return book;
        }

        public void Remove(int bookId)
        {
            _cache.Remove(GetCacheKey(bookId));
        }

        public void Set(Book book)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
            _cache.Set(GetCacheKey(book.BookId), book, cacheEntryOptions);
        }
    }
}