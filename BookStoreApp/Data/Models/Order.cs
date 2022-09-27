using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class Order{
        [BindNever]
        public int OrderId { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        [Required, StringLength(50, MinimumLength =1)]
        public string? UserName  { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required, EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Zip { get; set; }
    }
}