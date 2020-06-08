using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using System.Diagnostics;
using System.Text.Json;
using System.Dynamic;

namespace ServerApp.Controllers
{

    public class PostsController : Controller
    {
        private PostsContext db;

        public PostsController(PostsContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await db.Posts.ToListAsync();
        }

        [HttpPost]
        public async Task CreatePost([FromBody]Post post)
        {
           if(post != null)
            {
                db.Posts.Add(post);
                await db.SaveChangesAsync();
            }
        }

        [HttpPost]
        public async Task CreateComment(int id, [FromBody]Comment comment)
        {
            Post currentPost = db.Posts.Find(id);
            if (currentPost != null && comment != null)
            {
                currentPost.comments.Add(comment);
                db.Entry(currentPost).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        [HttpPatch]
        public async Task PatchPost(int id,[FromBody]Post post)
        {
            Post currentPost = db.Posts.Find(id);
            if (currentPost != null)
            {
                currentPost.text = post.text;
                currentPost.thema = post.thema;
                currentPost.user.name = post.user.name;
                db.Entry(currentPost).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        [HttpPatch]
        public async Task PatchComment(int id,[FromBody]Comment comment)
        {
            Comment currentComment = db.Comments.Find(id);
            if (currentComment != null)
            {
                currentComment.text = comment.text;
                currentComment.user.name = comment.user.name;
                db.Entry(currentComment).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        [HttpDelete]
        public async Task DeletePost(int id)
        {
            Post currentPost = db.Posts.Find(id);
            if(currentPost != null)
            { 
                db.Users.RemoveRange(currentPost.comments.Select(comment => comment.user));
                db.Comments.RemoveRange(currentPost.comments);
                db.Users.Remove(currentPost.user);
                db.Posts.Remove(currentPost);
                await db.SaveChangesAsync();
            }
        }
        
        [HttpDelete]
        public async Task DeleteComment(int id)
        {
            Comment currentComment = db.Comments.Find(id);
            if(currentComment != null)
            {
                db.Users.Remove(currentComment.user);
                db.Comments.Remove(currentComment);
                await db.SaveChangesAsync();
            }
        }

    }
}
