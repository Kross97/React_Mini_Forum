using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApp.Models
{
    public class Post
    {
        public Post()
        {

        }
        [Key]
        public int id { get; set; }

        public string text { get; set; }

        public string thema { get; set; }

        public int? userId { get; set; }

        [ForeignKey("userId")]
        public virtual User user { get; set; }

        public virtual List<Comment> comments { get; set; }

    }
}
