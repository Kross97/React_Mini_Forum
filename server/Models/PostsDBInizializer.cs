using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Server.Models
{
    public class PostsDBInizializer : DropCreateDatabaseAlways<PostsContext>
    {
        protected override void Seed(PostsContext db)
        {
            db.Posts.Add(new Post {
             id = 1,
             text = "/Информация о работе с ASP.NET/",
             thema = "ASP.NET",
             user = new User
             {
                 id = 1,
                 name = "Иван",
             },
             comments = new List<Comment>
             {
                 new Comment
                 {
                     id = 1,
                     text = "Интересная информация!!!",
                     user = new User
                     {
                         id = 2,
                         name = "Василий",
                     }
                 },
                 new Comment
                 {
                     id = 2,
                     text = "Оказалось полезным",
                     user = new User
                     {
                         id = 3,
                         name = "Петр",
                     }
                 }
             }
            });

            db.Posts.Add(new Post
            {
                id = 2,
                text = "/Документация AJAX/",
                thema = "React JS/AJAX",
                user = new User
                {
                    id = 4,
                    name = "Кирилл",
                },
                comments = new List<Comment>
             {
                 new Comment
                 {
                     id = 3,
                     text = "надо будет попробовать",
                     user = new User
                     {
                         id = 5,
                         name = "Василий",
                     }
                 },
                 new Comment
                 {
                     id = 4,
                     text = "и я тоже попробую",
                     user = new User
                     {
                         id = 6,
                         name = "Петр",
                     }
                 }
             }
            });
            base.Seed(db);
        }
    }
}