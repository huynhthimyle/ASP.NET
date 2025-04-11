using System.ComponentModel.DataAnnotations.Schema;

namespace HuynhThiMyLe_2122110393.Model
{
    [Table("Categories")] // Đặt tên bảng rõ ràng ở đây

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    

    public List<Product> Products { get; set; } = new List<Product>();

    }
}
