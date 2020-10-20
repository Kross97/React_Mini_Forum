<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

 protected $fillable = [
     'thema',
     'text',
 ];

    public $timestamps = false;


 public function user() {
    return $this->hasOne('App\Models\User');
 }

 public function comments() {
     return $this->hasMany('App\Models\Comment');
 }
}
