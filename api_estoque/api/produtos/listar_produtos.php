<?php
header('Content-Type: application/json');
require_once '../../bd/conexao.php'; // Conecta ao banco

// Executa a consulta SQL para buscar todos os produtos
$sql = "SELECT * FROM produtos";
$result = $conn->query($sql);

// Cria um array para armazenar os produtos encontrados
$produtos = [];

if ($result->num_rows > 0) {
    // Adiciona cada linha do resultado ao array
    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
}

// Retorna os produtos em formato JSON
echo json_encode($produtos);
$conn->close();
?>
