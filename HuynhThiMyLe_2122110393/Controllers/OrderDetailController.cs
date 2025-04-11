using HuynhThiMyLe_2122110393.Data;
using HuynhThiMyLe_2122110393.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc;

namespace HuynhThiMyLe_2122110393.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderDetailController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> Get()
        {
            return await _context.OrderDetails
                .Include(od => od.Product)
                .Include(od => od.Order)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> Get(int id)
        {
            var detail = await _context.OrderDetails
                .Include(od => od.Product)
                .Include(od => od.Order)
                .FirstOrDefaultAsync(od => od.Id == id);

            if (detail == null) return NotFound();
            return Ok(detail);
        }
        [HttpGet("details/{orderId}")]
        public IActionResult GetOrderDetail(int orderId)
        {
            var details = _context.OrderDetails
                .Where(od => od.OrderId == orderId)
                .Select(od => new {
                    od.ProductId,
                    ProductName = od.Product.Name,
                    od.Quantity,
                    od.UnitPrice
                }).ToList();

            return Ok(details);
        }

        [HttpPost]
        public async Task<ActionResult<OrderDetail>> Post([FromBody] OrderDetail detail)
        {
            _context.OrderDetails.Add(detail);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = detail.Id }, detail);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] OrderDetail detail)
        {
            if (id != detail.Id) return BadRequest();

            var existing = await _context.OrderDetails.FindAsync(id);
            if (existing == null) return NotFound();

            existing.OrderId = detail.OrderId;
            existing.ProductId = detail.ProductId;
            existing.Quantity = detail.Quantity;
            existing.UnitPrice = detail.UnitPrice;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var detail = await _context.OrderDetails.FindAsync(id);
            if (detail == null) return NotFound();

            _context.OrderDetails.Remove(detail);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
