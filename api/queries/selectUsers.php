<?php
class selectUsers{

    // database connection and table name
    private $conn;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    // read seminars
    function read($data){
        $query = 
            "SELECT 
                BIN_TO_UUID(id) as id, name, username, privilege
            FROM ".$this->table_name;
        // mandatory pagination
        $query .= " ORDER BY " . $this->getOrdering($data->orderBy) . (strtoupper($data->orderDir) == "DESC" ? " DESC" : " ASC");
        $query .= ", id ASC LIMIT :startIndex, :entryNr;";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
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
                return "name";
            case "username":
                return "username";
            default:
                return "id";
        }
    }
}
