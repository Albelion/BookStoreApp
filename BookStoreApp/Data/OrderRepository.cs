using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApp.Data{
    public class OrderRepository: IOrderRepository{
        private BookStoreDbContext _context;
        public OrderRepository(BookStoreDbContext ctx)
        {
            _context = ctx;
        }

        public IQueryable<Order> Orders => _context.Orders.Include(l=>l.CartItems).ThenInclude(b=>b.Book).ThenInclude(a=>a.Authors).Include(l=>l.CartItems).ThenInclude(b=>b.Book).ThenInclude(r=>r.Ratings).ThenInclude(u=>u.Users).ThenInclude(r=>r.Role);

        public Order? SaveOrder(Order order)
        {
            if(order.OrderId==0){
                foreach(var cartItem in order.CartItems){
                    _context.Entry(cartItem.Book).State = EntityState.Unchanged;
                }
                _context.Orders.Add(order);
            }
            _context.SaveChanges();
            return order.OrderId==0?null:order;
        }
    }
}