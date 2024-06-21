using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Servernew.Models;

public partial class ScheduleRecord
{
    public int ScheduleRecordId { get; set; }

    public int? DoctorId { get; set; }

    public int? PatientId { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public virtual Doctor? Doctor { get; set; }
    public bool IsCompleted { get; set; }

    public virtual ICollection<PastScheduleRecord> PastScheduleRecords { get; set; } = new List<PastScheduleRecord>();

    public virtual Patient? Patient { get; set; }

}
