using System;

namespace ExpathAPI.DTOs
{
    public class DiplomaDTO
    {
        public byte[] File { get; set; }
        public string FileName { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public string FacultyName { get; set; }
    }
}
