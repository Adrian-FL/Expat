using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpathAPI.DTOs;
using ExpathAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ExpathAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] AddUserDTO addUserDTO)
        {
            try
            {
                _userService.AddUser(addUserDTO);
                return Ok(_userService.GetUserByMetaMaskAddress(addUserDTO.MetaMaskPublicAddress));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("diploma")]
        [HttpPost]
        //[RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public IActionResult UploadDiploma([FromForm] IList<IFormFile> file)
        {
            var files = Request.Form.Files;

            var studentMetamaskAddress = Request.Form["studentMetaMaskPublicAddress"];
            var facultyMetamaskAddress = Request.Form["facultyMetamaskPublicAddress"];

            var diploma = _userService.UploadDiploma(studentMetamaskAddress, facultyMetamaskAddress, files);

            return Ok(diploma);
        }

        [HttpGet]
        public IActionResult GetUserByMetamaskAddress(string metamaskAddress)
        {
            try
            {
                return Ok(_userService.GetUserByMetaMaskAddress(metamaskAddress));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("students")]
        [HttpGet]
        public IActionResult GetStudentsByFaculty(string metamaskAddress)
        {
            try
            {
                return Ok(_userService.GetStudentsByFaculty(metamaskAddress));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("faculty")]
        [HttpGet]
        public IActionResult GetFaculty()
        {
            try
            {
                return Ok(_userService.GetFaculty());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("transfer")]
        [HttpPost]
        public IActionResult Transfer([FromBody] AddTransferDTO transferDTO)
        {
            try
            {
                return Ok(_userService.TransferStudent(transferDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}