using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApp.Data{
    public class OrderRepository: IOrderRepository{
        private BookStoreDbContext _context;
        public OrderRepository(BookStoreDbContext ctx)
        {
            _context = ctx;
        }

        public IQueryable<Order> Orders => _context.Orders.Include(l=>l.CartItems).ThenInclude(b=>b.Book).ThenInclude(a=>a.Autors).Include(l=>l.CartItems).ThenInclude(b=>b.Book).ThenInclude(r=>r.Ratings);

        public Order? SaveOrder(Order order)
        {
            if(order.OrderId==0){
                _context.AttachRange(order.CartItems.Select(l=>l.Book));
                _context.Orders.Add(order);
            }
            _context.SaveChanges();
            return order.OrderId==0?null:order;
        }
    }
}