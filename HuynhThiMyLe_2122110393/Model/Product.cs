namespace HuynhThiMyLe_2122110393.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image  { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public required Category Category { get; set; }
    }
}
