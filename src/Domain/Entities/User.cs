using System;
using System.ComponentModel.DataAnnotations;

namespace Sample.Test.Domain.Entities
{
    public class User : BaseAuditableEntity
    {
        public int UserID { get; set; }

        [MaxLength(250)]
        public string? FirstName { get; set; }

        [MaxLength(250)]
        public string? LastName { get; set; }

        [MaxLength(250)]
        public string? Email { get; set; }

        public DateTime DateAdded { get; set; }
    }
}







