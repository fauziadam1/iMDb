<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = [
        'name',
        'film_id'
    ];

    public function films()
    {
        return $this->belongsToMany(Film::class);
    }
}
