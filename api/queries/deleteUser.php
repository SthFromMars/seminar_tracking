<?php
class deleteUser{

    // database connection and table name
    private $conn;
    private $id;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    // delete the seminar
    function delete($id){
    
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = UUID_TO_BIN(?)";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(1, $id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
}
