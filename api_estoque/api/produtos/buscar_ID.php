<?php
header('Content-Type: application/json');
require_once '../../bd/conexao.php';

// Verifica se o ID foi enviado pela URL
if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["erro" => "ID não informado"]);
    exit;
}

$id = (int)$_GET['id'];

// Consulta o produto com o ID fornecido
$sql = "SELECT * FROM produtos WHERE id = $id";
$result = $conn->query($sql);

// Se encontrar um único resultado, retorna o produto
if ($result->num_rows === 1) {
    $produto = $result->fetch_assoc();
    echo json_encode($produto);
} else {
    http_response_code(404); // Not Found
    echo json_encode(["erro" => "Produto não encontrado"]);
}

$conn->close();
?>
