using Expath.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Expath.DAL.Database
{
    public class ExpathContext : DbContext
    {
        public ExpathContext(DbContextOptions<ExpathContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Diploma> Diplomas { get; set; }
    }
}
