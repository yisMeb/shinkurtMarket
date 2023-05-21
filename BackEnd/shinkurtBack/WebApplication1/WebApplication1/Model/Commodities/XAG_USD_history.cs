﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model.Commodities
{
    public class XAG_USD_history
    {
        [Key]
        public int xagId { get; set; }
        [Required]
        public DateOnly Date { get; set; }
        public string Price { get; set; }
        public string? Open { get; set; }
        public string? High { get; set; }
        public string? Low { get; set; }
        public string? Volume { get; set; }
        [Display(Name = "Change %")]
        public string? changePercentage { get; set; }
    }

}
