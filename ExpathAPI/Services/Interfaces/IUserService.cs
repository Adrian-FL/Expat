using Expath.DAL.Models;
using ExpathAPI.DTOs;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ExpathAPI.Services.Interfaces
{
    public interface IUserService
    {
        void AddUser(AddUserDTO dto);
        UserDTO GetUserByMetaMaskAddress(string metaMaskAddress);
        Diploma UploadDiploma(string studentMetaMaskAddress, string facultyMetamaskAddress, IFormFileCollection files);
        IList<UserDTO> GetStudentsByFaculty(string metamaskAddress);
        IList<UserDTO> GetFaculty();
        UserDTO TransferStudent(AddTransferDTO transferDTO);
    }
}
