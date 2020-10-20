<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
      'name',
    ];

    public $timestamps = false;


    public function post() {
        return $this->belongsTo('App\Models\Post');
    }

    public function comment() {
        return $this->belongsTo('App\Models\Comment');
    }

    protected $attributes = [
        'post_id' => null,
        'comment_id' => null,
    ];
}
