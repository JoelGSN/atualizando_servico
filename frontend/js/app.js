const nomec = document.getElementById("nomec")
const cpf = document.getElementById("cpf")
const rua = document.getElementById("rua")
const numero = document.getElementById("numero")
const uf = document.getElementById("uf")
const clientes = JSON.parse(localStorage.getItem("clientes")) || []
const dadoscl = document.getElementById("lista-cliente")
//\\
//\\
const nomep = document.getElementById("nomep")
const tipo = document.getElementById("tipo")
const cor = document.getElementById("cor")
const preco = document.getElementById("preco")
const quantidade = document.getElementById("quantidade")
const produtos = JSON.parse(localStorage.getItem("produtos")) || []
const dadospd = document.getElementById("lista-produto")
//\\
//\\
const nmcv = document.getElementById("nomecv")
const qtdcv = document.getElementById("quantidadecv")
//\\
//\\
const campo = document.getElementById('filtro');
const dadosrl = document.getElementById("listar")
const dadosts = document.getElementById("teste")
//\\
//\\
const vendas = JSON.parse(localStorage.getItem("vendas")) || []
const nomev = document.getElementById("nomecv")
const quantidadev = document.getElementById("quantidadecv")

buscar_cliente()
buscar_produto()

//ABA DE RELATÓRIOS INICIO
//PARTE DOS BOTÕES INICIO
function cadcl() {
    campo.value = "cadcl";
    relatorio();
}
function cadp() {
    campo.value = "cadp";
    relatorio();
}
function comp() {
    campo.value = "compra";
    relatorio();
}
function vend() {
    campo.value = "venda";
    relatorio();
}
//PARTE DOS BOTÕES FIM
//PARTE DO INNER INICIO
function relatorio() {
    if (campo.value === "cadcl") {
        let i = 1
        function listarcli() {
            dadosrl.innerHTML = 'Relatório de Cadastro de Clientes'
            for (let cliente of clientes) {
                dadosrl.innerHTML += `<p><br>${i++}º => Nome do Cliente: ${cliente.nome}   ||   CPF: ${cliente.cpfoucnpj}</p>`
            }
        }
        listarcli()
    } else {
        if (campo.value === "cadp") {
            let i = 1
            function listarpdi() {
                dadosrl.innerHTML = 'Relatório de Cadastro de Produtos'
                for (let produto of produtos) {
                    dadosrl.innerHTML += `<p><br>${i++}º => Nome do Produto: ${produto.produto}   ||   Quantidade: ${produto.quantidade}  || Valor Produto: ${produto.preco} || Total em Estoque: R$${(produto.quantidade * produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`
                }
            }
            listarpdi()
        } else {
            if (campo.value === "venda") {
                let i = 1
                function listarvd() {
                    dadosrl.innerHTML = 'Relatório de Vendas'
                    for (let venda of vendas) {
                        dadosrl.innerHTML += `<p><br>${i++}º => Nome do Produto: ${venda.nome}   ||   Quantidade: ${venda.quantidade}</p>`
                    }
                }
                listarvd()
            } else {
                dadosrl.innerHTML = '<p>Selecione uma opção nos botões acima</p>';
            }
        }
    }
}
//PARTE DO INNER FIM
//ABA DE RELATÓRIOS FIM
//ABA DE CLIENTES INICIO
async function cli() {
    if (nomec.value.trim() && cpf.value.trim() && rua.value.trim() && numero.value.trim() && uf.value.trim) {

        if (/^[A-Za-zÁ-ý\s]+$/.test(nomec.value)) {
            if (/^\d{11}$/.test(cpf.value) || /^\d{14}$/.test(cpf.value) || /^\d{18}$/.test(cpf.value)) {
                let existe = false
                for (let cliente of clientes) {
                    if (cliente.cpfoucnpj == cpf.value)
                        existe = true
                }
                if (!existe) {
                    const cliente = {
                        nome: nomec.value,
                        cpfoucnpj: cpf.value,
                        rua: rua.value,
                        numero: numero.value,
                        uf: uf.value
                    }

                    // let existe2 = false

                    // const c = await clientes.find(item => item.cpfoucnpj === cpf.value)
                    // if(c){
                    //     existe2 = true
                    // }
                    // if(!existe2){

                    await fetch('http://localhost:3000/cliente', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cliente)
                    })

                    clientes.push(cliente)
                    localStorage.setItem("clientes", JSON.stringify(clientes))
                    alert("Cadastro Efetuado com Sucesso!!")

                    // }else{
                    //     alert("Cliente já foi cadastrado!")

                    // }

                } else {
                    alert("Cliente já foi cadastrado!")
                }
            } else {
                alert("deve conter apenas 11 digitos caso for CPF ou 14 digitos caso for CNPJ")
            }
        } else {
            alert("Nome so Aceita Letras , acentos e Espaço!")
        }
    } else {
        alert("Preencha todos os campos!")
    }
    listarcli()
}
// function listarcl() {
//     dadoscl.innerHTML = '<== Cadastrados ==>'
//     for (let cliente of clientes) {
//         dadoscl.innerHTML += `<p>Nome: ${cliente.nome} || CPF: ${cliente.cpf}</p>`
//     }
// }
//ABA DE CLIENTES FIM
//ABA DE PRODUTOS INICIO
async function pro() {
    // console.log("testando")
    if (nomep.value.trim() &&
        tipo.value.trim() &&
        cor.value.trim() &&
        preco.value.trim() &&
        quantidade.value.trim()) {
        if (preco.value > 0) {
            if (quantidade.value >= 0) {
                let existe = false
                for (let p of produtos) {
                    if (p.produto == nomep.value)
                        existe = true
                }
                if (!existe) {
                    const produto = {
                        produto: nomep.value,
                        tipo: tipo.value,
                        cor: cor.value,
                        preco: preco.value,
                        quantidade: quantidade.value
                    }
                    produtos.push(produto)

                    await fetch('http://localhost:3000/produto', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(produto)
                    })

                    localStorage.setItem("produtos", JSON.stringify(produtos))
                    alert("Produto Cadastrado com sucesso!")
                } else alert("Produto ja Cadastrado!")
            } else alert("Quantidade não pode ser negativa")
        } else alert("Valor não pode ser 0 ou negativo")
    } else alert("Preencha todos os campos do produto")
    // listar()
}

