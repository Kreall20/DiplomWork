using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyServerApp.Data;
using Servernew.Models;
using System.Data;
using static Server.Controllers.ScheduleController;

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
        /// GET: api/Patient/patients-with-medical-cards
        [HttpGet("patients-with-medical-cards")]
        public async Task<ActionResult<IEnumerable<PatientWithMedicalBookModel>>> GetPatientsWithMedicalCards()
        {
            try
            {
                var patientsWithMedicalBooks = await _context.MedicalBooks.ToListAsync();


                var extendedMedicalBooks = new List<PatientWithMedicalBookModel>();

                foreach (var record in patientsWithMedicalBooks)
                {
                    var patient = await _context.Patients.Where(p => p.PatientId == record.PatientId).FirstAsync();
                    var extendedRecord = new PatientWithMedicalBookModel
                    {
                        MedicalBookId = record.MedicalBookId,
                        PatientId = (int)record.PatientId,
                        FirstName = patient.FirstName,
                        LastName = patient.LastName,
                    };
                    extendedMedicalBooks.Add(extendedRecord);
                }

                    return Ok(extendedMedicalBooks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving patients with medical books: {ex.Message}");
            }
        }
        /// GET: api/Patient/patients-with-medical-cards
        [HttpGet("patients-with-medical-cards/{patientName}")]
        public async Task<ActionResult<IEnumerable<PatientWithMedicalBookModel>>> GetPatientsWithMedicalBooksSearch(string patientName)
        {
            try
            {
                var parameters = new SqlParameter("@PatientName", SqlDbType.NVarChar, 50)
                {
                    Value = patientName ?? (object)DBNull.Value
                };

                var extendedMedicalBooks = new List<PatientWithMedicalBookModel>();

                var patientsWithMedicalBooks = await _context.MedicalBooks
                    .FromSqlRaw("EXEC GetPatientsWithMedicalBooksSearch @PatientName", parameters)
                    .ToListAsync();

                foreach (var record in patientsWithMedicalBooks)
                {
                    var patient = await _context.Patients.Where(p => p.PatientId == record.PatientId).FirstAsync();
                    var extendedRecord = new PatientWithMedicalBookModel
                    {
                        MedicalBookId = record.MedicalBookId,
                        PatientId = (int)record.PatientId,
                        FirstName = patient.FirstName,
                        LastName = patient.LastName,
                    };
                    extendedMedicalBooks.Add(extendedRecord);
                }

                return Ok(extendedMedicalBooks);
            }
            catch (Exception ex)
            {
                // Handle exception as needed
                throw new Exception($"Error executing GetPatientsWithMedicalBooksSearch: {ex.Message}");
            }
        }

        // POST: medicalbook/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateMedicalBook(int patientId)
        {
            var patientExists = await _context.Patients.AnyAsync(p => p.PatientId == patientId);
            if (!patientExists)
            {
                return BadRequest("Patient with the specified ID does not exist.");
            }

            try
            {
                var medicalBook = new MedicalBook
                {
                    PatientId = patientId,
                    // Другие необходимые свойства карточки можно инициализировать здесь
                };

                _context.MedicalBooks.Add(medicalBook);
                await _context.SaveChangesAsync();
                return Ok("Medical book created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating medical book: {ex.Message}");
            }
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

        // DELETE: api/MedicalRecords/DeleteToothRecords/{patientId}/{toothNumber}
        [HttpDelete("DeleteToothRecords/{patientId}/{toothNumber}")]
        public async Task<IActionResult> DeleteToothRecords(int patientId, int toothNumber)
        {
            try
            {
                var medicalRecords = await _context.MedicalRecords
                    .Include(mr => mr.MedicalBook) // Включаем связанный MedicalBook
                    .Where(mr => mr.MedicalBook.PatientId == patientId)
                    .ToListAsync();

                // Часть 2: Фильтруем найденные MedicalRecords по toothNumber
                var medicalRecordsFiltered = medicalRecords
                    .Where(mr => mr.Teeth.Any(t => t.ToothNumber == toothNumber))
                    .ToList();

                if (medicalRecordsFiltered == null || medicalRecordsFiltered.Count == 0)
                {
                    return NotFound($"No medical records found for patient ID {patientId} and tooth number {toothNumber}");
                }

                // Удаляем найденные записи зубов
                foreach (var medicalRecord in medicalRecordsFiltered)
                {
                    var teethToDelete = medicalRecord.Teeth.Where(t => t.ToothNumber == toothNumber).ToList();
                    _context.Teeth.RemoveRange(teethToDelete);
                }

                await _context.SaveChangesAsync();

                return Ok($"Medical records for patient ID {patientId} and tooth number {toothNumber} deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting medical records for patient ID {patientId} and tooth number {toothNumber}: {ex.Message}");
            }
        }
        // DELETE: medicalbook/delete/{id}
        [HttpDelete("deletemedicalrecord/{medicalrecordid}")]
        public async Task<IActionResult> DeleteMedicalRecord(int medicalrecordid)
        {
            var medicalrecord = await _context.MedicalRecords.Where(m => m.MedicalRecordId == medicalrecordid).FirstOrDefaultAsync();
            if (medicalrecord == null)
            {
                return NotFound("Medical book not found.");
            }

            try
            {
                _context.MedicalRecords.Remove(medicalrecord);
                await _context.SaveChangesAsync();
                return Ok("Medical book deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting medical book: {ex.Message}");
            }
        }

        // DELETE: medicalbook/delete/{id}
        [HttpDelete("delete/{patientid}")]
        public async Task<IActionResult> DeleteMedicalBook(int patientid)
        {
            var medicalBook = await _context.MedicalBooks.Where(m => m.PatientId == patientid).FirstAsync();
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
        [HttpPost("add")]
        public async Task<IActionResult> AddMedicalRecord([FromBody] MedicalRecordModel medicalRecordModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Находим доктора по имени или фамилии
                var doctorNameParts = medicalRecordModel.DoctorName.Split(' ');
                string firstName = doctorNameParts[0];
                string lastName = doctorNameParts.Length > 1 ? doctorNameParts[1] : "";

                var doctor = await _context.Doctors
                    .Where(d => d.FirstName == firstName && d.LastName == lastName)
                    .FirstOrDefaultAsync();

                if (doctor == null)
                {
                    return BadRequest("Doctor not found");
                }

                var medicalbook = _context.MedicalBooks.FirstOrDefault(p => p.PatientId == medicalRecordModel.PatientId);

                if (medicalbook == null)
                {
                    return BadRequest("Medical book not found");
                }

                var medicalRecord = new MedicalRecord
                {
                    MedicalBookId = medicalbook.MedicalBookId,
                    Date = medicalRecordModel.Date,
                    DoctorId = doctor.DoctorId
                };

                await _context.MedicalRecords.AddAsync(medicalRecord);
                await _context.SaveChangesAsync();

                var toothrecord = new Tooth
                {
                    MedicalRecordId = medicalRecord.MedicalRecordId,
                    ToothNumber = medicalRecordModel.ToothNum,
                    DescriptionTooth = medicalRecordModel.Description
                };
                _context.Teeth.Add(toothrecord);
                await _context.SaveChangesAsync();

                return Ok("Medical record added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("records/{patientId}/{toothNum}")]
        public async Task<IActionResult> GetMedicalRecordsByPatientIdAndToothNum(int patientId, int toothNum)
        {
            try
            {
                // Создаем подключение к базе данных через контекст EF Core
                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.OpenAsync();

                    // Создаем команду для выполнения хранимой процедуры
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "GetMedicalRecordsByPatientIdAndToothNum";
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        // Добавляем параметры процедуры
                        command.Parameters.Add(new SqlParameter("@PatientId", patientId));
                        command.Parameters.Add(new SqlParameter("@ToothNum", toothNum));

                        // Выполняем запрос и считываем результаты
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            var medicalRecords = new List<MedicalRecordViewModel>();

                            while (await reader.ReadAsync())
                            {
                                var record = new MedicalRecordViewModel
                                {
                                    DescriptionTooth = reader.GetString(0),
                                    Date = reader.GetDateTime(1),
                                    MedicalRecordId = reader.GetInt32(2)
                                };

                                medicalRecords.Add(record);
                            }

                            return Ok(medicalRecords);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        public class PatientWithMedicalBookModel
        {
            public int PatientId { get; set; }
            public int MedicalBookId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
        public class MedicalRecordViewModel
        {
            public string DescriptionTooth { get; set; }
            public DateTime Date { get; set; }
            public int MedicalRecordId { get; set; }
        }
        public class MedicalRecordModel
        {
            public int? PatientId { get; set; }
            public int ToothNum { get; set; }
            public string DoctorName { get; set; }
            public DateTime Date { get; set; }
            public string Description { get; set; }
        }
    }
}
