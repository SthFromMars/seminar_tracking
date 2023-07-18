<?php
class insertSeminar{

    // database connection and table name
    private $conn;
    private $table_name = "seminars";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    // create seminar
    function create($seminar){
    
        // query to insert record
        $query = 
            "INSERT INTO " . $this->table_name . "
            VALUES 
            (UUID_TO_BIN(UUID()), :seminarName, :certNr, :length, 
            DATE(:startDate), DATE(:endDate), :location, UUID_TO_BIN(:userId))";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $seminarName=htmlspecialchars(strip_tags($seminar->seminarName));
        $certNr=htmlspecialchars(strip_tags($seminar->certNr));
        $length=htmlspecialchars(strip_tags($seminar->length));
        $startDate=htmlspecialchars(strip_tags($seminar->startDate));
        $endDate=htmlspecialchars(strip_tags($seminar->endDate));
        $location=htmlspecialchars(strip_tags($seminar->location));
        $userId=htmlspecialchars(strip_tags($seminar->userId));
    
        // bind values
        $stmt->bindParam(":seminarName", $seminarName);
        $stmt->bindParam(":certNr", $certNr);
        $stmt->bindParam(":length", $length);
        $stmt->bindParam(":startDate", $startDate);
        $stmt->bindParam(":endDate", $endDate);
        $stmt->bindParam(":location", $location);
        $stmt->bindParam(":userId", $userId);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
}
