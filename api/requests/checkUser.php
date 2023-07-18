<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../services/dbConnection.php';
include_once '../queries/checkUser.php';
include_once '../models/checkUserDto.php';
include_once '../configuration.php';
error_reporting((new Configuration()) -> error_level);

// instantiate database and product object
$database = new DbConnection();
$db = $database->getConnection();

// initialize object
$logIn = new checkUser($db);


// get url params
$data = new checkUserDto();
$data->userName = $_GET['userName'];
$data->name = $_GET['name'];
$data->userId = $_GET['userId'];

// make sure data is not empty
if(
    !empty($data->userName) &&
    !empty($data->name)
){
    $stmt = $logIn->checkName($data->name, $data->userId );
    $num = $stmt->rowCount();
    if($num > 0) {

        // set response code - 200 OK
        http_response_code(200);

        // show Users data in json format
        echo json_encode(array(
            "pass" => false,
            "fail" => "name"
        ));
        die();
    }
    $stmt = $logIn->checkUsername($data->userName, $data->userId );
    $num = $stmt->rowCount();
    if($num > 0) {

        // set response code - 200 OK
        http_response_code(200);

        // show Users data in json format
        echo json_encode(array(
            "pass" => false,
            "fail" => "username"
        ));
    }
    else {

        // set response code - 200 OK
        http_response_code(200);

        // show Users data in json format
        echo json_encode(array(
            "pass" => true,
        ));
    }
}
// tell the user data is incomplete
else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to get users, pagination/sorting info not provided"));
}
