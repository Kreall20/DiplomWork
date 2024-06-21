using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PastScheduleRecordsController: Controller
    {
        private readonly ApplicationDbContext _context;
        public PastScheduleRecordsController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
