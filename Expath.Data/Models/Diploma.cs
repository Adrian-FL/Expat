using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Expath.DAL.Models
{
    public class Diploma
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public byte[] File { get; set; }
        public string FileName { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public int FacultyId { get;set; }
    }
}