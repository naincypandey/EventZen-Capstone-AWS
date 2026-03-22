namespace venue_service.Models
{
    public class Venue
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public decimal PricePerDay { get; set; }
        
        // --- NEW MANAGEMENT FIELDS ---
        public string Status { get; set; } = "Available"; // Available, Occupied, Postponed
        public string VendorName { get; set; } = "Deloitte Global Partners";
        public int CurrentAttendees { get; set; } = 0;
    }
}