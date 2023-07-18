<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../services/dbConnection.php';
include_once '../queries/selectUsers.php';
include_once '../models/getSeminarsOptionsDto.php';
include_once '../configuration.php';
include_once '../queries/getUserNr.php';
error_reporting((new Configuration()) -> error_level);

// instantiate database and product object
$database = new DbConnection();
$db = $database->getConnection();

// initialize object
$selectUsers = new selectUsers($db);
$getUserNr = new getUserNr($db);

 
// get url params
$data = new getSeminarsOptionsDto();
$data->startIndex = $_GET['startIndex'];
$data->entryNr = $_GET['entryNr'];
$data->orderBy = $_GET['orderBy'];
$data->orderDir = $_GET['orderDir'];

// make sure data is not empty
if(
    isset($data->startIndex) &&
    isset($data->entryNr) &&
    !empty($data->orderBy) &&
    !empty($data->orderDir)
){
    $stmt = $selectUsers->read($data);
    $num = $stmt->rowCount();

    // Users array
    $users_arr=array();
    $users_arr["users"]=array();;

    // retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // make $row['name'] to  $name only
        extract($row);
        $userItem=array(
            "id" => $id,
            "name" => $name,
            "username" => $username,
            "privilege" => $privilege,
        );
        array_push($users_arr["users"], $userItem);
    }

    $stmt = $getUserNr->getSize();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $users_arr["size"] = $row["count(*)"];

    // set response code - 200 OK
    http_response_code(200);

    // show Users data in json format
    echo json_encode($users_arr);
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to get users, pagination/sorting info not provided"));
}
