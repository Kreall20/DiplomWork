using System;
using System.Collections.Generic;

namespace Servernew.Models;

public partial class Patient
{
    public int PatientId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<MedicalBook> MedicalBooks { get; set; } = new List<MedicalBook>();

    public virtual ICollection<ScheduleRecord> ScheduleRecords { get; set; } = new List<ScheduleRecord>();
}
