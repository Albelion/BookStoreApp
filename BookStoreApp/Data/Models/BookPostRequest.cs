using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
namespace BookStoreApp.Data.Models{
    public class BookPostRequest{
        [Required(ErrorMessage ="Введите название книги")]
        public string? Name { get; set; }
        [Required(ErrorMessage ="Введите название жанра")]
        public string? Genre { get; set; } 
        [Required(ErrorMessage ="Введите количество страниц"), Range(1, 1000000)] 
        public int? PageNumber { get; set; }
        [Required(ErrorMessage ="Введите год публикации"), Range(1, 2023)]  
        public int? PublishYear { get; set; }
        [Required(ErrorMessage = "Введите стоимость книги"), Range(0, 1000000)]
        public decimal? Price {get; set;}
        [Required(ErrorMessage = "Введите описание книги"), StringLength(500, MinimumLength = 1)] 
        public string? Description { get; set;}
        public double? Rating { get; set; }
        public IFormFile? ImageFile {get; set;}
       //public string[]? AuthorsName {get; set;}
        [Required(ErrorMessage = "Укажите авторов книги")]
        public ICollection<string>? Authors { get; set; }
    }
}