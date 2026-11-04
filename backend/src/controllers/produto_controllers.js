import * as produtoService from '../services/produtoService.js'

export async function listar(req, res) {
    try {
        const produtos = await produtoService.listarproduto()
        return res.status(200).json(produtos)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao listar produtos.', erro: erro.message })
    }
}

export async function buscarPorNome(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id
        const produto = await produtoService.buscarPorNome(nomeProduto)
        if (!produto) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        return res.status(200).json(produto)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao buscar produto.', erro: erro.message })
    }
}

// Apelido para manter compatibilidade
export const buscarid = buscarPorNome

export async function cadastrar(req, res) {
    try {
        // Aceita tanto 'produto' quanto 'nome' ou 'nomep'
        const nomeProduto = req.body.produto || req.body.nome || req.body.nomep
        const { tipo, cor } = req.body
        const quantidade = req.body.quantidade !== undefined ? Number(req.body.quantidade) : undefined
        const preco = req.body.preco !== undefined ? Number(req.body.preco) : undefined

        if (!nomeProduto || quantidade === undefined || isNaN(quantidade) || preco === undefined || isNaN(preco)) {
            return res.status(400).json({ Message: 'Os campos produto (ou nome), quantidade e preco são obrigatórios.' })
        }

        const novoProduto = await produtoService.cadastrarproduto({
            produto: nomeProduto,
            tipo: tipo || '',
            cor: cor || '',
            quantidade,
            preco
        })
        return res.status(201).json(novoProduto)
    } catch (erro) {
        return res.status(400).json({ Message: 'Erro ao cadastrar produto.', erro: erro.message })
    }
}

export async function remover(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id
        const produtoRemovido = await produtoService.removerproduto(nomeProduto)
        if (!produtoRemovido) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        return res.status(200).json({ Message: 'Produto removido com sucesso.', produto: produtoRemovido })
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao remover produto.', erro: erro.message })
    }
}

export async function atualizar(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id
        const novoNome = req.body.produto || req.body.nome || nomeProduto
        const { tipo, cor } = req.body
        const quantidade = req.body.quantidade !== undefined ? Number(req.body.quantidade) : undefined
        const preco = req.body.preco !== undefined ? Number(req.body.preco) : undefined

        const produtoAtualizado = await produtoService.atualizarproduto(nomeProduto, {
            produto: novoNome,
            tipo,
            cor,
            quantidade,
            preco
        })
        if (!produtoAtualizado) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        return res.status(200).json(produtoAtualizado)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao atualizar produto.', erro: erro.message })
    }
}

export async function vender(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id || req.body.nome || req.body.produto || req.body.nomecv
        const quantidade = Number(req.body.quantidade !== undefined ? req.body.quantidade : req.body.quantidadecv)

        if (isNaN(quantidade) || quantidade <= 0) {
            return res.status(400).json({ Message: 'A quantidade deve ser um número maior que zero.' })
        }

        const resultado = await produtoService.venderproduto(nomeProduto, quantidade)
        if (!resultado) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        if (resultado.erro) {
            return res.status(400).json({ Message: resultado.erro })
        }
        return res.status(200).json(resultado)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao realizar venda.', erro: erro.message })
    }
}

export async function comprar(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id || req.body.nome || req.body.produto || req.body.nomecv
        const quantidade = Number(req.body.quantidade !== undefined ? req.body.quantidade : req.body.quantidadecv)

        if (isNaN(quantidade) || quantidade <= 0) {
            return res.status(400).json({ Message: 'A quantidade deve ser um número maior que zero.' })
        }

        const resultado = await produtoService.comprarproduto(nomeProduto, quantidade)
        if (!resultado) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        if (resultado.erro) {
            return res.status(400).json({ Message: resultado.erro })
        }
        return res.status(200).json(resultado)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao realizar compra.', erro: erro.message })
    }
}
