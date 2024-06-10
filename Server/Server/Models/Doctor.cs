using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<ScheduleRecord> ScheduleRecords { get; set; } = new List<ScheduleRecord>();
}
