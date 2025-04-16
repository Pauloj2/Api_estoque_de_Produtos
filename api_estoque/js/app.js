// URLs da API - Ajuste estes caminhos conforme a estrutura de diretórios do seu projeto
const API_URL = {
    list: 'api/produtos/listar_produtos.php',
    create: 'api/produtos/criar_produto.php',
    search: 'api/produtos/buscar_produtos.php',
    update: 'api/produtos/atualizar_produto.php',
    get: 'api/produtos/buscar_ID.php',
    delete: 'api/produtos/excluir_produto.php'
};
// Variáveis globais
let productModal;
let deleteModal;
let productToDelete = null;


// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando aplicação...');
    
    // Inicializar modais do Bootstrap
    try {
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        
        // Configurar botão de confirmação de exclusão
        document.getElementById('confirmDeleteButton').addEventListener('click', confirmDelete);
        
        console.log('Modais inicializados com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar modais:', error);
    }
    
    // Carregar produtos
    loadProducts();
});

// Exibe ou oculta o indicador de carregamento
function toggleLoading(show) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

// Exibe uma mensagem de sucesso
function showSuccess(message) {
    const alert = document.getElementById('successAlert');
    alert.textContent = message;
    alert.classList.remove('hidden');
    setTimeout(() => alert.classList.add('hidden'), 3000);
}

// Exibe uma mensagem de erro
function showError(message) {
    const alert = document.getElementById('errorAlert');
    alert.textContent = message;
    alert.classList.remove('hidden');
    setTimeout(() => alert.classList.add('hidden'), 3000);
}

// Carrega a lista de produtos do servidor
async function loadProducts() {
    try {
        console.log('Carregando produtos...');
        toggleLoading(true);
        
        const response = await fetch(API_URL.list);
        console.log('Resposta da API:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const products = await response.json();
        console.log('Produtos carregados:', products);
        
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';
        
        if (products.length === 0) {
            console.log('Nenhum produto encontrado');
            productsList.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum produto cadastrado</td></tr>';
            return;
        }
        
        console.log(`Exibindo ${products.length} produtos`);
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nome}</td>
                <td>${getCategoryName(product.categoria_id)}</td>
                <td>${product.quantidade}</td>
                <td>R$ ${parseFloat(product.preco).toFixed(2)}</td>
                <td class="table-actions">
                    <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            productsList.appendChild(row);
        });
        
        console.log('Produtos exibidos com sucesso');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        showError('Erro ao carregar produtos: ' + error.message);
    } finally {
        toggleLoading(false);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Adicione isto junto com os outros códigos que já estão no DOMContentLoaded
    document.getElementById('searchButton').addEventListener('click', searchProducts);
    
    // Adicionar evento de pressionar Enter no campo de busca
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    document.getElementById('searchButton').addEventListener('click', searchProducts);
    document.getElementById('showAllButton').addEventListener('click', loadProducts);
    
    // Adicionar evento de pressionar Enter no campo de busca
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
});

// Função para buscar produtos
async function searchProducts() {
    try {
        const searchTerm = document.getElementById('searchInput').value.trim();
        
        if (!searchTerm) {
            // Se o campo estiver vazio, exibe todos os produtos
            loadProducts();
            return;
        }
        
        console.log(`Buscando produtos com o termo: "${searchTerm}"`);
        toggleLoading(true);
        
        const response = await fetch(`${API_URL.search}?termo=${encodeURIComponent(searchTerm)}`);
        console.log('Resposta da API:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const products = await response.json();
        console.log('Produtos encontrados:', products);
        
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';
        
        if (products.length === 0) {
            console.log('Nenhum produto encontrado com o termo de busca');
            productsList.innerHTML = `<tr><td colspan="6" class="text-center">Nenhum produto encontrado para "${searchTerm}"</td></tr>`;
            return;
        }
        
        console.log(`Exibindo ${products.length} produtos`);
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nome}</td>
                <td>${getCategoryName(product.categoria_id)}</td>
                <td>${product.quantidade}</td>
                <td>R$ ${parseFloat(product.preco).toFixed(2)}</td>
                <td class="table-actions">
                    <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            productsList.appendChild(row);
        });
        
        console.log('Resultados da busca exibidos com sucesso');
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        showError('Erro ao buscar produtos: ' + error.message);
    } finally {
        toggleLoading(false);
    }
}
// Retorna o nome da categoria com base no ID
function getCategoryName(categoryId) {
    const categories = {
        '1': 'Alimentos',
        '2': 'Bebidas',
        '3': 'Limpeza',
        '4': 'Eletrônicos',
        '5': 'Vestuário',
        '6': 'Papelaria',
        '7': 'Ferramentas',
        '8': 'Automotivo',
        '9': 'Brinquedos'
    };
    return categories[categoryId] || 'Não definida';
}


