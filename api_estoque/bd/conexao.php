<?php 
    $host = 'localhost:3307';
    $user = 'root';
    $pass = '';
    $db   = 'estoque';
    
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_error) {
        die("Conexao falhou: " . $conn->connect_error);
    }    

?>