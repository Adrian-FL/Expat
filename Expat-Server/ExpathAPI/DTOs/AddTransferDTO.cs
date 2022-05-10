using System.ComponentModel.DataAnnotations;

namespace ExpathAPI.DTOs
{
    public class AddTransferDTO
    {
        [Required]
        public string StudentMetaMaskPublicAddress { get; set; }
        [Required]
        public string FacultyMetaMaskPublicAddress { get; set; }
    }
}
