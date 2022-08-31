using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApp.Data.Models{
public class Book{
    public int BookId { get; set; }
    public string Name { get; set; } = String.Empty;    
    public string Genre { get; set; } = String.Empty;
    public int PageNumber { get; set; }
    public int PublishYear { get; set; }
    public string ImageName { get; set; } = String.Empty;
    public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    [Column(TypeName = "decimal(8,2)")]
    public decimal Price { get; set; }
    public string Description { get; set; } = String.Empty;
    [NotMapped]
    public string ImageSrc {get; set;} = String.Empty;
    public ICollection<Autor> Autors { get; set; } = new List<Autor>();
}
}
