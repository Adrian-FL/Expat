using Expath.DAL.Database;
using Expath.DAL.Enums;
using Expath.DAL.Models;
using ExpathAPI.DTOs;
using ExpathAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ExpathAPI.Services.Implementations
{
    public class UserService : IUserService
    {
        private ExpathContext _context;
        public UserService(ExpathContext context)
        {
            _context = context;
        }

        public void AddUser(AddUserDTO dto)
        {
            var faculty = _context.Users.Include(o=>o.Students).Where(o => o.MetaMaskPublicAddress == dto.FacultyMetaMaskPublicAddress).FirstOrDefault();
            var student = new User
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                MetaMaskPublicAddress = dto.MetaMaskPublicAddress,
                Timestamp = DateTime.Now,
                Type = dto.Type
            };

            _context.Users.Add(student);
            faculty.Students.Add(student);

            _context.SaveChanges();
        }

        public IList<UserDTO> GetFaculty()
        {
            var faculty = _context.Users.Where(o => o.Type == UserType.Faculty);
            return faculty.Select(o => new UserDTO
            {
                Email = o.Email,
                FirstName = o.FirstName,
                LastName = o.LastName,
                MetaMaskPublicAddress = o.MetaMaskPublicAddress
            }).ToList();
        }

        public IList<UserDTO> GetStudentsByFaculty(string metamaskAddress)
        {
            var faculty = _context.Users.Include(o => o.Students).Where(o => o.MetaMaskPublicAddress == metamaskAddress).FirstOrDefault();
            return faculty.Students.Select(o => new UserDTO
            {
                Email = o.Email,
                FirstName = o.FirstName,
                LastName = o.LastName,
                MetaMaskPublicAddress = o.MetaMaskPublicAddress
            }).ToList();
        }

        public UserDTO GetUserByMetaMaskAddress(string metaMaskAddress)
        {
            var user = _context.Users.Include(o => o.Diplomas).FirstOrDefault(o => o.MetaMaskPublicAddress == metaMaskAddress);
            if (user == null) throw new Exception(string.Format("User with address {0} doesn't exist", metaMaskAddress));
            return new UserDTO
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                MetaMaskPublicAddress = user.MetaMaskPublicAddress,
                Type = user.Type,
                Timestamp = user.Timestamp,
                Diplomas = user.Diplomas.Select(o => new DiplomaDTO
                {
                    File = o.File,
                    FileName = o.FileName,
                    Timestamp = o.Timestamp,
                    FacultyName = _context.Users.FirstOrDefault(u => u.Id == o.FacultyId)?.FirstName
                }).ToList()
            };
        }

        public UserDTO TransferStudent(AddTransferDTO transferDTO)
        {
            var student = _context.Users.FirstOrDefault(o => o.MetaMaskPublicAddress == transferDTO.StudentMetaMaskPublicAddress);
            var faculty = _context.Users.Include(o=>o.Students).FirstOrDefault(o => o.MetaMaskPublicAddress == transferDTO.FacultyMetaMaskPublicAddress);
            faculty.Students.Add(student);
            _context.SaveChanges();
            return this.GetUserByMetaMaskAddress(student.MetaMaskPublicAddress);
        }

        public Diploma UploadDiploma(string studentMetaMaskAddress, string facultyMetaMaskAddress, IFormFileCollection files)
        {
            var student = _context.Users.Include(o=>o.Diplomas).FirstOrDefault(o => o.MetaMaskPublicAddress == studentMetaMaskAddress);
            var faculty = _context.Users.FirstOrDefault(o => o.MetaMaskPublicAddress == facultyMetaMaskAddress);
            if (student == null) return null;

            var file = files[0];
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                var diploma = new Diploma
                {
                    File = stream.ToArray(),
                    FileName = file.FileName,
                    Timestamp = DateTime.Now,
                    FacultyId = faculty.Id
                };
                
                student.Diplomas.Add(diploma);
                _context.SaveChanges();
                return diploma;
            }
        }

    }
}