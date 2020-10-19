<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostsController extends Controller
{

    public function create(Request $request) {
      $post = new Post(['thema'=> "{$request->input('thema')}", 'text' => "{$request->input('text')}"]);

      $user = new User(['name' => "{$request->input('user.name')}"]);
      $post->save();
      $post->refresh();

      $post->user()->save($user);
    }

    public function get() {
       $posts = Post::with(['user', 'comments.user'])->get();
       return $posts;
    }

}
