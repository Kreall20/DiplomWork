using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyServerApp.Data;
using Servernew.Models;
using System;
using System.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: schedule/all/ids
        [HttpGet("all/ids")]
        public async Task<IActionResult> GetAllScheduleRecordIds()
        {
            try
            {
                var scheduleRecordIds = await _context.ScheduleRecords.Select(p => p.ScheduleRecordId).ToListAsync();

                return Ok(scheduleRecordIds);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching schedule record IDs: {ex.Message}");
            }
        }
        // GET: schedule/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllScheduleRecords()
        {
            try
            {
                var scheduleRecords = await _context.ScheduleRecords
                    .ToListAsync();

                var extendedScheduleRecords = new List<ExtendedScheduleRecord>();

                foreach (var record in scheduleRecords)
                {
                    var extendedRecord = new ExtendedScheduleRecord
                    {
                        ScheduleRecordId = record.ScheduleRecordId,
                        DoctorId = record.DoctorId,
                        PatientId = record.PatientId,
                        AppointmentDate = record.AppointmentDate,
                        IsCompleted = record.IsCompleted
                    };

                    var patient = await _context.Patients.FindAsync(record.PatientId);
                    if (patient != null)
                    {
                        extendedRecord.PatientName = $"{patient.FirstName} {patient.LastName}";
                        extendedRecord.PatientPhone = patient.PhoneNumber;
                    }

                    var doctor = await _context.Doctors.FindAsync(record.DoctorId);
                    if (doctor != null)
                    {
                        extendedRecord.DoctorName = $"{doctor.FirstName} {doctor.LastName}";
                    }

                    extendedScheduleRecords.Add(extendedRecord);
                }

                return Ok(extendedScheduleRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching schedule records: {ex.Message}");
            }
        }

        // GET: schedule/today
        [HttpGet("today")]
        public async Task<IActionResult> GetAllScheduleRecordsToday()
        {
            try
            {
                var scheduleRecordsToday = await _context.ScheduleRecords
                    .FromSqlRaw("EXEC GetAllScheduleRecordsToday")
                    .ToListAsync();

                var extendedScheduleRecords = new List<ExtendedScheduleRecord>();

                foreach (var record in scheduleRecordsToday)
                {
                    var extendedRecord = new ExtendedScheduleRecord
                    {
                        ScheduleRecordId = record.ScheduleRecordId,
                        DoctorId = record.DoctorId,
                        PatientId = record.PatientId,
                        AppointmentDate = record.AppointmentDate,
                        IsCompleted = record.IsCompleted
                    };

                    var patient = await _context.Patients.FindAsync(record.PatientId);
                    if (patient != null)
                    {
                        extendedRecord.PatientName = $"{patient.FirstName} {patient.LastName}";
                    }

                    var doctor = await _context.Doctors.FindAsync(record.DoctorId);
                    if (doctor != null)
                    {
                        extendedRecord.DoctorName = $"{doctor.FirstName} {doctor.LastName}";
                    }

                    extendedScheduleRecords.Add(extendedRecord);
                }

                return Ok(extendedScheduleRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching schedule records for today: {ex.Message}");
            }
        }
        // POST: schedule/add
        [HttpPost("add")]
        public async Task<IActionResult> AddScheduleRecord([FromBody] ScheduleRecordModel model)
        {
            try
            {
                // Разделяем DoctorFIO на firstName и lastName
                string[] nameParts = model.DoctorFIO.Split(' ', 2);
                if (nameParts.Length < 2)
                {
                    return BadRequest("Invalid DoctorFIO format. Must include both first name and last name.");
                }

                string doctorFirstName = nameParts[0];
                string doctorLastName = nameParts[1];

                // Находим врача по firstName и lastName
                var doctor = await _context.Doctors
                    .FirstOrDefaultAsync(d => d.FirstName == doctorFirstName && d.LastName == doctorLastName);
                if (doctor == null)
                {
                    return NotFound("Doctor not found.");
                }

                // Добавляем запись о пациенте
                var patientId = await AddPatientAsync(model.FirstName, model.LastName, model.PhoneNumber);

                // Добавляем запись о расписании
                await AddScheduleRecordAsync(model.AppointmentDate, patientId, doctor.DoctorId);

                return Ok("Schedule records added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding schedule records: {ex.Message}");
            }
        }
        private async Task<int> AddPatientAsync(string firstName, string lastName, string phoneNumber)
        {
            var patient = new Patient
            {
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return patient.PatientId;
        }

        private async Task AddScheduleRecordAsync(DateTime appointmentDate, int patientId, int doctorId)
        {
            var appointmentDateParameter = new SqlParameter("@AppointmentDate", SqlDbType.DateTime)
            {
                Value = appointmentDate
            };
            var patientIdSqlParameter = new SqlParameter("@PatientId", patientId);
            var doctorIdParameter = new SqlParameter("@DoctorId", doctorId);
            var iscomplitedParametr = new SqlParameter("@is_complited", false);
            await _context.Database.ExecuteSqlRawAsync($@"
        EXEC [dbo].[AddScheduleRecord] @AppointmentDate, @PatientId, @DoctorId,@is_complited",
                appointmentDateParameter, patientIdSqlParameter, doctorIdParameter, iscomplitedParametr
            );
        }

        // GET: schedule/open//{id}
        [HttpGet("open/{ScheduleRecordId}")]
        public async Task<IActionResult> GetScheduleRecordById(int ScheduleRecordId)
        {
            try
            {
                var scheduleRecord = await _context.ScheduleRecords.FindAsync(ScheduleRecordId);
                if (scheduleRecord == null)
                {
                    return NotFound("Schedule record not found.");
                }

                var extendedRecord = new ExtendedScheduleRecord
                {
                    ScheduleRecordId = scheduleRecord.ScheduleRecordId,
                    DoctorId = scheduleRecord.DoctorId,
                    PatientId = scheduleRecord.PatientId,
                    AppointmentDate = scheduleRecord.AppointmentDate,
                    IsCompleted = scheduleRecord.IsCompleted
                };

                var patient = await _context.Patients.FindAsync(scheduleRecord.PatientId);
                if (patient != null)
                {
                    extendedRecord.PatientName = $"{patient.FirstName} {patient.LastName}";
                    extendedRecord.PatientPhone = patient.PhoneNumber;
                }

                var doctor = await _context.Doctors.FindAsync(scheduleRecord.DoctorId);
                if (doctor != null)
                {
                    extendedRecord.DoctorName = $"{doctor.FirstName} {doctor.LastName}";
                }

                return Ok(extendedRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching schedule record: {ex.Message}");
            }
        }
        // GET: schedule/doctor/{id}
        [HttpGet("doctor/{id}")]
        public async Task<IActionResult> GetScheduleRecordsByDoctorId(int id)
        {
            var scheduleRecords = await _context.ScheduleRecords
                .FromSqlInterpolated($"EXEC GetScheduleRecordsByDoctorId {id}")
                .ToListAsync();

            return Ok(scheduleRecords);
        }
        // PUT: schedule/update/{id}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateScheduleRecord(int id,ScheduleRecordModel model)
        {
            // Проверяем входные данные модели ScheduleRecordModel
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Находим запись расписания по id
                var scheduleRecord = await _context.ScheduleRecords.FindAsync(id);
                if (scheduleRecord == null)
                {
                    return NotFound("Schedule record not found.");
                }

                // Разделяем поле DoctorFIO на firstName и lastName
                string[] nameParts = model.DoctorFIO.Split(' ', 2);
                if (nameParts.Length < 2)
                {
                    return BadRequest("Invalid DoctorFIO format. Must include both first name and last name.");
                }

                string doctorFirstName = nameParts[0];
                string doctorLastName = nameParts[1];

                // Находим врача по firstName и lastName
                var doctor = await _context.Doctors
                    .FirstOrDefaultAsync(d => d.FirstName == doctorFirstName && d.LastName == doctorLastName);
                if (doctor == null)
                {
                    return NotFound("Doctor not found.");
                }

                // Поиск пациента по имени и номеру телефона
                var patient = await _context.Patients
                    .FirstOrDefaultAsync(p => p.FirstName == model.FirstName &&
                                              p.LastName == model.LastName &&
                                              p.PhoneNumber == model.PhoneNumber);

                // Если пациент не найден, создаем новую запись
                if (patient == null)
                {
                    patient = new Patient
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        PhoneNumber = model.PhoneNumber
                    };
                    _context.Patients.Add(patient);
                    await _context.SaveChangesAsync(); // Сохраняем нового пациента
                }

                // Обновляем данные записи расписания
                scheduleRecord.AppointmentDate = model.AppointmentDate;
                scheduleRecord.PatientId = patient.PatientId; // Используем Id найденного или нового пациента
                scheduleRecord.DoctorId = doctor.DoctorId;

                // Сохраняем изменения в базе данных
                await _context.SaveChangesAsync();

                return Ok("Schedule record updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating schedule record: {ex.Message}");
            }
        }

        // DELETE: schedule/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteScheduleRecord(int id)
        {
            var scheduleRecord = await _context.ScheduleRecords.FindAsync(id);
            if (scheduleRecord == null)
            {
                return NotFound("Schedule record not found.");
            }

            try
            {
                _context.ScheduleRecords.Remove(scheduleRecord);
                await _context.SaveChangesAsync();
                return Ok("Schedule record deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting schedule record: {ex.Message}");
            }
        }
        // GET: schedule/past
        [HttpGet("past")]
        public async Task<IActionResult> GetPastScheduleRecords(
            DateTime? appointmentDate = null,
            string patientFirstName = null,
            string doctorFirstName = null,
            string orderByField = "appointment_date",
            string orderDirection = "ASC")
        {
            var scheduleRecords = await _context.ScheduleRecords
                .FromSqlInterpolated($@"
                    EXEC GetPastScheduleRecords 
                        @AppointmentDate = {appointmentDate}, 
                        @PatientFirstName = {patientFirstName}, 
                        @DoctorFirstName = {doctorFirstName}, 
                        @OrderByField = {orderByField}, 
                        @OrderDirection = {orderDirection}
                ").ToListAsync();

            if (scheduleRecords == null || scheduleRecords.Count == 0)
            {
                return NotFound("No past schedule records found.");
            }

            return Ok(scheduleRecords);
        }
        // GET: schedule/pastdaterange
        [HttpGet("pastdaterange")]
        public async Task<IActionResult> GetPastScheduleRecordsByDateRange(DateTime? startDate, DateTime? endDate)
        {
            var totalPaymentAmountParam = new SqlParameter
            {
                ParameterName = "@TotalPaymentAmount",
                SqlDbType = System.Data.SqlDbType.Decimal,
                Direction = System.Data.ParameterDirection.Output,
                Precision = 18,
                Scale = 2
            };

            var scheduleRecords = await _context.ScheduleRecords
                .FromSqlInterpolated($@"
                    EXEC GetPastScheduleRecordsByDateRange 
                        @StartDate = {startDate}, 
                        @EndDate = {endDate}, 
                        @TotalPaymentAmount = {totalPaymentAmountParam} OUTPUT
                ").ToListAsync();

            var totalPaymentAmount = (decimal)totalPaymentAmountParam.Value;

            if (scheduleRecords == null || scheduleRecords.Count == 0)
            {
                return NotFound("No past schedule records found.");
            }

            return Ok(new
            {
                TotalPaymentAmount = totalPaymentAmount,
                ScheduleRecords = scheduleRecords
            });
        }
        public class ScheduleRecordModel
        {
            public DateTime AppointmentDate { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string PhoneNumber { get; set; }
            public string DoctorFIO { get; set; }
        }
        public class ExtendedScheduleRecord
        {
            public int ScheduleRecordId { get; set; }
            public int? DoctorId { get; set; }
            public int? PatientId { get; set; }
            public DateTime? AppointmentDate { get; set; }
            public bool IsCompleted { get; set; }
            public string PatientName { get; set; }
            public string DoctorName { get; set; }
            public string PatientPhone { get; set;}
        }
    }
}
