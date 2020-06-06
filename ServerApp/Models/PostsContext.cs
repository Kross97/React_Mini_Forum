using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Models
{
    public class PostsContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Comment> Comments { get; set; }
        
        public DbSet<Post> Posts { get; set; }

        public PostsContext()
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=TestDB3;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().HasData(new User
            {
                id = 1,
                name = "Ivan",
            }, new User
            {
                id = 2,
                name = "Vasil",
            });

            modelBuilder.Entity<Comment>().HasData(new Comment
            {
                id = 1,
                text = "hello!!!!",
                userId = 2,
                postId = 1,
            });

            modelBuilder.Entity<Post>().HasData(new Post
            {
                id = 1,
                text = "/Информация о работе с ASP.NET/",
                thema = "ASP.NET",
                userId = 1,
            });
        }
    }
}
