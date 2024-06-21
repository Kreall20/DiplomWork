using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Servernew.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicalBookController: Controller
    {
        private readonly ApplicationDbContext _context;
        public MedicalBookController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: medicalbook
        [HttpGet]
        public async Task<IActionResult> GetAllMedicalBooks()
        {
            var medicalBooks = await _context.MedicalBooks.ToListAsync();
            return Ok(medicalBooks);
        }

        // GET: medicalbook/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicalBookById(int id)
        {
            var medicalBook = await _context.MedicalBooks.FindAsync(id);
            if (medicalBook == null)
            {
                return NotFound("Medical book not found.");
            }
            return Ok(medicalBook);
        }

        // GET: medicalbook/records/name/{patientName}
        [HttpGet("records/name/{patientName}")]
        public async Task<IActionResult> GetMedicalRecordsByPatientName(string patientName)
        {
            var medicalRecords = await _context.MedicalRecords
                .FromSqlInterpolated($"EXEC GetAllMedicalRecordsByName {patientName}")
                .ToListAsync();

            if (medicalRecords == null || medicalRecords.Count == 0)
            {
                return NotFound("Medical records not found for the patient.");
            }

            return Ok(medicalRecords);
        }

        // GET: medicalbook/records/{patientId}
        [HttpGet("records/{patientId}")]
        public async Task<IActionResult> GetMedicalRecordsByPatientId(int patientId)
        {
            var medicalRecords = await _context.MedicalRecords
                .FromSqlInterpolated($"EXEC GetAllMedicalRecordsById {patientId}")
                .ToListAsync();

            if (medicalRecords == null || medicalRecords.Count == 0)
            {
                return NotFound("Medical records not found for the patient.");
            }

            return Ok(medicalRecords);
        }

        // DELETE: medicalbook/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteMedicalBook(int id)
        {
            var medicalBook = await _context.MedicalBooks.FindAsync(id);
            if (medicalBook == null)
            {
                return NotFound("Medical book not found.");
            }

            try
            {
                _context.MedicalBooks.Remove(medicalBook);
                await _context.SaveChangesAsync();
                return Ok("Medical book deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting medical book: {ex.Message}");
            }
        }
    }
}
