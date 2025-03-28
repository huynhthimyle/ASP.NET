using HuynhThiMyLe_2122110393.Model;
using Microsoft.EntityFrameworkCore;


namespace HuynhThiMyLe_2122110393.Data


{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
