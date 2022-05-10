using Expath.DAL.Enums;
using System;
using System.Collections.Generic;

namespace ExpathAPI.DTOs
{
    public class UserDTO
    {
        public UserType Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string MetaMaskPublicAddress { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public IList<DiplomaDTO> Diplomas { get; set; }
    }
}
