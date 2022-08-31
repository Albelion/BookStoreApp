namespace BookStoreApp.Data.Models{
    public class PagingInfo{
        public int TotalItems { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string? Criteria { get; set; }
    }
}