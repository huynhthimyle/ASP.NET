using HuynhThiMyLe_2122110393.Data;
using HuynhThiMyLe_2122110393.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;  // Đừng quên thêm namespace này
using System.Collections.Generic;
using System.Linq;

namespace HuynhThiMyLe_2122110393.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ProductController> _logger;  // Thêm ILogger

        public ProductController(AppDbContext context, ILogger<ProductController> logger)
        {
            _context = context;
            _logger = logger;  // Khởi tạo logger
        }

        // 📌 Lấy danh sách sản phẩm
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return await _context.Products.ToListAsync();
        }
        // GET: api/Product/5 (Lấy sản phẩm theo ID)
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound("Product not found");
            return Ok(product);
        }

        [HttpGet("by-category/{categoryId}")]
        public IActionResult GetProductByCategoryId(int categoryId)
        {
            var products = _context.Products.Where(p => p.CategoryId == categoryId).ToList();
            return Ok(products);
        }

        // 📌 Thêm sản phẩm mới

        [HttpPost]
        public ActionResult<Product> CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        private object GetProduct()
        {
            throw new NotImplementedException();
        }

        // 📌 Sửa sản phẩm

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Product product)
        {
            //if (id != product.Id)
            //{
            //    return BadRequest("ID không khớp");
            //}

            //_context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                _logger.LogWarning($"Product with ID {id} not found for deletion.");
                return NotFound();
            }

            _logger.LogInformation($"Deleting product with ID: {id}");
            _context.Products.Remove(product);
            _context.SaveChanges();

            _logger.LogInformation($"Product with ID {id} deleted successfully.");
            return NoContent();
        }
    }
}
