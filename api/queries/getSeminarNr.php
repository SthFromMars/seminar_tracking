<?php


class getSeminarNr
{
    // database connection and table name
    private $conn;
    private $table_name = "seminars";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getSize($data) {

        $query = 
            "SELECT 
                count(*) as size,
                sum(seminars.length) as totalLength
            FROM seminars, users
            WHERE user = users.id";
        // optional filters
        if(!empty($data->startDateBegin) && !empty($data->startDateEnd)){
            $query .= " AND start_date >= DATE(:startDateBegin)
                 AND start_date <= DATE(:startDateEnd)";
        }
        if(!empty($data->endDateBegin) && !empty($data->endDateEnd)){
            $query .= " AND end_date >= DATE(:endDateBegin) AND end_date <= DATE(:endDateEnd)";
        }
        if(!empty($data->locations)){
            $query .= " AND (";
            for($i = 0; $i<sizeof($data->locations); $i++) {
                if($i) $query .= " OR";
                $query .= " location = :location".$i;
            }
            $query .= " )";
        }
        if(!empty($data->userIds)){
            $query .= " AND (";
            for($i = 0; $i<sizeof($data->userIds); $i++) {
                if($i) $query .= " OR";
                $query .= " user = UUID_TO_BIN(:userId".$i.")";
            }
            $query .= " )";
        }
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        //bind filters
        if(!empty($data->startDateBegin) && !empty($data->startDateEnd)){            
            $startDateBegin=htmlspecialchars(strip_tags($data->startDateBegin));   
            $startDateEnd=htmlspecialchars(strip_tags($data->startDateEnd));
            $stmt->bindParam(":startDateBegin", $startDateBegin);
            $stmt->bindParam(":startDateEnd", $startDateEnd);
        }
        if(!empty($data->endDateBegin) && !empty($data->endDateEnd)){        
            $endDateBegin=htmlspecialchars(strip_tags($data->endDateBegin));   
            $endDateEnd=htmlspecialchars(strip_tags($data->endDateEnd));
            $stmt->bindParam(":endDateBegin", $endDateBegin);
            $stmt->bindParam(":endDateEnd", $endDateEnd);
        }
        if(!empty($data->locations)){    
            for($i = 0; $i<sizeof($data->locations); $i++) {
                $data->locations[$i]=htmlspecialchars(strip_tags($data->locations[$i]));
                $stmt->bindParam(":location".$i, $data->locations[$i]);
            }
        }
        if(!empty($data->userIds)){
            for($i = 0; $i<sizeof($data->userIds); $i++) {
                $data->userIds[$i]=htmlspecialchars(strip_tags($data->userIds[$i]));   
                $stmt->bindParam(":userId".$i, $data->userIds[$i]);
            }
        }   

        $stmt->execute();

        return $stmt;
    }

}