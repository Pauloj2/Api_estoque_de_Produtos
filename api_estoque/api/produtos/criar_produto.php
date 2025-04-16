<?php
header('Content-Type: application/json');
require_once '../../bd/conexao.php';

// Recebe os dados enviados no corpo da requisição (JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Valida se todos os campos foram enviados
if (!isset($data['nome'], $data['categoria_id'], $data['quantidade'], $data['preco'])) {
    http_response_code(400);
    echo json_encode(["erro" => "Dados incompletos"]);
    exit;
}

// Prepara os dados
$nome = $conn->real_escape_string($data['nome']);
$categoria_id = (int)$data['categoria_id'];
$quantidade = (int)$data['quantidade'];
$preco = (float)$data['preco'];

// Monta a query SQL para inserir no banco
$sql = "INSERT INTO produtos (nome, categoria_id, quantidade, preco)
        VALUES ('$nome', $categoria_id, $quantidade, $preco)";

// Executa a query
if ($conn->query($sql)) {
    http_response_code(201);
    echo json_encode(["mensagem" => "Produto criado com sucesso"]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao inserir produto"]);
}

$conn->close();
?>
