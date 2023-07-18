<?php
class insertUser{

    // database connection and table name
    private $conn;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    // create seminar
    function create($user){
    
        // query to insert record
        $query = 
            "INSERT INTO " . $this->table_name . "
            VALUES 
            (UUID_TO_BIN(UUID()), :name, :username, :password, :privilege)";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $name=htmlspecialchars(strip_tags($user->name));
        $username=htmlspecialchars(strip_tags($user->username));
        $password=htmlspecialchars(strip_tags($user->password));
    
        // bind values
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $privilege = "USER";
        if($user->isAdmin) $privilege = "ADMIN";
        $stmt->bindParam(":privilege", $privilege);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
}
