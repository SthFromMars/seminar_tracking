<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../services/dbConnection.php';
include_once '../queries/selectSeminars.php';
include_once '../models/getSeminarsOptionsDto.php';
include_once '../configuration.php';
include_once '../queries/getSeminarNr.php';
error_reporting((new Configuration()) -> error_level);

// instantiate database and product object
$database = new DbConnection();
$db = $database->getConnection();

// initialize object
$selectSeminars = new selectSeminars($db);
$getSeminarNr = new getSeminarNr($db);

 
// get url params
$data = new getSeminarsOptionsDto();
$data->startIndex = $_GET['startIndex'];
$data->entryNr = $_GET['entryNr'];
$data->orderBy = $_GET['orderBy'];
$data->orderDir = $_GET['orderDir'];
$data->startDateBegin = $_GET['startDateBegin'];
$data->startDateEnd = $_GET['startDateEnd'];
$data->endDateBegin = $_GET['endDateBegin'];
$data->endDateEnd = $_GET['endDateEnd'];
$data->locations = $_GET['locations'];
$data->userIds = $_GET['userIds'];

// make sure data is not empty
if(
    isset($data->startIndex) &&
    isset($data->entryNr) &&
    !empty($data->orderBy) &&
    !empty($data->orderDir)
    // && false
){
    $stmt = $selectSeminars->read($data);
    $num = $stmt->rowCount();

    // seminars array
    $seminars_arr=array();
    $seminars_arr["seminars"]=array();

    // retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // make $row['name'] to  $name only
        extract($row);
        $seminarItem=array(
            "id" => $id,
            "seminarName" => $seminar_name,
            "certNr" => $cert_nr,
            "length" => $length,
            "startDate" => $start_date,
            "endDate" => $end_date,
            "location" => $location,
            "userName" => $user_name,
            "userId" => $user_id
        );
        array_push($seminars_arr["seminars"], $seminarItem);
    }

    $stmt = $getSeminarNr->getSize($data);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $seminars_arr["size"] = $row["size"];
    $seminars_arr["totalLength"] = $row["totalLength"];
    // set response code - 200 OK
    http_response_code(200);
    // show products data in json format
    echo json_encode($seminars_arr);
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to get seminars, pagination/sorting info not provided"));
}
