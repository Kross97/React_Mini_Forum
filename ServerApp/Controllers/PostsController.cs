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
    //[Route("api/[controller]")]
    //[ApiController]
    public class PostsController : Controller
    {
        private PostsContext db = new PostsContext();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await db.Posts.ToListAsync();
        }

        [HttpPost]
        public  void CreatePost([FromBody]Post post)
        {
 
            db.Posts.Add(post);
            db.SaveChangesAsync();
        }

    }
}
