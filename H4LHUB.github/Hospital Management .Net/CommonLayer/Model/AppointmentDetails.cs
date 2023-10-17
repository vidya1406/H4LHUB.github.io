using MongoDB.Bson.Serialization.Attributes;

namespace ClinicAppointmentBookingSystem.Model
{
    public class AppointmentDetails
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? ID { get; set; }
        public string? CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");
        public string? PatientUserID { get; set; } = string.Empty;
        public string? DoctorUserID { get; set; } = string.Empty;
        public string? AppointmentDate { get; set; } = string.Empty;
        public string? AppointmentTime { get; set; } = string.Empty;
        public string? PatientDescription { get; set; } = string.Empty;
        public string? DoctorDescription { get; set; } = string.Empty;
        public string? Price { get; set; } = string.Empty;
        public bool IsPayment { get; set; } = false;
        public string? Status { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
