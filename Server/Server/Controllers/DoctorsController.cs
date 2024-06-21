using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using Server;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _context.Doctors.ToListAsync();
            return Ok(doctors);
        }
        [HttpGet("{firstName}")]
        public async Task<IActionResult> GetDoctorByName(string firstName)
        {
            var doctors = await _context.Doctors
                .FromSqlRaw("EXEC GetDoctorbyName @DoctorName", firstName)
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

            var doctor = new Doctor
            {
                FirstName = doctorModel.FirstName,
                LastName = doctorModel.LastName,
                PhoneNumber = doctorModel.PhoneNumber,
                /*User = new AspNetUser
                {
                    UserName = doctorModel.UserName,
                    PasswordHash = doctorModel.Password
                }*/
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return Ok(doctor);
        }
        [HttpPut("update/{id}")]
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

            doctor.FirstName = doctorModel.FirstName;
            doctor.LastName = doctorModel.LastName;
            doctor.PhoneNumber = doctorModel.PhoneNumber;
            /*doctor.User.UserName = doctorModel.UserName;
            doctor.User.PasswordHash = doctorModel.Password;*/

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

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return Ok("Doctor deleted.");
        }
    }

    public class DoctorModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
