using Microsoft.AspNetCore.Mvc;
using venue_service.Models;
using System.Collections.Generic;
using System.Linq;

namespace venue_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VenueController : ControllerBase
    {
        // Static list acting as a database
        private static List<Venue> Venues = new List<Venue>
        {
            new Venue { Id = 1, Name = "Kolkata Town Hall", Location = "Esplanade", Capacity = 500, PricePerDay = 50000, Status = "Available" },
            new Venue { Id = 2, Name = "Eco Park Gallery", Location = "New Town", Capacity = 200, PricePerDay = 25000, Status = "Available" },
            new Venue { Id = 3, Name = "KalaMandir", Location = "Shakespeare Sarani", Capacity = 300, PricePerDay = 20000, Status = "Available" }
        };

        [HttpGet]
        public IEnumerable<Venue> Get() => Venues;

        [HttpPost]
        public IActionResult Post([FromBody] Venue venue)
        {
            if (venue == null) return BadRequest("Invalid Data");
            venue.Id = Venues.Any() ? Venues.Max(v => v.Id) + 1 : 1;
            venue.Status = "Available";
            Venues.Add(venue);
            return Ok(venue);
        }

        [HttpPut("{id}")]
public IActionResult Put(int id, [FromBody] Venue updatedVenue)
{
    // Find venue by matching ID
    var existing = Venues.FirstOrDefault(v => v.Id == id);
    
    if (existing == null) 
    {
        return NotFound(new { message = $"Venue with ID {id} not found." });
    }

    // Manual mapping to ensure no data is lost
    existing.Name = updatedVenue.Name;
    existing.Location = updatedVenue.Location;
    existing.Capacity = updatedVenue.Capacity;
    existing.PricePerDay = updatedVenue.PricePerDay;
    existing.Status = updatedVenue.Status ?? existing.Status;

    return Ok(existing);
}
    }
}