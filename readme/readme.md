cliente
nome
cpf / cnpj
rua
número
cidade
uf

cadastro produto
produto
tipo
cor
quantidade
preco


controle de cliente da loja cadastrar excluir editar



controle estoque da loja cadastrar produto, vender produto e comprar produto
listar informações
loja de moveis



#validar números negativos de venda
#validar quantidade em estoque para vender


<!-- 

^\s*$\r?\n regex de substituir linhas em branco ctrl + h, habilite o regex e subsitua isso tudo por vazio

# GIT remote -v 'VÊ ONDE ESTÁ VINCULADA'
# git remote remove origin
# git remote set-url origin <URL_DO_NOVO_REPOSITORIO>
# git remote add origin https://github.com/JoelGSN/MeusRepositorios.git
# git pull 'ATUALIZA O REPOSITÓRIO'
# git init
# git add .
# git commit -m "dsadsadsa"
# git push origin main



# Power shell Habilitar rodar scripts >>>>>
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser


#git remote add origin https://github.com/Tecnico-0128/PROJETO-INTEGRADOR.git

# # 1. Junta todos os ficheiros e pastas do teu PC para o envio
# git add .

# # 2. Cria o ponto de salvamento com uma mensagem
# git commit -m "Enviar todos os meus ficheiros de JavaScript"

# # 3. Garante que estás na branch principal (main)
# git branch -M main

# # 4. Envia tudo de uma vez para o GitHub
# git push -u origin main


git init
git remote remove origin
git add .
git commit -m "digite aqui seu commit"
git branch -M main
git remote add origin "link do repositório sem as aspas"
git pull origin main --rebase
git push origin main
 -->



git remote add origin https://github.com/JoelGSN/com_backend.git
git remote add origin https://github.com/JoelGSN/newlojamoveis.git
git remote add origin https://github.com/JoelGSN/atualizando_servico.git
git pull origin main --rebase
git push origin main   




rotas api

# --- CLIENTES ---
GET http://localhost:3000/cliente
GET http://localhost:3000/cliente/:cpfoucnpj
POST http://localhost:3000/cliente
PUT http://localhost:3000/cliente/:cpfoucnpj
DELETE http://localhost:3000/cliente/:cpfoucnpj

# --- PRODUTOS ---
GET http://localhost:3000/produto
GET http://localhost:3000/produto/:produto
POST http://localhost:3000/produto
PUT http://localhost:3000/produto/:produto
POST http://localhost:3000/produto/produto/comprar
POST http://localhost:3000/produto/produto/vender
DELETE http://localhost:3000/produto/produto/vender

# --- EXEMPLOS COM DADOS PREENCHIDOS ---
GET http://localhost:3000/cliente/12345678901
GET http://localhost:3000/produto/Cadeira
POST http://localhost:3000/produto/Cadeira/comprar
POST http://localhost:3000/produto/Cadeira/vender

# clientes modelo do JSON

  {
    "nome": "João da Silva",
    "cpfoucnpj": "12345678900",
    "rua": "Rua das Flores",
    "numero": 123,
    "uf": "MG"
  }


  # produtos modelo do JSON

    {
    "produto": "Camiseta Básica",
    "tipo": "Vestuário",
    "cor": "Preto",
    "quantidade": 50,
    "preco": 49.9
  }



  O seu cadastro de produtos não alimentava o banco e não recebia ID por conta de 4 divergências entre o frontend e o backend:

1. Por que NÃO estava alimentando o banco de dados?
Incompatibilidade de nomes (nome vs produto):
No banco de dados SQLite e no Model (bd_produto.js), a coluna foi criada como produto e com a regra obrigatória allowNull: false.
No frontend (app.js), o formulário enviava o campo como nome:
javascript
const produto = { nome: nomep.value, ... }
No serviço do backend (produtoService.js), ele tentava executar:
javascript
bd_produto.create({ nome, tipo, cor, quantidade, preco })
Como o Model não possui nome e o campo produto não podia ser nulo, o Sequelize lançava o erro notNull Violation: produto.produto cannot be null e a requisição quebrava com Erro 500 (Internal Server Error) sem gravar nada na tabela.


2. Por que NÃO puxava o ID como o cadastro de clientes faz?
A busca inicial de produtos estava comentada:
Na linha 33 do app.js, você chamava buscar_cliente(), mas // buscar_produto() estava comentada.
Erro de digitação em buscar_produto:
Na linha 336 do app.js, estava escrito produtos.lenght = 0 (com ht em vez de length).
Quem gera o ID é o banco SQLite (AUTOINCREMENT):
No seu código anterior, a função pro() dava produtos.push(produto) com o objeto digitado no formulário (que ainda não tinha id).
Para ter o ID na hora, precisamos capturar o JSON devolvido pelo backend após o salvamento:
javascript
const resposta = await fetch('http://localhost:3000/produto', { ... })
const produtoSalvo = await resposta.json() // <-- Já vem com o ID gerado pelo banco!
produtos.push(produtoSalvo)


3. Outros erros corrigidos no Backend
Em produto_controllers.js:
A função buscarcPornome chamava produtoService.buscarcPorId (uma função que não existia no service, quebrando a rota GET /produto/:produto). Foi corrigido para chamar buscarcPornome.
Em produtoService.js:
Nas funções venderproduto e comprarproduto, estava nmproduto.quantidade (sendo que nmproduto era a string com o nome vindo da URL). Foi corrigido para produtovar.quantidade.
Agora o service aceita tanto produto quanto nome de forma flexível:
javascript
const nomeProduto = dados.produto || dados.nome
🚀 Como testar agora:
Abra um terminal na pasta do backend e inicie o servidor:
powershell
cd "g:\VSCode_Trabalhos\frontend\Aula_8_1semana\final_lojamoveis\atualizando_servico\backend"
node src/server.js
Abra a página produto.html, cadastre um produto e você verá o alerta confirmando o ID gerado automaticamente pelo banco SQLite.
Na aba relatorio.html, ao clicar em "Cadastro Produtos", o produto aparecerá com seu [ID: 1] e todos os dados sincronizados!