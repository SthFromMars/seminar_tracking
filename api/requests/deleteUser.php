<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once '../services/dbConnection.php';
include_once '../queries/deleteUser.php';
include_once '../configuration.php';
error_reporting((new Configuration()) -> error_level);
 
// get database connection
$database = new DbConnection();
$db = $database->getConnection();
 
$deleteUser = new deleteUser($db);
$userId = $_GET['userId'];

if(empty($userId)) {
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "No userId provided"));
    die();
}
 
// delete the seminar
if($deleteUser->delete($userId)){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Seminar was deleted."));
}
 
// if unable to delete the seminar
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete Seminar."));
}