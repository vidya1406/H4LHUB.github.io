using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLayer.Model
{
    public class UserDetails
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");
        public string? Name { get; set; } = string.Empty;
        [EmailAddress]
        public string? EmailID { get; set; } = string.Empty;
        public string? Address { get; set; } = string.Empty;
        public string? Gender { get; set; } = string.Empty;
        public string? ContactNumber { get; set; } = string.Empty;
        public string? DateOfBirth { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public string? Role {  get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
