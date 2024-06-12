using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Tooth
{
    public int ToothId { get; set; }

    public int? MedicalRecordId { get; set; }

    public int ToothNumber { get; set; }

    public string? DescriptionTooth { get; set; }

    public virtual MedicalRecord? MedicalRecord { get; set; }
}
