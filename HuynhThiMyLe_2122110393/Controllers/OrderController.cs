using HuynhThiMyLe_2122110393.Data;
using HuynhThiMyLe_2122110393.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace HuynhThiMyLe_2122110393.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> Get()
        {
            return await _context.Orders.Include(o => o.OrderDetails).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderDetails)
                                             .FirstOrDefaultAsync(o => o.Id == id);
            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpGet("by-user/{userId}")]
        public IActionResult GetOrderByUserId(int userId)
        {
            var orders = _context.Orders.Where(o => o.UserId == userId).ToList();
            return Ok(orders);
        }


        [HttpPost]
        public async Task<ActionResult<Order>> Post([FromBody] Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Order order)
        {
            if (id != order.Id) return BadRequest();

            var existing = await _context.Orders.FindAsync(id);
            if (existing == null) return NotFound();

            existing.CustomerName = order.CustomerName;
            existing.CustomerEmail = order.CustomerEmail;
            existing.CreatedAt = order.CreatedAt;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
