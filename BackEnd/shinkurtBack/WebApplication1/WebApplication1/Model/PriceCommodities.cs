using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model
{
    public class PriceCommodities
    {
        [Key]
        public int id { get; set; }
        public string Name { get; set; }
        public string? Month { get; set; }
        public double? Last { get; set; }
        public double? High { get; set; }    
        public double? Low { get; set; }
        public string? Change { get; set; }
        [Display(Name = "Change %")]
        public string? ChangePercentage { get; set; }
        [NotMapped]
        public TimeOnly? Time { get; set; }
        
    }
}