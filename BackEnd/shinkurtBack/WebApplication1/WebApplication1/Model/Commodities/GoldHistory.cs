using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model.Commodities
{
    public class GoldHistory
    {
        [Key]
        public int g_id { get; set; }
        public string? Date { get; set; }
        public string? Price { get; set; }
        public string? Open { get; set; }
        public string? High { get; set; }
        public string? Low { get; set; }
        public string? Volume { get; set; }
        [Display(Name = "Change %")]
        public string? changePercentage { get; set; }
    }
}
