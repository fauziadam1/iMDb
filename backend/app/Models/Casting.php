<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Casting extends Model
{
    protected $fillable = [
        'name',
        'films'
    ];

    public function films()
    {
        return $this->belongsToMany(Film::class);
    }
}
