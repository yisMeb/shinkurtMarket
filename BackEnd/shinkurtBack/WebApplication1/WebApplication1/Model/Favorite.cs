using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class Favorite
    {
        [Required]
       public string FavoriteName { get; set; }
        [Required]
       public string email { get; set; }    
    }
}
