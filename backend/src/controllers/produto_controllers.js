import * as produtoService from '../services/produtoService.js'

export async function listar(req, res) {
    const produto = await produtoService.listarproduto()
    return res.status(200).json(produto)
}

export async function buscarcPornome(req, res) {
    const produto = await produtoService.buscarcPornome(req.params.produto)
    if (!produto) {
        return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
    }
    return res.status(200).json(produto)
}

export async function cadastrar(req, res) {
    try {
        const produto = await produtoService.cadastrarproduto(req.body)
        return res.status(201).json(produto)
    } catch (erro) {
        console.error("Erro ao cadastrar produto:", erro)
        return res.status(500).json({ Message: 'Erro interno ao cadastrar produto.', erro: erro.message })
    }
}

export async function remover(req, res) {
    const produto = await produtoService.removerproduto(req.params.produto)
    if (!produto) {
        return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
    }
    return res.status(200).json(produto)
}

export async function atualizar(req, res) {
    const produto = await produtoService.atualizarproduto(req.params.produto, req.body)
    if (!produto) {
        return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
    }
    return res.status(200).json(produto)
}

export async function vender(req, res) {
    const { produto } = req.params
    const { quantidade } = req.body
    const produtoAtualizado = await produtoService.venderproduto(produto, Number(quantidade))
    if (!produtoAtualizado) {
        return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
    }
    return res.json(produtoAtualizado)
}

export async function comprar(req, res) {
    const { produto } = req.params
    const { quantidade } = req.body
    const produtoAtualizado = await produtoService.comprarproduto(produto, Number(quantidade))
    if (!produtoAtualizado) {
        return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
    }
    return res.json(produtoAtualizado)
}
