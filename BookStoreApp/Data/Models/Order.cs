using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BookStoreApp.Data.Models{
    public class Order{
        [BindNever]
        public int OrderId { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public string UserName  { get; set; } = String.Empty;
        public string PhoneNumber { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Country { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;
        public string Zip { get; set; } = String.Empty;
    }
}