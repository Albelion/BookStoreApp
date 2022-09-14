using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class Order{
        [BindNever]
        public int OrderId { get; set; }
        [Required]
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        [StringLength(50, MinimumLength =1)]
        public string UserName  { get; set; } = String.Empty;
        [Required]
        public string PhoneNumber { get; set; } = String.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        public string Country { get; set; } = String.Empty;
        [Required]
        public string City { get; set; } = String.Empty;
        [Required]
        public string Zip { get; set; } = String.Empty;
    }
}