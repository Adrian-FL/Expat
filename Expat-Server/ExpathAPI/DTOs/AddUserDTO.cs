using Expath.DAL.Enums;
using System.ComponentModel.DataAnnotations;

namespace ExpathAPI.DTOs
{
    public class AddUserDTO
    {
        [Required]
        public UserType Type { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string MetaMaskPublicAddress { get; set; }
        [Required]
        public string FacultyMetaMaskPublicAddress { get; set; }
    }
}