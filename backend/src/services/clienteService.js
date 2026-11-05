import bd_cliente from '../models/bd_cliente.js'

export async function listarcliente() {
    return await bd_cliente.findAll({ order: [['id', 'ASC']] })

}


/* export async function buscarcPorId(cpfoucnpj) {
    return await bd_cliente.findOne({
        where: {
            cpfoucnpj
        }
    })
} */

    
export async function buscarcPordoc(cpfoucnpj) {
    return await bd_cliente.findOne({
        where: {
            cpfoucnpj
        }
    })
}

export async function cadastrarcliente(dados, res) {

    const { nome, cpfoucnpj, rua, numero, uf } = dados

    const addcliente = await bd_cliente.create({ nome, cpfoucnpj, rua, numero, uf })
    return res.status(200).json(addcliente)


}

export async function removercliente(cpfOuCnpj) {
    const cliente = await buscarcPordoc(cpfOuCnpj)
    if (cliente) {
        const cpfOuCnpj = cliente.cpfoucnpj

        await cliente.destroy()
    }

    return cliente

}

export async function atualizarcliente(cpfOuCnpj, dados) {
    const { nome, cpfoucnpj, rua, numero, uf } = dados

    const cliente = await buscarcPordoc(cpfOuCnpj)
    if (cliente) {
        const cpfOuCnpj = cliente.cpfoucnpj
       await cliente.update({ nome, cpfoucnpj, rua, numero, uf })
    }
    return cliente

}