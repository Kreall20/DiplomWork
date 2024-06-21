using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class ScheduleRecord
{
    public int ScheduleRecordId { get; set; }

    public int? DoctorId { get; set; }

    public int? PatientId { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual ICollection<PastScheduleRecord> PastScheduleRecords { get; set; } = new List<PastScheduleRecord>();

    public virtual Patient? Patient { get; set; }
}
