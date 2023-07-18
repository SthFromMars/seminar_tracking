<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../services/dbConnection.php';
include_once '../queries/logIn.php';
include_once '../models/logInDto.php';
include_once '../configuration.php';
error_reporting((new Configuration()) -> error_level);

// instantiate database and product object
$database = new DbConnection();
$db = $database->getConnection();

// initialize object
$logIn = new logIn($db);


// get url params
$data = new logInDto();
$data->userName = $_GET['userName'];
$data->password = $_GET['password'];

// make sure data is not empty
if(
    !empty($data->userName) &&
    !empty($data->password)
){
    $stmt = $logIn->read($data);
    $num = $stmt->rowCount();

    // Users array
    $users_arr=array();
    $users_arr["users"]=array();

    if($num==1) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $userItem=array(
//            "test" => "testData",
            "id" => $id,
            "name" => $name,
            "username" => $userName,
            "privilege" => $privilege
        );

        // set response code - 200 OK
        http_response_code(200);

        // show Users data in json format
        echo json_encode($userItem);
    }
    else {

        // set response code - 400 bad request
        http_response_code(404);

        // tell the user
        echo json_encode(array("message" => "Wrong username or password"));

    }
}
// tell the user data is incomplete
else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to get users, pagination/sorting info not provided"));
}
