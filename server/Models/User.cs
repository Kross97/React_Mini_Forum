using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }
    }
}