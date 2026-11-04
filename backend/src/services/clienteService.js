import bd_cliente from '../models/bd_cliente.js'

export async function listarcliente() {
    return await bd_cliente.findAll({ order: [['id', 'ASC']] })
}

export async function buscarPorCpfOuCnpj(cpfoucnpj) {
    return await bd_cliente.findOne({
        where: {
            cpfoucnpj
        }
    })
}

// Mantém buscarcPorId para compatibilidade
export const buscarcPorId = buscarPorCpfOuCnpj
export const buscarPorId = buscarPorCpfOuCnpj

export async function cadastrarcliente(dados) {
    const { nome, cpfoucnpj, rua, numero, uf } = dados
    return await bd_cliente.create({ nome, cpfoucnpj, rua, numero, uf })
}

export async function removercliente(cpfoucnpj) {
    const cliente = await buscarPorCpfOuCnpj(cpfoucnpj)
    if (cliente) {
        await cliente.destroy()
        return cliente
    }
    return null
}

export async function atualizarcliente(cpfoucnpj, dados) {
    const cliente = await buscarPorCpfOuCnpj(cpfoucnpj)
    if (cliente) {
        const { nome, rua, numero, uf } = dados
        const novosDados = { nome, rua, numero, uf }
        if (dados.cpfoucnpj) {
            novosDados.cpfoucnpj = dados.cpfoucnpj
        }
        await cliente.update(novosDados)
        return cliente
    }
    return null
}
