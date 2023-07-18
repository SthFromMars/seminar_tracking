<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../services/dbConnection.php';
include_once '../models/postSeminarDto.php';
include_once '../queries/insertSeminar.php';
include_once '../configuration.php';
error_reporting((new Configuration()) -> error_level);
 
$database = new DbConnection();
$db = $database->getConnection();
 
$seminar = new postSeminarDto();
$insertSeminar = new insertSeminar($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->seminarName) &&
    !empty($data->certNr) &&
    isset($data->length) &&
    !empty($data->startDate) &&
    !empty($data->endDate) &&
    !empty($data->location) &&
    !empty($data->userId)
){ 
    // set seminar property values
    $seminar->seminarName = $data->seminarName;
    $seminar->certNr = $data->certNr;
    $seminar->length = $data->length;
    $seminar->startDate = $data->startDate;
    $seminar->endDate = $data->endDate;
    $seminar->location = $data->location;
    $seminar->userId = $data->userId;
 
    // create the seminar
    if($insertSeminar -> create($seminar)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Seminar was created."));
    }
 
    // if unable to create the seminar, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create seminar."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create seminar. Data is incomplete."));
}