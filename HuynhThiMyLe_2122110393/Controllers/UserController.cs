using HuynhThiMyLe_2122110393.Data;
using HuynhThiMyLe_2122110393.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HuynhThiMyLe_2122110393.Controllers
{

    
        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private readonly AppDbContext _context;

            public UserController(AppDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            public ActionResult<IEnumerable<User>> Get()
            {
                return Ok(_context.Users.ToList());
            }

            [HttpGet("{id}")]
            public ActionResult<User> Get(int id)
            {
                var user = _context.Users.Find(id);
                if (user == null) return NotFound();
                return Ok(user);
            }

            [HttpPost]
            public ActionResult<User> Post([FromBody] User user)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
            }

            [HttpPut("{id}")]
            public ActionResult Put(int id, [FromBody] User user)
            {
                if (id != user.Id) return BadRequest();
                var existing = _context.Users.Find(id);
                if (existing == null) return NotFound();

                existing.Name = user.Name;
                existing.Email = user.Email;
                existing.Password = user.Password;

                _context.SaveChanges();
                return NoContent();
            }

            [HttpDelete("{id}")]
            public ActionResult Delete(int id)
            {
                var user = _context.Users.Find(id);
                if (user == null) return NotFound();

                _context.Users.Remove(user);
                _context.SaveChanges();
                return NoContent();
            }
        }
    }
