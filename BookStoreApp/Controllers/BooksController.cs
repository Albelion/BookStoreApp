using Microsoft.AspNetCore.Mvc;
using BookStoreApp.Data;
using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IStoreRepository _dataRepository;
        //private readonly IHttpClientFactory _clientFactory;
        public BooksController(IStoreRepository dataRepository, IWebHostEnvironment hostEnvironment)
        {
            _dataRepository = dataRepository;
        }
        [HttpGet("{bookId}")]
        public async Task<ActionResult<Book>> GetBookByIdAsync(int bookId){
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId==bookId);
            
            if(book==null){
                return NotFound();
            }
            else{ 
                if (book.ImageName.Length!=0){
                        book.ImageSrc = GetImageResponsePath(book.ImageName);}
                     return book;}
        }
        [HttpGet("page/{page}")]
        public async Task<ActionResult<BookListView>> GetBookListByPageAsync(int page, int pageSize=3){
            var data = await _dataRepository.Books.Skip((page-1)*pageSize).Take(pageSize).ToListAsync();
            if(data!=null){
                foreach(Book book in data){
                    if(book.ImageName.Length!=0){
                        book.ImageSrc = GetImageResponsePath(book.ImageName);
                    }
                }
                int itemsCount = _dataRepository.Books.Count();
                return new BookListView(){BookList = data, PageInfo = new PagingInfo(){TotalItems = itemsCount, CurrentPage = page, PageSize = pageSize}};
            }
            else return NotFound();
        }
        [HttpGet("allBooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooksAsync(){
           if(_dataRepository.Books.Any()){
                var data = await _dataRepository.Books.ToListAsync();
                foreach(Book book in data){
                    if(book.ImageName.Length!=0){
                        book.ImageSrc = GetImageResponsePath(book.ImageName);
                    }
                }
                return data;
           } else return NotFound();
           
        }
        [HttpGet]
        public async Task<ActionResult<BookListView>> GetBookListBySearchAsync(string criteria, int page=1, int pageSize=3){
                var data =  await _dataRepository.Books.Where(book=>book.Name.Contains(criteria)).Skip((page-1)*pageSize).Take(pageSize).ToListAsync();
                int itemsCount = _dataRepository.Books.Count();
                if(data!=null){
                    foreach(Book book in data){
                        if(book.ImageName.Length!=0){
                            book.ImageName = GetImageResponsePath(book.ImageName);
                        }
                    }
                    return new BookListView(){BookList = data, PageInfo = new PagingInfo(){TotalItems = itemsCount, CurrentPage = page, PageSize = pageSize, Criteria = criteria}};
                }
                else return NotFound(); 
        }
        // Create book item
        [HttpPost]
        public async Task<ActionResult<Book>> PostBookAsync([FromForm] BookPostRequest postBook){
            Book bookToAdd = new Book();
            if(postBook.ImageFile!=null){
                bookToAdd.ImageName = await _dataRepository.SaveImageAsync(postBook.ImageFile);
            }
            
            foreach (var autor in postBook.Autors)
            {
                Autor? autorInBase = await _dataRepository.Autors.FirstOrDefaultAsync(a=>a.Name == autor);
                    if(autorInBase!=null){
                        // if autor doesn't exists in books autors
                        bookToAdd.Autors.Add(autorInBase);
                    }
                    // if autor doesn't exist in DB
                    else{
                       Autor newAutor = new Autor{Name = autor};
                        _dataRepository.AddAutor(newAutor);
                        bookToAdd.Autors.Add(newAutor);
                    }
            }
            if(postBook.Rating!=null){
                bookToAdd.Ratings.Add(new Rating{Value = postBook.Rating.Value, Qty = 1});
            }
            bookToAdd.Name = postBook.Name;
            bookToAdd.PageNumber = postBook.PageNumber;
            bookToAdd.PublishYear = postBook.PublishYear;
            bookToAdd.Description = postBook.Description;
            bookToAdd.Price = postBook.Price;
            bookToAdd.Genre = postBook.Genre;
            await _dataRepository.CreateBookAsync(bookToAdd);
            // create action
            //return CreatedAtAction(nameof(GetBookByIdAsync), new{bookId = bookToAdd.BookId}, bookToAdd);
            return bookToAdd;}
        // Edit book item
        [HttpPut("{bookId}")]
        public async Task<ActionResult<Book>> EditBookAsync(int bookId, [FromForm] BookPutRequest bookPutRequest){
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId==bookId);
            if(book==null){
                return NotFound();
            }
            else{
                if(!Enumerable.SequenceEqual(book.Autors.Select(a=>a.Name), bookPutRequest.Autors))
                {
                ICollection<Autor> newAutorsList = new List<Autor>();
                  foreach(var requestAutor in bookPutRequest.Autors){
                    // if autor exists in DB
                    Autor? autorInBase = await _dataRepository.Autors.FirstOrDefaultAsync(a=>a.Name == requestAutor);
                    if(autorInBase!=null){
                        // if autor doesn't exists in books autors
                        newAutorsList.Add(autorInBase);
                    }
                    // if autor doesn't exist in DB
                    else{
                        Autor autor1 = new Autor{Name = requestAutor};
                        _dataRepository.AddAutor(autor1);
                        newAutorsList.Add(autor1);
                    }
                  }
                  // Check Autors link to book
                    book.Autors = newAutorsList;
                  }
                  if(book.Name !=bookPutRequest.Name)
                    book.Name = bookPutRequest.Name;
                  if(book.Genre !=bookPutRequest.Genre)
                    book.Genre = bookPutRequest.Genre;
                  if(book.PageNumber!=bookPutRequest.PageNumber)
                    book.PageNumber = bookPutRequest.PageNumber;
                    if(book.ImageName!=bookPutRequest.ImageName&& bookPutRequest.ImageFile!=null){
                        _dataRepository.DeleteImage(book.ImageName);
                        book.ImageName = await _dataRepository.SaveImageAsync(bookPutRequest.ImageFile);
                    }
                  if(book.PublishYear!=bookPutRequest.PublishYear)
                    book.PublishYear = bookPutRequest.PublishYear;
                  if(book.Price!=bookPutRequest.Price)
                    book.Price = bookPutRequest.Price;
                  if(book.Description!=bookPutRequest.Description)
                    book.Description = bookPutRequest.Description;
                  await _dataRepository.UpdateBookAsync(book);
                  return book;
                }
            }
        // Delete book item
        [HttpDelete("{bookId}")]
        public async Task<ActionResult<Book>> DeleteBookAsync(int bookId){
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId==bookId);
            if(book==null){
                return NotFound();
            }
            else {
                _dataRepository.DeleteImage(book.ImageName);
                await _dataRepository.DeleteBookAsync(book);
                return book;
            }
        }

        // Create Rating
        [HttpPost("rating")]
        public async Task<ActionResult<Rating>> PostRatingAsync(RatingPostRequest ratingPost){
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId == ratingPost.BookId);
            int maxRatingCount = 5;
            if(book==null){
                return NotFound();
            }else{
                if(book.Ratings.FirstOrDefault(r=>r.Value == ratingPost.Value)==null){
                    // check to max rating
                    if(book.Ratings.Count()>=maxRatingCount){
                        var deletingRating = book.Ratings.OrderBy(r=>r.BookId).First();
                        await _dataRepository.DeleteRatingAsync(deletingRating);
                        //await _dataRepository.UpdateBookAsync(book);
                    }
                    Rating newRating = new Rating{Value = ratingPost.Value};
                    _dataRepository.AddRating(newRating);
                    book.Ratings.Add(newRating);
                    await _dataRepository.UpdateBookAsync(book);
                    return newRating;
                } else{
                    Rating changingRating = book.Ratings.FirstOrDefault(r=>r.Value == ratingPost.Value)!;
                    changingRating.Qty+=1;
                    await _dataRepository.UpdateRatingAsync(changingRating);
                    return changingRating;
                }
            }

        }
        [NonAction]
        public string GetImageResponsePath(string imageName){
            return String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
        }
    }
}
