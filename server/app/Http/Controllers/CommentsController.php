<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Post;

class CommentsController extends Controller
{
   public function create(Request $request, $postId) {
       $post = Post::find($postId);

       $comment = new Comment(['text' => $request->input('text')]);
       $user = new User(['name' => $request->input('user.name')]);

       $post->comments()->save($comment);
       $post->refresh();
       $comment->refresh();
       $comment->user()->save($user);
   }

   public function update(Request $request, $commId) {
       $comment = Comment::find($commId);
       $comment->text = $request->input('text');
       $comment->user->name = $request->input('user.name');
       $comment->user->save();
       $comment->save();
       return "Comment update! Id comment: {$commId}, id user: {$comment->user->id}";
   }

   public function delete($commId) {
       Comment::destroy($commId);
       return "Comment delete! Id comment: {$commId}";
   }
}
