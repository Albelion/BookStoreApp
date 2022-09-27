using Microsoft.AspNetCore.Mvc;
using BookStoreApp.Data;
using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;   
using System.IO;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IStoreRepository _dataRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBookCache _cache;
        //private readonly IHttpClientFactory _clientFactory;
        public BooksController(IStoreRepository dataRepository, IUserRepository userRepository, IBookCache bookCache)
        {
            _dataRepository = dataRepository;
            _userRepository = userRepository;
            _cache = bookCache;
        }
        [HttpGet("{bookId}")]
        public async Task<ActionResult<Book>> GetBookByIdAsync(int bookId){

            // Try to get cache data
            Book? book = _cache.Get(bookId);
            if(book == null){
                book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId==bookId);
                if(book ==null){
                    return NotFound();
                }
                book.ImageSrc = await GetImageSrcWithUpdateImageName(book);
                _cache.Set(book);
                } 
                return book;
        }
        [HttpGet("page/{page}")]
        public async Task<ActionResult<BookListView>> GetBookListByPageAsync(int page, int pageSize=3){
            var data = await _dataRepository.Books.Skip((page-1)*pageSize).Take(pageSize).ToListAsync();
                if(data == null){
                    return NotFound();
                }
                foreach(Book book in data){
                    book.ImageSrc = await GetImageSrcWithUpdateImageName(book);
                }
            int itemsCount = _dataRepository.Books.Count();
            return new BookListView(){BookList = data, PageInfo = new PagingInfo(){TotalItems = itemsCount, CurrentPage = page, PageSize = pageSize}};
        }
        [HttpGet("allBooks"), Authorize(Roles="admin")]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooksAsync(){
           if(_dataRepository.Books.Any()){
                var data = await _dataRepository.Books.ToListAsync();
                foreach(Book book in data){
                    book.ImageSrc = await GetImageSrcWithUpdateImageName(book);
                }
                return data;
           } else return NotFound();
           
        }
        [HttpGet]
        public async Task<ActionResult<BookListView>> GetBookListBySearchAsync(string criteria, int page=1, int pageSize=3){
                var data =  await _dataRepository.Books.Where(book=>book.Name.Contains(criteria)).Skip((page-1)*pageSize).Take(pageSize).ToListAsync();
                int  itemsCount = await _dataRepository.Books.Where(book=>book.Name.Contains(criteria)).CountAsync();
                if(data!=null){
                    foreach(Book book in data){
                        book.ImageSrc = await GetImageSrcWithUpdateImageName(book);
                    }
                    return new BookListView(){BookList = data, PageInfo = new PagingInfo(){TotalItems = itemsCount, CurrentPage = page, PageSize = pageSize, Criteria = criteria}};
                }
                else return NotFound(); 
        }
        // Create book item
        [HttpPost, Authorize(Roles="admin")]
        public async Task<ActionResult<Book>> PostBookAsync([FromForm] BookPostRequest postBook){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            Book bookToAdd = new Book();
            if(postBook.ImageFile!=null){
                bookToAdd.ImageName = await _dataRepository.SaveImageAsync(postBook.ImageFile);
            }
            
            foreach (var autor in postBook.Authors!)
            {
                Author? AuthorInBase = await _dataRepository.Authors.FirstOrDefaultAsync(a=>a.Name == autor.ToUpper());
                    if(AuthorInBase!=null){
                        // if Author doesn't exists in books Authors
                        bookToAdd.Authors.Add(AuthorInBase);
                    }
                    // if Author doesn't exist in DB
                    else{
                       Author newAuthor = new Author{Name = autor.ToUpper()};
                        _dataRepository.AddAuthor(newAuthor);
                        bookToAdd.Authors.Add(newAuthor);
                    }
            }
            if(postBook.Rating!=null){
                bookToAdd.Ratings.Add(new Rating{Value = postBook.Rating.Value, Qty = 1});
            }
            bookToAdd.Name = postBook.Name!;
            bookToAdd.PageNumber = postBook.PageNumber!.Value;
            bookToAdd.PublishYear = postBook.PublishYear!.Value;
            bookToAdd.Description = postBook.Description!;
            bookToAdd.Price = postBook.Price!.Value;
            bookToAdd.Genre = postBook.Genre!;
            await _dataRepository.CreateBookAsync(bookToAdd);
            // create action
            //return CreatedAtAction(nameof(GetBookByIdAsync), new{bookId = bookToAdd.BookId}, bookToAdd);
            return bookToAdd;}
        // Edit book item
        [HttpPut("{bookId}"), Authorize(Roles="admin")]
        public async Task<ActionResult<Book>> EditBookAsync(int bookId, [FromForm] BookPutRequest bookPutRequest){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId==bookId);
            if(book==null){
                return NotFound();
            }
            else{
                if(!Enumerable.SequenceEqual(book.Authors.Select(a=>a.Name), bookPutRequest.Authors!))
                {
                ICollection<Author> newAuthorsList = new List<Author>();
                  foreach(var requestAuthor in bookPutRequest.Authors!){
                    // if Author exists in DB
                    Author? authorInBase = await _dataRepository.Authors.FirstOrDefaultAsync(a=>a.Name == requestAuthor.ToUpper());
                    if(authorInBase!=null){
                        // if Author doesn't exists in books Authors
                        newAuthorsList.Add(authorInBase);
                    }
                    // if Author doesn't exist in DB
                    else{
                        Author author1 = new Author{Name = requestAuthor.ToUpper()};
                        _dataRepository.AddAuthor(author1);
                        newAuthorsList.Add(author1);
                    }
                  }
                  // Check Authors link to book
                    book.Authors = newAuthorsList;
                  }
                  if(book.Name !=bookPutRequest.Name)
                    book.Name = bookPutRequest.Name!;
                  if(book.Genre !=bookPutRequest.Genre)
                    book.Genre = bookPutRequest.Genre!;
                  if(book.PageNumber!=bookPutRequest.PageNumber)
                    book.PageNumber = bookPutRequest.PageNumber!.Value;
                    if(book.ImageName!=bookPutRequest.ImageName&& bookPutRequest.ImageFile!=null){
                        _dataRepository.DeleteImage(book.ImageName);
                        book.ImageName = await _dataRepository.SaveImageAsync(bookPutRequest.ImageFile);
                    }
                  if(book.PublishYear!=bookPutRequest.PublishYear)
                    book.PublishYear = bookPutRequest.PublishYear!.Value;
                  if(book.Price!=bookPutRequest.Price)
                    book.Price = bookPutRequest.Price!.Value;
                  if(book.Description!=bookPutRequest.Description)
                    book.Description = bookPutRequest.Description!;
                  await _dataRepository.UpdateBookAsync(book);
                  _cache.Remove(book.BookId);
                  return book;
                }
            }
        // Delete book item
        [HttpDelete("{bookId}"), Authorize(Roles="admin")]
        public async Task<ActionResult<Book>> DeleteBookAsync(int bookId){
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId==bookId);
            if(book==null){
                return NotFound();
            }
            else {
                _dataRepository.DeleteImage(book.ImageName);
                await _dataRepository.DeleteBookAsync(book);
                _cache.Remove(bookId);
                return book;
            }
        }

        // Create Rating
        [HttpPost("rating"), Authorize]
        public async Task<ActionResult<Rating>> PostRatingAsync(RatingPostRequest ratingPost){
            Book? book = await _dataRepository.Books.FirstOrDefaultAsync(b=>b.BookId == ratingPost.BookId);
            User? user = await _userRepository.Users.FirstOrDefaultAsync((u)=>u.UserId == ratingPost.UserId);
            int maxRatingCount = 5;
            
            if(book==null||user==null){
                return NotFound();
            }else{
                _cache.Remove(ratingPost.BookId);
                var selectedRatingsById = await _dataRepository.Ratings.Where(r=>r.BookId==ratingPost.BookId).SelectMany(ratings=>ratings.Users, (ratings, users)=>new{users}).Where(u=>u.users.UserId==user.UserId).FirstOrDefaultAsync();
                if(selectedRatingsById != null){
                    return BadRequest("Пользователь уже поставил рейтинг выбранной книге");
                }
                if(book.Ratings.FirstOrDefault(r=>r.Value == ratingPost.Value)==null){
                    // check to max rating
                    if(book.Ratings.Count()>=maxRatingCount){
                        var deletingRating = book.Ratings.OrderBy(r=>r.BookId).First();
                        await _dataRepository.DeleteRatingAsync(deletingRating);
                        //await _dataRepository.UpdateBookAsync(book);
                    }
                    Rating newRating = new Rating{Value = ratingPost.Value};
                    newRating.Users.Add(user);
                    _dataRepository.AddRating(newRating);
                    book.Ratings.Add(newRating);
                    await _dataRepository.UpdateBookAsync(book);
                    return newRating;
                } else{
                    Rating changingRating = book.Ratings.FirstOrDefault(r=>r.Value == ratingPost.Value)!;
                    changingRating.Qty+=1;
                    changingRating.Users.Add(user);
                    await _dataRepository.UpdateRatingAsync(changingRating);
                    return changingRating;
                }
            }

        }
        [NonAction]
        public string? GetImageResponsePath(string imageName){
            string newPath = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
            return _dataRepository.IsImageExists(imageName)?newPath:null;
        }
        [NonAction]
        public async Task<string> GetImageSrcWithUpdateImageName(Book book){
            if(book.ImageName.Length!=0){
                string? imageSrc = GetImageResponsePath(book.ImageName);

                // if image does't exist in local storage
                if(imageSrc == null){
                    book.ImageName = "";
                        await _dataRepository.UpdateBookAsync(book);
                        return "";
                }
                else{
                    return imageSrc;
                }
            }
            else return "";
        }
    }
}
