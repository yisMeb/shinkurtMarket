using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class PremiumUser
    {
        [Key]
        public string Id { get; set; }
        public string Eamil { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public int amount { get; set; }
        public bool isPaid { get; set; } 
    }
}
