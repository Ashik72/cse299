<?php

namespace App\Http\Controllers;

use App\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{

    public function showAllDoctors()
    {
        return response()->json(Doctor::all());
    }

    public function showOneDoctor($id)
    {
        return response()->json(Doctor::find($id));
    }

    public function create(Request $request)
    {
        $doctor = Doctor::create($request->all());

        return response()->json($doctor, 201);
    }

    public function update($id, Request $request)
    {
        $author = Doctor::findOrFail($id);
        $author->update($request->all());

        return response()->json($author, 200);
    }

    public function delete($id)
    {
        Doctor::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
