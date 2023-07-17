<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'price', 'quantity'
    ];

    // Ajoutez ici d'autres relations ou méthodes spécifiques au modèle Product
}
