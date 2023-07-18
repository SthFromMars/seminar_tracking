<?php
class DbConnection{
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;


    // constructor witch sets up db connection settings
    public function __construct(){
        include_once '../configuration.php';
        $config = new Configuration();
        $this->host = $config->host;
        $this->db_name = $config->db_name;
        $this->username = $config->username;
        $this->password = $config->password;
    }

    // get the database connection
    public function getConnection(){

        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // set sql errors to throw exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
