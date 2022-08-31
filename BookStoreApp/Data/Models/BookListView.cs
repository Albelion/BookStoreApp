namespace BookStoreApp.Data.Models{
   public class BookListView
    {
        public ICollection<Book> BookList { get; set; } = new List<Book>();
        public PagingInfo PageInfo { get; set; } = new PagingInfo();
    }
}