<?php
class selectSeminars{

    // database connection and table name
    private $conn;
    private $table_name = "seminars";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    // read seminars
    function read($data){
        $query = 
            "SELECT 
                BIN_TO_UUID(seminars.id) as id,
                seminars.name as seminar_name, 
                cert_nr, length, start_date, end_date, location, 
                users.name as user_name,
                BIN_TO_UUID(users.id) as user_id
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
        // mandatory pagination
        $query .= " ORDER BY " . $this->getOrdering($data->orderBy) . (strtoupper($data->orderDir) == "DESC" ? " DESC" : " ASC") . ", id ASC ";
        $query .= " LIMIT :startIndex, :entryNr;";
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
        // bind pagination        
        $startIndex=htmlspecialchars(strip_tags($data->startIndex));   
        $entryNr=htmlspecialchars(strip_tags($data->entryNr));
        $stmt->bindParam(":startIndex", $startIndex, PDO::PARAM_INT);
        $stmt->bindParam(":entryNr", $entryNr, PDO::PARAM_INT);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function getOrdering($orderName){
        switch($orderName){
            case "name":
                return "seminar_name";
            case "cert":
                return "cert_nr";
            case "length":
                return "length";
            case "start":
                return "start_date";
            case "end":
                return "end_date";
            case "location":
                return "location";
            case "user":
                return "user_name";
            default:
                return "seminar_name";
        }
    }
}
