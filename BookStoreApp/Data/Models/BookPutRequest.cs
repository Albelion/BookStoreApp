using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class BookPutRequest
    {
        [Required, StringLength(50, MinimumLength = 1)]
        public string? Name { get; set; }
        [Required, StringLength(50, MinimumLength = 1)]
        public string? Genre { get; set; }
        [Required, Range(1,100000)] 
        public int? PageNumber { get; set; }
        [Required, Range(1, 2023)] 
        public int? PublishYear { get; set; }
        public IFormFile? ImageFile {get; set;}
        public string? ImageName { get; set; }
        [Required, StringLength(500, MinimumLength =1)] 
        public string? Description { get; set;}
        [Required, Range(1,1000000)]
        public decimal? Price { get; set; }
        [Required]
        public ICollection<string>? Authors { get; set; }
    }
}