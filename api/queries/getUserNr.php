<?php


class getUserNr
{
    // database connection and table name
    private $conn;
    private $table_name = "users";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getSize() {
        $query =
            "SELECT count(*)
            FROM ". $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

}