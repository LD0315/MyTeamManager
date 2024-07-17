
using System;

namespace Sample.Test.Domain.Entities;
{
    public class User
    {
        public int UserID { get; set; }

        [StringLength(250)]
        public string FirstName { get; set; }

        [StringLength(250)]
        public string LastName { get; set; }

        [StringLength(250)]
        public string Email { get; set; }

        public DateTime DateAdded { get; set; }
    }
}








