<?php


class checkUser
{
    // database connection and table name
    private $conn;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function checkName($name, $userId) {
        $query =
            "SELECT BIN_TO_UUID(id) as id
            FROM ". $this->table_name." WHERE name = :name AND UUID_TO_BIN(:userId) <> id";

        $name=htmlspecialchars(strip_tags($name));

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $name);

        $userId=htmlspecialchars(strip_tags($userId));
        $stmt->bindParam(":userId", $userId);

        $stmt->execute();

        return $stmt;
    }

    function checkUsername($username, $userId) {
        $query =
            "SELECT BIN_TO_UUID(id) as id
            FROM ". $this->table_name." WHERE username = :username AND UUID_TO_BIN(:userId) <> id";
        $stmt = $this->conn->prepare($query);

        $username=htmlspecialchars(strip_tags($username));
        $stmt->bindParam(":username", $username);

        $userId=htmlspecialchars(strip_tags($userId));
        $stmt->bindParam(":userId", $userId);

        $stmt->execute();

        return $stmt;
    }
}