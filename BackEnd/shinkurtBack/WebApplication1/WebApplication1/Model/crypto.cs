using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class crypto
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string price { get; set; }
        public string hour { get; set; }
        public string day { get; set; }
        public string marketCap { get; set; }
        public string Volume { get; set; }
    }
}
