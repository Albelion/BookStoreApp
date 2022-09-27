using Moq;
using MockQueryable.Moq;
using BookStoreApp.Controllers;
using BookStoreApp.Data;
using BookStoreApp.Data.Models;


namespace BookStoreApp.Test{
    public class BooksStoreControllerTests{
        public BooksController InitializationBooksStoreController(){
             // v2
             Mock<IStoreRepository> mockBookData2 = new Mock<IStoreRepository>();
             mockBookData2.Setup(b=>b.Books).Returns((new Book[]{
                new Book{BookId = 1, Name ="B1"},
                new Book{BookId = 2, Name ="B2"},
                new Book{BookId = 3, Name ="B3"},
                new Book{BookId = 4, Name ="B3"},
                new Book{BookId = 5, Name ="B5"},
             }).BuildMock());

            Mock<IUserRepository> mockUserData2 = new Mock<IUserRepository>();
             mockUserData2.Setup(u=>u.Users).Returns((new User[]{
                new User{UserId = 1, FirstName = "U1"},
                new User{UserId = 2, FirstName = "U2"},
                new User{UserId = 3, FirstName = "U3"},
             }).BuildMock());

             Mock<IBookCache> bookCache = new Mock<IBookCache>();

            return new BooksController(mockBookData2.Object, mockUserData2.Object, bookCache.Object); 
        }
        [Fact]
        public async void GetBooks_ReturnAllBooks(){
            // Arrange
            BooksController booksController = InitializationBooksStoreController();

            //Action
            var result = await booksController.GetAllBooksAsync();

            Assert.Equal(5, result?.Value?.Count());
        }
        [Fact]
        public async void GetBooks_ReturnBooksListByPage(){
            // Arrange
            BooksController booksController = InitializationBooksStoreController();
            // Action
            var result = await booksController.GetBookListByPageAsync(2, 3);
            // Assert
            Book[]? bookArray = result?.Value?.BookList.ToArray();
            Assert.NotNull(bookArray);
            if(bookArray!=null){
                Assert.Equal("B3", bookArray[0].Name);
                Assert.Equal("B5", bookArray[1].Name);
                Assert.Equal(2, bookArray.Count());
            }
        }
        [Fact]
        public async void GetBooks_ReturnBooksListByPageAndSearch(){
            // Arrange 
            BooksController booksController = InitializationBooksStoreController();
            // Action
            string criteria = "B3";
            const int pageNumber = 1;
            const int pageSize = 3;
            var result = await booksController.GetBookListBySearchAsync(criteria, pageNumber, pageSize);

            // Assert
            Book[]? bookArray = result?.Value?.BookList.ToArray();
            PagingInfo? pageInfo = result?.Value?.PageInfo;
            Assert.NotNull(bookArray);
            Assert.NotNull(pageInfo);
            if(bookArray!=null){
                Assert.Equal("B3", bookArray[0].Name);
                Assert.Equal(2, bookArray.Count());
            }
            if(pageInfo!=null){
                Assert.Equal(1, pageInfo.CurrentPage);
                Assert.Equal(3, pageInfo.PageSize);
                Assert.Equal(2, pageInfo.TotalItems);
            }
        }
        [Fact]
        public async void GetBook_ReturnBookById(){
            // Arrange
            BooksController booksController = InitializationBooksStoreController();
            // Action
            const int bookId = 2;
            var result = await booksController.GetBookByIdAsync(bookId);
            // Assert
            Book? foundedBook = result?.Value;
            Assert.NotNull(foundedBook);
            if(foundedBook!=null){
                Assert.Equal("B2", foundedBook.Name);
            }
        }
        [Fact]
        public async void Can_GetCurrentPaginationInfo(){
            // Arrange
            BooksController booksController = InitializationBooksStoreController();
            // Action
            var result = await booksController.GetBookListByPageAsync(2,3);
            // Assert
            PagingInfo? pagingInfo = result?.Value?.PageInfo;
            Assert.NotNull(pagingInfo);
            if(pagingInfo!=null){
                Assert.Equal(2, pagingInfo.CurrentPage);
                Assert.Equal(3, pagingInfo.PageSize);
                Assert.Equal(5, pagingInfo.TotalItems);
            }
        }
    }
}