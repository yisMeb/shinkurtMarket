using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model.User
{
    public class Login
    {
        
        [Required(ErrorMessage = "Please enter your UserName")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Please enter your Password")]
        public string Password { get; set; }
        [ForeignKey("User")]
        public int UId { get; set; }
        public User User { get; set; }
    }
}
