using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class MedicalBook
{
    public int MedicalBookId { get; set; }

    public int? PatientId { get; set; }

    public virtual ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();

    public virtual Patient? Patient { get; set; }
}
