namespace BookStoreApp.Data.Models{
    public class BookPutRequest
    {
        public string Name { get; set; } = String.Empty;
        public string Genre { get; set; }= String.Empty;
        public int PageNumber { get; set; } 
        public int PublishYear { get; set; }
        public IFormFile? ImageFile {get; set;}
        public string ImageName { get; set; } = String.Empty;
        public string Description { get; set;} = String.Empty;
        public decimal Price { get; set; }
        public ICollection<string> Autors { get; set; } = new List<string>();
    }
}