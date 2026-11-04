import * as clienteService from '../services/clienteService.js'

export async function listar(req, res) {
    try {
        const clientes = await clienteService.listarcliente()
        return res.status(200).json(clientes)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao listar clientes.', erro: erro.message })
    }
}

export async function buscarPorCpfOuCnpj(req, res) {
    try {
        const cpfoucnpj = req.params.cpfoucnpj || req.params.cliente || req.params.id
        const cliente = await clienteService.buscarPorCpfOuCnpj(cpfoucnpj)
        if (!cliente) {
            return res.status(404).json({ Message: 'O cliente não foi encontrado.' })
        }
        return res.status(200).json(cliente)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao buscar cliente.', erro: erro.message })
    }
}

// Apelido para manter compatibilidade
export const buscarid = buscarPorCpfOuCnpj

export async function cadastrar(req, res) {
    try {
        const cpfoucnpj = req.body.cpfoucnpj || req.body.cpf || req.body.cnpj
        const { nome, rua, numero, uf } = req.body
        if (!nome || !cpfoucnpj) {
            return res.status(400).json({ Message: 'Os campos nome e cpfoucnpj são obrigatórios.' })
        }
        const novoCliente = await clienteService.cadastrarcliente({
            nome,
            cpfoucnpj,
            rua,
            numero: Number(numero),
            uf
        })
        return res.status(201).json(novoCliente)
    } catch (erro) {
        return res.status(400).json({ Message: 'Erro ao cadastrar cliente.', erro: erro.message })
    }
}

export async function remover(req, res) {
    try {
        const cpfoucnpj = req.params.cpfoucnpj || req.params.cliente || req.params.id
        const clienteRemovido = await clienteService.removercliente(cpfoucnpj)
        if (!clienteRemovido) {
            return res.status(404).json({ Message: 'O cliente não foi encontrado.' })
        }
        return res.status(200).json({ Message: 'Cliente removido com sucesso.', cliente: clienteRemovido })
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao remover cliente.', erro: erro.message })
    }
}

export async function atualizar(req, res) {
    try {
        const cpfoucnpj = req.params.cpfoucnpj || req.params.cliente || req.params.id
        const clienteAtualizado = await clienteService.atualizarcliente(cpfoucnpj, req.body)
        if (!clienteAtualizado) {
            return res.status(404).json({ Message: 'O cliente não foi encontrado.' })
        }
        return res.status(200).json(clienteAtualizado)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao atualizar cliente.', erro: erro.message })
    }
}
