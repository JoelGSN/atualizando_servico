import bd_produto from '../models/bd_produto.js'

export async function listarproduto() {
    return await bd_produto.findAll({ order: [['id', 'ASC']] })

}

export async function buscarcPornome(nome/*nmproduto*/) {
    return await bd_produto.findOne({
        where: { nome }
    })

}

export async function cadastrarproduto(dados) {
    const { nome, tipo, cor, quantidade, preco } = dados
    return await bd_produto.create({ nome, tipo, cor, quantidade, preco })

}

export async function removerproduto(nmproduto) {
    const produtoec = await buscarcPornome(nmproduto)
    if (produtoec) {
        produtoec.destroy()
        return produtoec
    }

    return null

}

export async function atualizarproduto(nmproduto, dados) {
    const { nome, tipo, cor, quantidade, preco } = dados

    const produtoec = await buscarcPornome(nmproduto)
    if (produtoec) {
        produtoec.update({ nome, tipo, cor, quantidade, preco })
        return produtoec
    }

}

export async function venderproduto(nmproduto, qtdvendida) {
    const produtovar = await buscarcPornome(nmproduto)
    const novaqtd = nmproduto.quantidade - qtdvendida
    await produtovar.update({ quantidade: novaqtd })
    return produtovar
}


export async function comprarproduto(nmproduto, qtdcomprada) {
    const produtovar = await buscarcPornome(nmproduto)
    const novaqtd = nmproduto.quantidade + qtdcomprada
    await produtovar.update({ quantidade: novaqtd })

    return produtovar
}