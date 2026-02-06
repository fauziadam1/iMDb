<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = [
        'title',
        'trailer',
        'image',
        'description',
        'genre',
        'age'
    ];

    public function genres(){
        return $this->belongsToMany(Genre::class);
    }
}
