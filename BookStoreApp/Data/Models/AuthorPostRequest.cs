using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class AuthorPostRequest{
        [Required, StringLength(50, MinimumLength=1)]
        public string? Name { get; set; }
    }
}