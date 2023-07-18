<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../services/dbConnection.php';
include_once '../models/postUserDto.php';
include_once '../queries/insertUser.php';
include_once '../configuration.php';
error_reporting((new Configuration()) -> error_level);
 
$database = new DbConnection();
$db = $database->getConnection();
 
$user = new postUserDto();
$insertUser = new insertUser($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
// make sure data is not empty
if(
    !empty($data->name) &&
    !empty($data->username) &&
    !empty($data->password) &&
    isset($data->isAdmin)
){ 
    // set user property values
    $user->name = $data->name;
    $user->username = $data->username;
    $user->password = $data->password;
    $user->isAdmin = $data->isAdmin;
 
    // create the user
    if($insertUser -> create($user)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "User was created."));
    }
 
    // if unable to create the user, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create user."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}