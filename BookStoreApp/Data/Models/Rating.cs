namespace BookStoreApp.Data.Models{
public class Rating{
    public int RatingId { get; set; }
    public double Value { get; set; }
    public int Qty { get; set;} = 1;
    public int BookId { get; set; }
    public Book? Book { get; set; } 
    public ICollection<User> Users { get; set; } = new List<User>();
}
}
