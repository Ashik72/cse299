<?php

namespace App\Http\Controllers;

use App\Doctor;
use App\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class UserController extends DoctorController
{


    public function create(Request $request)
    {

        try {
            $user = User::create($request->all());
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'error' => true,
                'data' => $e
            ], 201);
        }


        return response()->json($user, 201);
    }

    public function authenticate(Request $request) {

        $this->validate($request, [
            'user_name' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('user_name', $request->input('user_name'))->first();


    }

    public function valid_doc(Request $request) {



        $token = $request->request->get('token');

        $decoded = JWT::decode($token, env('JWT_SECRET'), array('HS256'));

        return response()->json($decoded, 201);


    }


    public function register_doctor_user(Request $request)
    {


        try {
            $user = User::create($request->all());
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'error' => true,
                'data' => $e
            ], 201);
        }

        //app('App\Http\Controllers\PrintReportController')->getPrintReport();

        $request->request->set('user_id', $user->id);

        $doctor = Doctor::create($request->all());

        return response()->json($doctor, 201);

        //return response()->json($user, 201);
    }


}
