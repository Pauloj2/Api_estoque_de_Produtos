<?php
header('Content-Type: application/json');
require_once '../../bd/conexao.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($_GET['id']) || !isset($data['nome'], $data['categoria_id'], $data['quantidade'], $data['preco'])) {
    http_response_code(400);
    echo json_encode(["erro" => "Dados incompletos ou ID não informado"]);
    exit;
}

$id = (int)$_GET['id'];
$nome = $conn->real_escape_string($data['nome']);
$categoria_id = (int)$data['categoria_id'];
$quantidade = (int)$data['quantidade'];
$preco = (float)$data['preco'];

$sql = "UPDATE produtos SET nome='$nome', categoria_id=$categoria_id, quantidade=$quantidade, preco=$preco WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["mensagem" => "Produto atualizado com sucesso"]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao atualizar produto"]);
}

$conn->close();
?>
