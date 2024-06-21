using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Servernew .Models;

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
        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _context.Patients
                .FromSqlRaw("EXEC GetAllPatients")
                .ToListAsync();
            return Ok(patients);
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
