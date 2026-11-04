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