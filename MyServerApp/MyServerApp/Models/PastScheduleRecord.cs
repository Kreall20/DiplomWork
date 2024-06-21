using System;
using System.Collections.Generic;

namespace Servernew.Models;

public partial class PastScheduleRecord
{
    public int ScheduleRecordId { get; set; }

    public decimal PaymentAmount { get; set; }

    public int PastscheduleRecordId { get; set; }

    public virtual ScheduleRecord ScheduleRecord { get; set; } = null!;
}
