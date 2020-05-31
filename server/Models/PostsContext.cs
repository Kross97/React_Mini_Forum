using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Server.Models
{
    public class PostsContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<User> Users { get; set; }
    }
}