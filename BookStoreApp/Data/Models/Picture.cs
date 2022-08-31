namespace BookStoreApp.Data.Models{
    public class Picture
    {
        public int PictureId { get; set; }
        public int BookId {get; set;}
        public string Name { get; set; } = String.Empty;
        public string ContentType { get; set; } = String.Empty;
        public string Data { get; set; } = String.Empty;
    }
}