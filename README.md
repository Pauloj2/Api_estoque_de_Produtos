![Banner](https://github.com/user-attachments/assets/988e2511-4e0c-4d14-998d-6ec9ee189553)

# 📦 Sistema de Gestão de Estoque

Este projeto é um **Sistema Web de Controle de Estoque**, desenvolvido como parte de uma atividade acadêmica na disciplina de Redes de Computadores. Seu objetivo é permitir o gerenciamento eficiente de produtos por meio de uma interface amigável, utilizando uma API desenvolvida em PHP e banco de dados MySQL.

---

## 👨‍🎓 Equipe

Paulo Junior, Ranielly, Ana Luiza.

## 📌 Objetivos

- Cadastrar produtos no estoque.
- Listar todos os produtos cadastrados.
- Buscar produtos por nome.
- Atualizar dados dos produtos.
- Excluir produtos do sistema.

---

## 🎥 Demonstração do Sistema

[![Assista à demonstração do sistema](https://img.youtube.com/vi/UQtKrb4f6O0/maxresdefault.jpg)](https://www.youtube.com/watch?v=UQtKrb4f6O0)

> Clique na imagem acima para assistir ao vídeo de funcionamento do Sistema de Gestão de Estoque no YouTube.


---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Backend/API**: PHP 7+
- **Banco de Dados**: MySQL
- **Outras Bibliotecas**: FontAwesome (ícones)

---

## ⚙️ Arquitetura do Sistema

O sistema segue uma arquitetura em três camadas:

- 🎨 **Frontend**: interface do usuário com HTML/CSS/JS.
- 🧠 **Backend (API)**: scripts PHP com operações CRUD (Create, Read, Update, Delete).
- 💾 **Persistência**: banco de dados MySQL com tabela `produtos`.

---

## ✅ Funcionalidades Principais

| Função             | Descrição                                                                 |
|--------------------|---------------------------------------------------------------------------|
| 📥 Cadastrar        | Inserir novos produtos com nome, categoria, quantidade e preço            |
| 📋 Listar           | Exibir todos os produtos em uma tabela estilizada                        |
| 🔎 Buscar           | Localizar produtos pelo nome com barra de pesquisa                        |
| ✏️ Editar           | Alterar dados de produtos existentes via formulário modal                 |
| 🗑️ Excluir          | Remover produtos do estoque com confirmação                               |

---

## 📐 Modelo de Dados

**Tabela: `produtos`**

| Campo       | Tipo        |
|-------------|-------------|
| `id`        | INT (PK)    |
| `nome`      | VARCHAR     |
| `categoria` | VARCHAR     |
| `quantidade`| INT         |
| `preco`     | DECIMAL     |

---

## 🎯 Requisitos

### Funcionais

- RF01: Cadastro de produtos
- RF02: Listagem de produtos
- RF03: Busca por nome
- RF04: Edição de produtos
- RF05: Exclusão de produtos

### Não Funcionais

- RNF01: Interface responsiva
- RNF02: Uso de Bootstrap
- RNF03: Comunicação frontend-backend via `fetch`

---

## 🧑‍💻 Casos de Uso

- **UC01 - Cadastrar Produto**: formulário → botão "Salvar"
- **UC02 - Listar Produtos**: carregamento automático na tela principal
- **UC03 - Buscar Produto**: campo de pesquisa → botão "Buscar"
- **UC04 - Editar Produto**: botão de edição na tabela → formulário modal
- **UC05 - Excluir Produto**: botão de lixeira → confirmação → exclusão

---

## 🔁 Fluxo de Funcionamento
![Image 2025-04-14 at 17 59 16](https://github.com/user-attachments/assets/75b437ca-fe72-4fd2-9c7f-a9485c5f91b8)


---

## 🧾 Instruções de Instalação

1. Instale o **XAMPP** ou **WAMP**.
2. Copie todos os arquivos do projeto para a pasta `htdocs` (ou www).
3. Crie o banco de dados MySQL e a tabela `produtos` com base no script fornecido.
4. Edite o arquivo `conexao.php` com suas credenciais de acesso ao MySQL.
5. Acesse o sistema pelo navegador: http://localhost/nome-do-projeto/

