using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Servernew.Models;
using System;

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
        // GET: schedule/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllScheduleRecords()
        {
            var scheduleRecords = await _context.ScheduleRecords
                .FromSqlRaw("EXEC GetAllScheduleRecords")
                .ToListAsync();

            return Ok(scheduleRecords);
        }

        // GET: schedule/today
        [HttpGet("today")]
        public async Task<IActionResult> GetAllScheduleRecordsToday()
        {
            var scheduleRecordsToday = await _context.ScheduleRecords
                .FromSqlRaw("EXEC GetAllScheduleRecordsToday")
                .ToListAsync();

            return Ok(scheduleRecordsToday);
        }
        // POST: schedule/add
        [HttpPost("add")]
        public async Task<IActionResult> AddScheduleRecord(DateTime appointmentDate, int patientId, int doctorId)
        {
            try
            {
                // Вызываем хранимую процедуру AddScheduleRecord
                await _context.Database.ExecuteSqlInterpolatedAsync($@"
                    EXEC [dbo].[AddScheduleRecord]
                        {appointmentDate},
                        {patientId},
                        {doctorId}
                ");
                // После выполнения процедуры возвращаем успешный результат
                return Ok("Schedule record added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding schedule record: {ex.Message}");
            }
        }
        // GET: schedule/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScheduleRecordById(int id)
        {
            var scheduleRecord = await _context.ScheduleRecords.FindAsync(id);
            if (scheduleRecord == null)
            {
                return NotFound("Schedule record not found.");
            }
            return Ok(scheduleRecord);
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
        public async Task<IActionResult> UpdateScheduleRecord(int id, DateTime appointmentDate, int patientId, int doctorId)
        {
            var scheduleRecord = await _context.ScheduleRecords.FindAsync(id);
            if (scheduleRecord == null)
            {
                return NotFound("Schedule record not found.");
            }

            scheduleRecord.AppointmentDate = appointmentDate;
            scheduleRecord.PatientId = patientId;
            scheduleRecord.DoctorId = doctorId;

            try
            {
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
            List<ScheduleRecord> scheduleRecords = await _context.ScheduleRecords
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

            List<ScheduleRecord> scheduleRecords = await _context.ScheduleRecords
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
    }
}
