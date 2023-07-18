<?php
class updateUser{

    // database connection and table name
    private $conn;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // update seminar
    function update($user, $id){

        // query to insert record
        $query =
            "UPDATE " . $this->table_name . "
            SET 
            name = :name, username = :username";
        if(!empty($user->password)) {
            $query .= ", password = :password";
        }
        $query .= " WHERE id=UUID_TO_BIN(:id)";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // bind values
        $id=htmlspecialchars(strip_tags($id));
        $stmt->bindParam(":id", $id);
        $name=htmlspecialchars(strip_tags($user->name));
        $stmt->bindParam(":name", $name);
        $username=htmlspecialchars(strip_tags($user->username));
        $stmt->bindParam(":username", $username);
        if(!empty($user->password)) {
            $password=htmlspecialchars(strip_tags($user->password));
            $stmt->bindParam(":password", $password);
        }


        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
}
