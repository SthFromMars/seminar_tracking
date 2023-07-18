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
include_once '../queries/updateSeminar.php';
include_once '../configuration.php';
error_reporting((new Configuration()) -> error_level);
 
$database = new DbConnection();
$db = $database->getConnection();
 
$seminar = new postSeminarDto();
$updateSeminar = new updateSeminar($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
$seminarId = $_GET['seminarId'];

// make sure data is not empty
if(
    !empty($seminarId) &&
    !empty($data->seminarName) &&
    !empty($data->certNr) &&
    isset($data->length) &&
    !empty($data->startDate) &&
    !empty($data->endDate) &&
    !empty($data->location)
){ 
    // set seminar property values
    $seminar->seminarName = $data->seminarName;
    $seminar->certNr = $data->certNr;
    $seminar->length = $data->length;
    $seminar->startDate = $data->startDate;
    $seminar->endDate = $data->endDate;
    $seminar->location = $data->location;
 
    // create the seminar
    if($updateSeminar -> update($seminar, $seminarId)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Seminar was updated."));
    }
 
    // if unable to create the seminar, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to update seminar."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update seminar. Data is incomplete."));
}