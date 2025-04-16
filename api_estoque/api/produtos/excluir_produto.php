<?php
header('Content-Type: application/json');
require_once '../../bd/conexao.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["erro" => "ID não informado"]);
    exit;
}

$id = (int)$_GET['id'];
$sql = "DELETE FROM produtos WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(["mensagem" => "Produto removido com sucesso"]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao excluir produto"]);
}

$conn->close();
?>
