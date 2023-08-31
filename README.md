## Desenvolvimento de um CRUD em Node.js + Sequelize + MySQL - Sistema de Biblioteca

Prezados,

Neste projeto, o objetivo é desenvolver um sistema semelhante ao de uma biblioteca, implementando as operações CRUD (Create, Read, Update, Delete) utilizando Node.js, Sequelize e MySQL.

### Tabelas

1. **Usuários:** Esta tabela armazenará informações sobre os usuários do sistema.
   - Campos: `id`, `nome`, `e-mail` (utilizado como nome de usuário) e `password`.
   - A senha será armazenada no banco de dados de forma criptografada, utilizando a biblioteca [bcrypt](https://www.npmjs.com/package/bcrypt).

2. **Livros:** Esta tabela conterá informações sobre os livros disponíveis na biblioteca.
   - Campos: `id`, `autores` (VARCHAR grande), `título`, `ano`, `editora`, `quem pegou emprestado` e `quantidade disponível para empréstimo`.
   - Existe um relacionamento entre as tabelas. Um usuário pode pegar emprestado um ou mais livros.

### Funcionalidades

O sistema contará com as seguintes funcionalidades:

1. Cadastro de Usuário: O sistema solicitará o cadastro do usuário para popular a tabela de Usuários. Na tela de login, haverá um link para acessar o formulário de cadastro.

2. Autenticação: O login será realizado através do e-mail existente do usuário e da senha. Após a verificação correta da senha (utilizando uma query de seleção), o usuário será direcionado para a tela de empréstimo de livros. Em caso de erro na senha, uma mensagem de erro será apresentada.

3. Empréstimo de Livros: A tela de empréstimo de livros exibirá todos os livros que o usuário pegou emprestado. Inicialmente, será exibido um aviso caso nenhum livro tenha sido pego emprestado pelo usuário.

4. Pesquisa de Livros: Na mesma tela, o usuário poderá realizar pesquisas, incluindo listagem de todos os livros, busca por parte do título e busca por ano (em ordem decrescente). Será possível selecionar um livro para empréstimo, porém, se a quantidade disponível for zero, essa opção não estará habilitada.

5. Funcionalidades CRUD: Será implementado um CRUD para o cadastro de usuários e um CRUD para o gerenciamento de livros. O ADMIN terá permissão para apagar livros e usuários.

6. Logout: Um link para realizar o logout estará disponível.

7. Exibição do Nome: O campo "NOME" será apresentado na tela com a mensagem "Usuário 'NOME' logado".

### Validação e Mensagens

Cada campo será validado utilizando recursos da biblioteca [express-validator](https://www.npmjs.com/package/express-validator). Mensagens de validação serão apresentadas utilizando `req.flash`.

### Trabalho em Duplas

O trabalho pode ser realizado em duplas, e terá um peso de 30% na avaliação.

Bom trabalho!

**Data da entrega: 25/09/2023**

Para mais informações sobre as bibliotecas mencionadas:
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-validator](https://www.npmjs.com/package/express-validator)
