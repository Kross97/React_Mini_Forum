using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Comment
    {
        [Key]
        public int id { get; set; }

        public string text { get; set; }
        public int userId { get; set; }
        [ForeignKey("userId")]
        public virtual User user { get; set; }

    }
}