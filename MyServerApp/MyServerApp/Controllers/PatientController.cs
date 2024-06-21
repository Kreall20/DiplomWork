using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Servernew.Models;
using MyServerApp.Data;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientController : Controller
    {
        private readonly ApplicationDbContext _context;
        public PatientController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: patient
        [HttpGet("patients")]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _context.Patients
                .FromSqlRaw("EXEC GetAllPatients")
                .ToListAsync();
            return Ok(patients);
        }
        // GET: api/Patient/patients-without-medical-books
        [HttpGet("patients-without-medical-books")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsWithoutMedicalBooks()
        {
            try
            {
                var patientsWithoutMedicalBooks = await _context.Patients
                    .FromSqlRaw("EXEC GetPatientsWithoutMedicalBooks")
                    .ToListAsync();

                return Ok(patientsWithoutMedicalBooks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving patients without medical books: {ex.Message}");
            }
        }
        [HttpGet("patients-without-medical-books-search/{patientName}")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsWithoutMedicalBooksSearch(string patientName)
        {
            try
            {
                var parameter = new SqlParameter("@PatientName", SqlDbType.NVarChar, 50)
                {
                    Value = string.IsNullOrEmpty(patientName) ? DBNull.Value : (object)patientName
                };

                var patientsWithoutMedicalBooks = await _context.Patients
                    .FromSqlRaw("EXEC GetPatientsWithoutMedicalBooksSearch @PatientName", parameter)
                    .ToListAsync();

                return Ok(patientsWithoutMedicalBooks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving patients without medical books: {ex.Message}");
            }
        }
        // GET: patient/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }
            return Ok(patient);
        }

        // GET: patient/name/{name}
        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetPatientsByName(string name)
        {
            var patients = await _context.Patients
                .FromSqlInterpolated($"EXEC GetPatientbyName {name}")
                .ToListAsync();

            if (patients == null || patients.Count == 0)
            {
                return NotFound("Patients not found.");
            }

            return Ok(patients);
        }
    }
}
