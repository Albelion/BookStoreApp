namespace BookStoreApp.Data.Models{
public class Autor{
    public int  AutorId { get; set; }
    public string Name { get; set; } = String.Empty;
    public ICollection<Book> Books { get; set; } = new List<Book>();
}
}
