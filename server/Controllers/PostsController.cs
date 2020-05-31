using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Server.Models;
using System.Data.Entity;
using System.Web.Http.Cors;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PostsController : ApiController
    {

        PostsContext db = new PostsContext();
        public IHttpActionResult GetPosts()
        {
            var resp = db.Posts.ToList();
            return Json(resp);
        }

        
        [HttpPost]
        public void CreatePost([FromBody]Post post)
        {
            db.Posts.Add(post);
            db.SaveChanges();
        }

        [HttpPost]
        public void CreateComment(int idEntity, [FromBody]dynamic comment)
        {
            Post currentPost = db.Posts.Find(idEntity);
             
            if (currentPost != null)
            {
                Comment currentComment = new Comment
                {
                    text = comment.text,
                    user = new User
                    {
                        name = comment.user.name,
                    }
                };
                currentPost.comments.Add(currentComment);
                db.Entry(currentPost).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void PatchPost(int id, [FromBody]dynamic post)
        {
            Post currentPost = db.Posts.Find(id);
            if (currentPost != null)
            {
                currentPost.text = post.text;
                currentPost.thema = post.thema;
                currentPost.user.name = post.user.name;
                db.Entry(currentPost).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void PatchComment(int idEntity,[FromBody] dynamic commentData)
        {
            Comment currentComment = db.Comments.Find(idEntity);
            if(currentComment != null)
            {
                currentComment.text = commentData.text;
                currentComment.user.name = commentData.user.name;
                db.Entry(currentComment).State = EntityState.Modified;
                db.SaveChanges();
            }
        }
        public void DeleteComment(int idEntity)
        {
            Comment currentComment = db.Comments.Find(idEntity);
            if (currentComment != null)
            {
                db.Users.Remove(currentComment.user);
                db.Comments.Remove(currentComment);
                db.SaveChanges();
            }
        }
        public void DeletePost(int id)
        {
            Post currentPost = db.Posts.Find(id);
            if (currentPost != null)
            {
                db.Users.RemoveRange(currentPost.comments.Select(comment => comment.user));
                db.Comments.RemoveRange(currentPost.comments);
                db.Users.Remove(currentPost.user);
                db.Posts.Remove(currentPost);
                db.SaveChanges();
            }
        }

    }
}
