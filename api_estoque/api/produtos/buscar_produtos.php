
<?php
header('Content-Type: application/json');
require_once '../../bd/conexao.php'; // Conecta ao banco

// Verifica se foi enviado um termo de busca
if (!isset($_GET['termo'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["erro" => "Termo de busca não informado"]);
    exit;
}

$termo = $conn->real_escape_string($_GET['termo']);

// Consulta produtos que correspondem ao termo de busca
$sql = "SELECT * FROM produtos WHERE 
        nome LIKE '%$termo%' OR 
        id LIKE '%$termo%' OR
        categoria_id LIKE '%$termo%'";

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