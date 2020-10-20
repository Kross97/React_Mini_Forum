<?php


namespace App\Http\Controllers;
use App\Models\Comment;
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

    public function delete($postId) {
        Post::destroy($postId);
        return "Post delete! Id: {$postId}";
    }

    public function update(Request $request, $postId) {
      $post = Post::find($postId);
      $post->thema = $request->input('thema');
      $post->text = $request->input('text');
      $post->user->name = $request->input('user.name');
      $post->user->save();
      $post->save();
      return "Post update! Id post: {$postId}, id user: {$post->user->id}";
    }

    public function get() {
        $posts = Post::with(['user', 'comments.user'])->get();
       return $posts;
    }

}
