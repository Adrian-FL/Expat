using Expath.DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Expath.DAL.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public UserType Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string MetaMaskPublicAddress { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public IList<Diploma> Diplomas { get; set; }
        public virtual List<User> Students { get; set; }
    }
}