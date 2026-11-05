import * as clienteService from '../services/clienteService.js'

export async function listar (req,res) {
    
const cliente = await clienteService.listarcliente()
    
    return res.status(200).json(cliente)

}

export async function buscarcPordoc (req,res) {
const cliente = await clienteService.buscarcPordoc(req.params.cpfoucnpj)
   if(!cliente){
    return res.status(404).json({Message: 'O cliente não foi encontrado.'} )
}
    return res.status(200).json(cliente)
}

// export async function buscarnum (req,res) {
// const cliente = await clienteService.buscarcPorId(req.params.numero)
//    if(!cliente){
//     return res.status(404).json({Message: 'O cliente não foi encontrado.'} )
// }
//     return res.status(200).json(cliente)
// }

export async function cadastrar (req,res)  {
        

    const novoCliente = await clienteService.cadastrarcliente(req.body, res)
        
}


export async function remover(req, res) {
        const clienteRemovido = await clienteService.removercliente(req.params.cpfoucnpj)
        if (!clienteRemovido) {
            return res.status(404).json({ Message: 'O cliente não foi encontrado.' })
        }
        return res.status(200).json(clienteRemovido)
        
}

export async function atualizar(req, res) {
    const clienteatual = await clienteService.atualizarcliente(req.params.cpfoucnpj, req.body)
    if(!clienteatual) {
        return res.status(404).json({Message: 'O cliente não foi encontrado.'})

    }
    return res.status(200).json(clienteatual)

    
}