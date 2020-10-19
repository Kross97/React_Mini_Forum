<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
      'text',
    ];

    public function user() {
        return $this->hasOne('App\Models\Comment');
    }

    public function post() {
        return $this->belongsTo('App\Models\Post');
    }
}
