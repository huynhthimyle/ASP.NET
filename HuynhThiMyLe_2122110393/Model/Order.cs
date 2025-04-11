namespace HuynhThiMyLe_2122110393.Model
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public int UserId { get; set; } // 👈 Thêm dòng này

        public List<OrderDetail> OrderDetails { get; set; } = new();
    }

}
