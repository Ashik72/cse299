<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{

    public $table = "doctor_info";
    public $timestamps = false;
    protected $primaryKey = 'user_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'first_name', 'last_name', 'degree','phone_num', 'hospital', 'department', 'registration_date', 'status', 'user_id', 'registration_number', 'speciality', 'license_no'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array();

//    protected $attributes = [
//        'phone_num' => 'dsfsd',
//    ];

}

