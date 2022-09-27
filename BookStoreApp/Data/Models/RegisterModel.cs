using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class RegisterModel{
        [Required, StringLength(50, MinimumLength = 1)]
        public string? FirstName { get; set; }
        [Required, StringLength(50, MinimumLength = 1)]
        public string? LastName { get; set; }
        [Required, StringLength(12, MinimumLength =1)]
        public string? PhoneNumber { get; set; }
        [Required, EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}