using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BookStoreApp.Data.Models{
    public class CartItem{
        [BindNever]
        public int CartItemId { get; set; }
        public Book Book { get; set; } = new();
        public int Quantity { get; set; }
    }
}