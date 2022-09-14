using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class RatingPostRequest{
        [Required]
        public int BookId { get; set; }
        [Required]
        public int UserId{get; set;}
        [Required, Range(1,5)]
        public double Value { get; set; }
    }
}