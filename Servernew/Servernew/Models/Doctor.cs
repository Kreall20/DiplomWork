using System;
using System.Collections.Generic;

namespace Servernew.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<ScheduleRecord> ScheduleRecords { get; set; } = new List<ScheduleRecord>();
}
