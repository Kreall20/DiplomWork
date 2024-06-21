using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Server;
using Servernew.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using MyServerApp.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public DoctorsController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetAllDoctors()
        {
            var doctors = await _context.Doctors.ToListAsync();
            return doctors;
        }
        // GET: doctors/id
        [HttpGet("open/{doctorId}")]
        public async Task<IActionResult> GetDoctorWithUserName(int doctorId)
        {
            var doctorIdParam = new SqlParameter("@DoctorId", doctorId);

            var doctors = await _context.Doctors
                .FromSqlRaw("EXEC GetDoctorbyId @DoctorId", doctorIdParam)
                .ToListAsync();

            if (doctors == null || doctors.Count == 0)
            {
                return NotFound("Doctor not found.");
            }

            var doctor = doctors.First();

            var userName = await GetUserNameFromAspNetUsersAsync(doctor.UserId);

            if (userName == null)
            {
                return NotFound("Username not found for the doctor.");
            }

            var doctorModel = new DoctorModel
            {
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                PhoneNumber = doctor.PhoneNumber,
                UserName = userName
            };

            return Ok(doctorModel);
        }

        private async Task<string> GetUserNameFromAspNetUsersAsync(string userId)
        {
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                await connection.OpenAsync();

                var commandText = $"SELECT UserName FROM AspNetUsers WHERE Id = @UserId";
                using (var command = new SqlCommand(commandText, connection))
                {
                    command.Parameters.AddWithValue("@UserId", userId);
                    var result = await command.ExecuteScalarAsync();
                    return result?.ToString();
                }
            }
        }
        [HttpGet("byname/{name}")]
        public async Task<IActionResult> GetDoctorByName(string name)
        {
            var doctorIdParam = new SqlParameter("@DoctorName", name);

            var doctors = await _context.Doctors
                .FromSqlRaw("EXEC GetDoctorbyName @DoctorName", doctorIdParam)
                .ToListAsync();

            if (doctors == null || doctors.Count == 0)
            {
                return NotFound("Doctor not found.");
            }

            return Ok(doctors);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddDoctor([FromBody] DoctorModel doctorModel)
        {
            if (doctorModel == null)
            {
                return BadRequest("Invalid data.");
            }

            var newUser = new IdentityUser
            {
                UserName = doctorModel.UserName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(newUser, doctorModel.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var doctor = new Doctor
            {
                FirstName = doctorModel.FirstName,
                LastName = doctorModel.LastName,
                PhoneNumber = doctorModel.PhoneNumber,
                UserId = newUser.Id
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return Ok(doctor);
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] DoctorModel doctorModel)
        {
            if (doctorModel == null)
            {
                return BadRequest("Invalid data.");
            }

            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }

            var user = await _userManager.FindByIdAsync(doctor.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.UserName = doctorModel.UserName;
            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors);
            }

            if (!string.IsNullOrWhiteSpace(doctorModel.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var passwordChangeResult = await _userManager.ResetPasswordAsync(user, token, doctorModel.Password);
                if (!passwordChangeResult.Succeeded)
                {
                    return BadRequest(passwordChangeResult.Errors);
                }
            }

            doctor.FirstName = doctorModel.FirstName;
            doctor.LastName = doctorModel.LastName;
            doctor.PhoneNumber = doctorModel.PhoneNumber;

            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();

            return Ok(doctor);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }

            var user = await _userManager.FindByIdAsync(doctor.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            _context.Doctors.Remove(doctor);

            if (!user.UserName.Equals("admin - user"))
            {
                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest("Failed to delete user.");
                }
            }

            await _context.SaveChangesAsync();

            return Ok("Doctor and associated user deleted.");
        }
    }

    public class DoctorModel
    {
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Login is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
