<?php

class logIn
{
    // database connection and table name
    private $conn;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function read($data) {
        $query =
            "SELECT BIN_TO_UUID(id) as id, name, userName, privilege
            FROM ". $this->table_name." WHERE username = :username AND password = :password";

        $userName=htmlspecialchars(strip_tags($data->userName));
        $password=htmlspecialchars(strip_tags($data->password));

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $userName);
        $stmt->bindParam(":password", $password);

        $stmt->execute();

        return $stmt;
    }

}