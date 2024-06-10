using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class MedicalRecord
{
    public int MedicalRecordId { get; set; }

    public int? MedicalBookId { get; set; }

    public virtual MedicalBook? MedicalBook { get; set; }

    public virtual ICollection<Tooth> Teeth { get; set; } = new List<Tooth>();
}
