using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class Favorite
    {
        //joined primary key both
        [Required]
       public string FavoriteName { get; set; }
        [Required]
       public string email { get; set; }    
    }
}
