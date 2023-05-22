using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model.User
{
    public class User
    {
        [Key]
       public int UId { get; set; }
        [Required(ErrorMessage = "Please Enter your Email")]
        [Display(Name = "User Name")]
       public string UserName { get; set; }
        [Required(ErrorMessage = "Please Enter your Email")]
        [Display(Name = "Email Address")]
        [EmailAddress(ErrorMessage = "Please Enter Valid Email")]
       public string Email { get; set; }
        [Required(ErrorMessage = "Please Enter your Email")]
        [DataType(DataType.Password)]
       public string Password { get; set; }
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "Password and confirmation password do not match.")]
       public string ConfirmPassword { get; set; }
    }
}