//Movimentação Clientes inicio
function buscliente() {
    let existe = false
    let cliente = null
    for (let c of clientes) {
        if (c.cpfoucnpj == cpf.value) {
            cliente = c
            existe = true
            break;
        }
    }
    if (existe) {
        alert("Cliente " + cliente.nome + " Localizado")
        nomec.value = cliente.nome
        cpf.value = cliente.cpf
        rua.value = cliente.rua
        numero.value = cliente.numero
        uf.value = cliente.uf
    } else alert("Cliente Não encontrado")
}
function alterarcl() {
    let existe = false;
    for (let cliente of clientes) {
        if (cliente.cpfoucnpj === cpf.value) {
            existe = true
            cliente.nome = nomec.value
            cliente.rua = rua.value
            cliente.numero = numero.value
            cliente.uf = uf.value
            break;
        }
    }
    localStorage.setItem("clientes", JSON.stringify(clientes))
    alert("Alteração do Cliente " + nomec.value + " Efetuada Com Sucesso!!!")

}
function clidelete() {
    let ind = clientes.findIndex(cliente => cliente.cpfoucnpj === cpf.value);
    if (ind !== -1) {
        clientes.splice(ind, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        alert("Cliente excluído com sucesso!");
    } else {
        alert("Cliente não encontrado!");
    }
    listar();
}
//Movimentação Clientes fim
//Movimentação Produtos inicio
function comprapd() {
    let existe = false
    let vlrsoma = Number(qtdcv.value)
    let qtd_novo = 0
    if (vlrsoma > 0) {
        for (let produto of produtos) {
            if (produto.nome === nmcv.value) {
                existe = true
                produto.quantidade = Number(produto.quantidade) + vlrsoma
                qtd_novo = produto.quantidade
                break
            }
        }
        if (existe) {
            localStorage.setItem("produtos", JSON.stringify(produtos))
            // alert("Alterado de "+qtd_antiga+" para "+ idpd.value+" ou "+produto.quantidade);
            alert("Compra Executada!! Novo Estoque: " + qtd_novo)
        } else {
            alert("Produto não encontrado!")
        }
    } else {
        alert("Impossível Comprar Valor negativo!!")
    }
}
function venderpd() {




    let existe = false;
    let vlrsoma = Number(qtdcv.value)
    let qtd_novo = 0;
    if (vlrsoma > 0) {
        for (let produto of produtos) {
            if (produto.nome === nmcv.value) {
                existe = true;
                if (produto.quantidade > vlrsoma) {

                    produto.quantidade = produto.quantidade - vlrsoma
                    qtd_novo = produto.quantidade;
                    break;

                } else {
                    alert("Quantidade Indisponível para venda")
                    return;
                }

                //
            }
        }
        if (existe) {
            const venda = {
                nome: nomev.value,
                quantidade: quantidadev.value
            }
            vendas.push(venda)
            localStorage.setItem("vendas", JSON.stringify(vendas))
            localStorage.setItem("produtos", JSON.stringify(produtos));
            // alert("Alterado de "+qtd_antiga+" para "+ idpd.value+" ou "+produto.quantidade);
            alert("Venda Executada!! Novo Estoque: " + qtd_novo);
        } else {
            alert("Produto não encontrado!");
        }

    } else {
        alert("Impossível Vender Valor negativo!")
    }





}
//Movimentação Produtos FIM
//FUNÇÕES GERAIS FIM




async function buscar_cliente() {
    const busca = await fetch('http://localhost:3000/cliente')
    const dados = await busca.json()
    clientes.length = 0
    clientes.push(...dados)
}


async function buscar_produto() {
    const busca = await fetch('http://localhost:3000/produto')
    const dados = await busca.json()
    produtos.lenght = 0
    produtos.push(...dados)
}

async function encontrar_cliente() {
    // buscar_cliente()
    const c = await clientes.find(item => item.cpfoucnpj === cpf.value)
    console.log(c)
    if (c) {
        nomec.value = c.nome
        cpf.value = c.cpfoucnpj
        rua.value = c.rua
        numero.value = c.numero
        uf.value = c.uf
    }
}
async function editar_cliente() {
    const c = await clientes.find(item => item.cpfoucnpj === cpf.value)
    if (c) {
        let cliente_atualizado = {
            nome: nomec.value ?? c.nome,
            cpfoucnpj: cpf.value ?? c.cpfoucnpj,
            numero: numero.value ?? c.numero,
            rua: rua.value ?? c.rua,
            uf: uf.value ?? c.uf
        }
        let resposta = await fetch(`http://localhost:3000/cliente/${c.cpfoucnpj}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente_atualizado)
        })
    }

}
async function deletar_cliente() {

    const c = await clientes.find(item => item.cpfoucnpj === cpf.value)
    // const n = await clientes.find(item => item.cpfoucnpj === cpf.value)

    // let x = item.nome
    // console.log(item.nome)
    if (c) {

        let resposta = await fetch(`http://localhost:3000/cliente/${c.cpfoucnpj}`, {
            method: "DELETE"

        })
        // alert("deletei "+x)
    }

}

