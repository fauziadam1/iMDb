<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = [
        'title',
        'trailer',
        'image',
        'release_year',
        'duration',
        'description',
        'age_rating',
        'user_id',
        'genre',
        'casting'
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function castings()
    {
        return $this->belongsToMany(Casting::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