// Limpa o formulário
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModalLabel').textContent = 'Novo Produto';
}

// Prepara o modal para edição de um produto
async function editProduct(id) {
    try {
        console.log(`Editando produto ID: ${id}`);
        toggleLoading(true);
        
        // Busca os dados do produto
        const response = await fetch(`${API_URL.get}?id=${id}`);
        if (!response.ok) {
            throw new Error('Produto não encontrado');
        }
        
        const product = await response.json();
        console.log('Dados do produto carregados:', product);
        
        // Preenche o formulário com os dados
        document.getElementById('productId').value = product.id;
        document.getElementById('nome').value = product.nome;
        document.getElementById('categoria_id').value = product.categoria_id;
        document.getElementById('quantidade').value = product.quantidade;
        document.getElementById('preco').value = product.preco;
        
        // Atualiza o título do modal
        document.getElementById('productModalLabel').textContent = 'Editar Produto';
        
        // Abre o modal
        productModal.show();
    } catch (error) {
        console.error('Erro ao carregar dados do produto:', error);
        showError('Erro ao carregar dados do produto: ' + error.message);
    } finally {
        toggleLoading(false);
    }
}

// Salva um produto (cria novo ou atualiza existente)
async function saveProduct() {
    try {
        const id = document.getElementById('productId').value;
        const isNew = !id;
        
        console.log(isNew ? 'Criando novo produto' : `Atualizando produto ID: ${id}`);
        
        // Coleta os dados do formulário
        const productData = {
            nome: document.getElementById('nome').value,
            categoria_id: parseInt(document.getElementById('categoria_id').value),
            quantidade: parseInt(document.getElementById('quantidade').value),
            preco: parseFloat(document.getElementById('preco').value)
        };
        
        console.log('Dados do produto:', productData);
        
        // Validação básica
        if (!productData.nome || !productData.categoria_id || isNaN(productData.quantidade) || isNaN(productData.preco)) {
            showError('Por favor, preencha todos os campos corretamente.');
            return;
        }
        
        toggleLoading(true);
        
        // Configura a requisição para criar ou atualizar
        let url = isNew ? API_URL.create : `${API_URL.update}?id=${id}`;
        let method = 'POST'; // Usando POST para ambos conforme API PHP
        
        console.log(`Enviando requisição ${method} para ${url}`);
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        console.log('Resposta da API:', response.status, response.statusText);
        
        const result = await response.json();
        console.log('Resultado:', result);
        
        if (!response.ok) {
            throw new Error(result.erro || 'Erro ao salvar produto');
        }
        
        // Fecha o modal e atualiza a lista
        productModal.hide();
        showSuccess(result.mensagem || 'Produto salvo com sucesso');
        loadProducts();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        showError('Erro ao salvar produto: ' + error.message);
    } finally {
        toggleLoading(false);
    }
}

// Prepara para excluir um produto
function deleteProduct(id) {
    console.log(`Preparando para excluir produto ID: ${id}`);
    productToDelete = id;
    deleteModal.show();
}

// Confirma a exclusão do produto
async function confirmDelete() {
    if (!productToDelete) return;
    
    try {
        console.log(`Excluindo produto ID: ${productToDelete}`);
        toggleLoading(true);
        
        const response = await fetch(`${API_URL.delete}?id=${productToDelete}`, {
            method: 'DELETE'
        });
        
        console.log('Resposta da API:', response.status, response.statusText);
        
        const result = await response.json();
        console.log('Resultado:', result);
        
        if (!response.ok) {
            throw new Error(result.erro || 'Erro ao excluir produto');
        }
        
        // Fecha o modal e atualiza a lista
        deleteModal.hide();
        showSuccess(result.mensagem || 'Produto excluído com sucesso');
        loadProducts();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        showError('Erro ao excluir produto: ' + error.message);
    } finally {
        toggleLoading(false);
        productToDelete = null;
    }
}