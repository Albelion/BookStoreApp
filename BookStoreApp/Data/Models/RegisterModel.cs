using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class RegisterModel{
        [Required, StringLength(50, MinimumLength = 1)]
        public string FirstName { get; set; } = String.Empty;
        [Required, StringLength(50, MinimumLength = 1)]
        public string LastName { get; set; } = String.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        public string Password { get; set; } = String.Empty;
    }
}