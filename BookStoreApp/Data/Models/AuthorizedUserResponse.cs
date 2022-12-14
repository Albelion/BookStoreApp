using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class AuthorizedUserResponse
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = String.Empty;
        public string PhoneNumber { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Role { get; set; } = String.Empty;
        public string Token { get; set; } = String.Empty;
    }
}