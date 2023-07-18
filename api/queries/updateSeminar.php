<?php
class updateSeminar{

    // database connection and table name
    private $conn;
    private $table_name = "seminars";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    // create seminar
    function update($seminar, $id){
    
        // query to insert record
        $query = 
            "UPDATE " . $this->table_name . "
            SET
                name = :seminarName, cert_nr = :certNr, length = :length, 
                start_date = DATE(:startDate), end_date = DATE(:endDate), 
                location = :location
            WHERE id=UUID_TO_BIN(:id)";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $id=htmlspecialchars(strip_tags($id));
        $seminarName=htmlspecialchars(strip_tags($seminar->seminarName));
        $certNr=htmlspecialchars(strip_tags($seminar->certNr));
        $length=htmlspecialchars(strip_tags($seminar->length));
        $startDate=htmlspecialchars(strip_tags($seminar->startDate));
        $endDate=htmlspecialchars(strip_tags($seminar->endDate));
        $location=htmlspecialchars(strip_tags($seminar->location));
    
        // bind values
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":seminarName", $seminarName);
        $stmt->bindParam(":certNr", $certNr);
        $stmt->bindParam(":length", $length);
        $stmt->bindParam(":startDate", $startDate);
        $stmt->bindParam(":endDate", $endDate);
        $stmt->bindParam(":location", $location);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
}
