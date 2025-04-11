using HuynhThiMyLe_2122110393.Data;
using HuynhThiMyLe_2122110393.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HuynhThiMyLe_2122110393.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/category
        [HttpGet]
        public ActionResult<IEnumerable<Category>> Get()
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }

        // GET: api/category/5
        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST: api/category
        [HttpPost]
        public ActionResult<Category> Post([FromBody] Category category)
        {
            if (category == null || string.IsNullOrEmpty(category.Name) || string.IsNullOrEmpty(category.Image))
            {
                return BadRequest("Name and Image are required.");
            }

            _context.Categories.Add(category);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        // PUT: api/category/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest("Category ID mismatch.");
            }

            var existingCategory = _context.Categories.Find(id);
            if (existingCategory == null)
            {
                return NotFound();
            }

            existingCategory.Name = category.Name;
            existingCategory.Image = category.Image;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/category/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
