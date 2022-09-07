using Microsoft.AspNetCore.Mvc;
using BookStoreApp.Data;
using BookStoreApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApp.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController: ControllerBase{
        private readonly IOrderRepository _dataRepository;
        public OrderController(IOrderRepository repository)
        {
            _dataRepository = repository;
        }
        [HttpPost]
        public ActionResult<Order> PostOrder(Order order){
            Order? newOrder = _dataRepository.SaveOrder(order);
            return newOrder ==null?NotFound():newOrder;
        }
    }
}