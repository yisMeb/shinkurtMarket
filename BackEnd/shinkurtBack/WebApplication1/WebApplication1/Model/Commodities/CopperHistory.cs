using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model.Commodities
{
    public class CopperHistory
    {
        [Key]
        public int co_Id { get; set; }
        [Required]
        [NotMapped]
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public double? Open { get; set; }
        public double? High { get; set; }
        public double? Low { get; set; }
        public string? Volume { get; set; }
        [Display(Name = "Change %")]
        public string? changePercentage { get; set; }
    }
}
