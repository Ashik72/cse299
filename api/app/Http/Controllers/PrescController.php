<?php

namespace App\Http\Controllers;

use App\Doctor;
use App\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserController;

class PrescController extends UserController
{

    public function find_and_add()
    {


    }


    public function add_prescription(Request $request)
    {

        $dob = $request->input('patient_dob');

        $dob = date("Y-m-d", strtotime($dob));

        $name = $request->input('patient_name');
        $name = explode(' ', $name, 2);
        $f_name = $name[0];
        $l_name = empty($name[1]) ? " " : $name[1];
        $patient_mobile_no = $request->input('patient_mobile_no');

        $getID = DB::select("SELECT patient_id FROM `patient_info` WHERE phone_no = :patient_mobile_no", ['patient_mobile_no' => $patient_mobile_no]);

        if (isset($getID[0])) {
            $getID = intval($getID[0]->patient_id);
            $patient_id = $getID;
        } else {

            DB::insert('INSERT INTO `patient_info` (`patient_id`, `first_name`, `last_name`, `date_of_birth`, `medicare_no`, `phone_no`, `status`, `user_id`) VALUES (NULL, ?, ?, ?, NULL, ?, \'pending\', NULL)', [$f_name, $l_name, $dob, $patient_mobile_no]);
            $patient_id = DB::getPdo()->lastInsertId();
        }

        $patient_id = intval($patient_id);

        ///doc

        $token = $request->request->get('token');

        $decoded = JWT::decode($token, env('JWT_SECRET'), array('HS256'));
        $doctor_id = intval($decoded->user_id);


        $doa = $request->input('presc_date');

        $doa = date("Y-m-d", strtotime($doa));

        DB::insert('INSERT INTO `prescription` (`id`, `patient_id`, `doctor_id`, `date`, `comments`, `place`) VALUES (NULL, ?, ?, ?, NULL, NULL)', [$patient_id, $doctor_id, $doa]);
        $presc_id = DB::getPdo()->lastInsertId();

        ///


        $case_name = $request->input('case_name');
        $case_comment = $request->input('case_comment');

        $case_data = [];

        if (is_array($case_name)) {
            foreach ($case_name as $key => $name) {

                $case_data[] = [
                    'name' => $case_name[$key],
                    'comment' => $case_comment[$key]
                ];


                DB::insert('INSERT INTO `prescribed_case_history` (`prescription_id`, `prescription_case_history`, `comments`) VALUES (?, ?, ?)', [$presc_id, $case_name[$key], $case_comment[$key]]);

            }

        }

        ///


        $test_name = $request->input('test_name');
        $test_comment = $request->input('test_comment');


        if (is_array($test_name)) {
            foreach ($test_name as $key => $name) {

                DB::insert('INSERT INTO `prescribed_tests` (`prescription_id`, `prescription_test_id`, `suggested_center`, `comments`) VALUES (?, ?, NULL, ?)', [$presc_id, $test_name[$key], $test_comment[$key]]);

            }

        }

        ///

        $drug_name = $request->input('drug_name');
        $drug_conce = $request->input('drug_conc');
        $drug_time = $request->input('drug_time');

        if (is_array($drug_name)) {
            foreach ($drug_name as $key => $name) {

                DB::insert('INSERT INTO `prescribed_drugs` (`prescription_id`, `prescription_drug_id`, `time`, `concentration`) VALUES (?, ?, ?, ?)', [$presc_id, $drug_name[$key], $drug_time[$key], $drug_conce[$key]]);

            }

        }

        DB::insert('INSERT INTO `prescribed_drugs` (`prescription_id`, `prescription_drug_id`, `time`, `concentration`) VALUES (?, ?, ?, ?)', [$presc_id, $drug_name[$key], $drug_time[$key], $drug_conce[$key]]);

        $comments = $request->input('comments');

        DB::update('UPDATE `prescription` SET `comments` = ? WHERE `prescription`.`id` = ?;', [$comments, $presc_id]);


        return response()->json($presc_id, 201);

        //return response()->json($user, 201);
    }

    public function list_presc(Request $request) {

        $token = $request->request->get('token');

        $decoded = JWT::decode($token, env('JWT_SECRET'), array('HS256'));
        $doctor_id = intval($decoded->user_id);

        //$get_list = DB::select("SELECT * FROM `prescription` WHERE doctor_id = :doctor_id", ['doctor_id' => $doctor_id]);

        $get_list = DB::select("SELECT * FROM `prescription`", ['doctor_id' => $doctor_id]);


        return response()->json($get_list, 201);

    }


    public function get_presc(Request $request) {

        date_default_timezone_set('Asia/Dhaka');

        $id = $request->request->get('presc_id');
        $get_presc = DB::select("SELECT * FROM `prescription` WHERE id = :id", ['id' => $id]);
        $print_presc = [];

        $patient_name = DB::select("SELECT CONCAT(first_name, ' ',last_name) AS name FROM `patient_info` WHERE patient_id = :id", ['id' => $get_presc[0]->patient_id]);
        $patient_dob = DB::select("SELECT date_of_birth FROM `patient_info` WHERE patient_id = :id", ['id' => $get_presc[0]->patient_id]);

       // $doctor_name = DB::select("SELECT CONCAT(first_name, ' ',last_name) AS name  FROM `doctor_info`, `user` WHERE doctor_info.user_id = user.user_id AND user.user_id = :id", ['id' => $get_presc[0]->doctor_id]);

        $doctor_name = DB::select("SELECT CONCAT(first_name, ' ',last_name) AS name  FROM `doctor_info` WHERE doctor_info.doctor_id = :id", ['id' => $get_presc[0]->doctor_id]);

        $medicines = DB::select("SELECT * FROM `prescribed_drugs` WHERE prescription_id = :id", ['id' => $get_presc[0]->id]);

        $medicines = DB::select("SELECT * FROM `prescribed_drugs` WHERE prescription_id = :id", ['id' => $get_presc[0]->id]);

        $prescribed_tests = DB::select("SELECT * FROM `prescribed_tests` WHERE prescription_id = :id", ['id' => $get_presc[0]->id]);

        $prescribed_case_history = DB::select("SELECT * FROM `prescribed_case_history` WHERE prescription_id = :id", ['id' => $get_presc[0]->id]);

        $doctor_degree = DB::select("SELECT degree  FROM `doctor_info` WHERE doctor_info.doctor_id = :id", ['id' => $get_presc[0]->doctor_id]);


        $print_presc['prescription_id'] = $id;

        $print_presc['patient_name'] = $patient_name[0]->name." (ID: {$get_presc[0]->patient_id})";
        $print_presc['doctor_name'] = $doctor_name[0]->name." (ID: {$get_presc[0]->doctor_id})";
        $print_presc['medicines'] = $medicines;
        $print_presc['date'] = $get_presc[0]->date;
        $print_presc['prescribed_tests'] = $prescribed_tests;
        $print_presc['prescribed_case_history'] = $prescribed_case_history;
        $print_presc['print_time'] = date("M,d,Y h:i:s A");
        $print_presc['patient_dob'] = $patient_dob[0]->date_of_birth;
        $print_presc['doctor_degree'] = (isset($doctor_degree[0]) ? $doctor_degree[0]->degree : "");

        $a = new \DateTime($get_presc[0]->date);
        $b = new \DateTime($patient_dob[0]->date_of_birth);

        $interval = $a->diff($b);


        $print_presc['patient_age'] = $interval->format("%Y years, %M months, %D days");

        return response()->json($print_presc, 201);

    }

}
