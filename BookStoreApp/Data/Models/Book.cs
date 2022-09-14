using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookStoreApp.Data.Models{
public class Book{
    public int BookId { get; set; }
    [StringLength(50, MinimumLength =1)]
    public string Name { get; set; } = String.Empty; 
    [StringLength(50, MinimumLength =1)]   
    public string Genre { get; set; } = String.Empty;
    [Range(1,100000)] 
    public int PageNumber { get; set; }
    [Range(1, 2023)]
    public int PublishYear { get; set; }
    public string ImageName { get; set; } = String.Empty;
    public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    [Range(1,1000000)]
    [Column(TypeName = "decimal(8,2)")]
    public decimal Price { get; set; }
    [StringLength(2000, MinimumLength =1)]
    public string Description { get; set; } = String.Empty;
    [NotMapped]
    public string ImageSrc {get; set;} = String.Empty;
    public ICollection<Author> Authors { get; set; } = new List<Author>();
    }
}
