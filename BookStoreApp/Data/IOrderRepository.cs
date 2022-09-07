using BookStoreApp.Data.Models;
namespace BookStoreApp.Data{
    public interface IOrderRepository{
        IQueryable<Order> Orders {get;}
        Order? SaveOrder(Order order);
    }
}