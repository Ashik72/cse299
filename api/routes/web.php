<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/hello', function () {
   return "hello";
});

$router->get('/hello/{name}', function ($name) {
    return "hello ".$name;
});


$router->get('/db', function () {
    //dd(app('db'));
    return DB::select("SELECT * FROM departments");
});

$router->get('/config', function () {
    $value = config('app.locale');
    global $app;
    return $value;
});


$router->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($router) {


    $router->get('valid_doc',  ['uses' => 'UserController@valid_doc']);


    $router->get('doctors',  ['uses' => 'DoctorController@showAllDoctors']);

    $router->post('add_doctor', ['uses' => 'DoctorController@create']);

    $router->get('doctors/{id}',  ['uses' => 'DoctorController@showOneDoctor']);


    $router->post('dump', function () {
        return serialize($_POST);
    });

    $router->post('add_prescription', ['uses' => 'PrescController@add_prescription']);
    $router->post('list_presc', ['uses' => 'PrescController@list_presc']);


});

$router->group(['prefix' => 'api'], function () use ($router) {

    $router->post('register_doctor_user', ['uses' => 'UserController@register_doctor_user']);


    $router->post('add_user', ['uses' => 'UserController@create']);

    $router->post('get_presc', ['uses' => 'PrescController@get_presc']);


});

$router->group(['prefix' => 'auth'], function () use ($router) {
    $router->post('login', ['uses' => 'AuthController@authenticate']);

});

