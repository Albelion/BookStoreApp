using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
namespace BookStoreApp.Data.Models{
    public class BookPostRequest{
        public string Name { get; set; }  = String.Empty;
        public string Genre { get; set; } = String.Empty;
        public int PageNumber { get; set; } 
        public int PublishYear { get; set; }
        public decimal Price {get; set;} 
        public string Description { get; set;} = String.Empty;
        public double? Rating { get; set; }
        public IFormFile? ImageFile {get; set;}
       //public string[]? AutorsName {get; set;}
        public ICollection<string> Autors { get; set; } = new List<string>();
    }
}