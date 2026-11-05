import bd_produto from '../models/bd_produto.js'

export async function listarproduto() {
    return await bd_produto.findAll({ order: [['id', 'ASC']] })
}

export async function buscarcPornome(nome) {
    return await bd_produto.findOne({
        where: { produto: nome }
    })
}

export async function cadastrarproduto(dados) {
    // Aceita tanto 'produto' quanto 'nome' vindo do corpo da requisição
    const nomeProduto = dados.produto || dados.nome
    const { tipo, cor, quantidade, preco } = dados

    return await bd_produto.create({
        produto: nomeProduto,
        tipo,
        cor,
        quantidade,
        preco
    })
}

export async function removerproduto(nmproduto) {
    const produtoec = await buscarcPornome(nmproduto)
    if (produtoec) {
        await produtoec.destroy()
        return produtoec
    }
    return null
}

export async function atualizarproduto(nmproduto, dados) {
    const nomeProduto = dados.produto || dados.nome || nmproduto
    const { tipo, cor, quantidade, preco } = dados

    const produtoec = await buscarcPornome(nmproduto)
    if (produtoec) {
        await produtoec.update({
            produto: nomeProduto,
            tipo,
            cor,
            quantidade,
            preco
        })
        return produtoec
    }
    return null
}

export async function venderproduto(nmproduto, qtdvendida) {
    const produtovar = await buscarcPornome(nmproduto)
    if (!produtovar) return null

    const novaqtd = Number(produtovar.quantidade) - Number(qtdvendida)
    await produtovar.update({ quantidade: novaqtd })
    return produtovar
}

export async function comprarproduto(nmproduto, qtdcomprada) {
    const produtovar = await buscarcPornome(nmproduto)
    if (!produtovar) return null

    const novaqtd = Number(produtovar.quantidade) + Number(qtdcomprada)
    await produtovar.update({ quantidade: novaqtd })
    return produtovar
}
