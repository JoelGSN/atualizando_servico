import * as cliente_controllers from '../controllers/cliente_controllers.js'
import { Router } from 'express'

const router = Router()

router.get('/', cliente_controllers.listar)
router.get('/:cpfoucnpj', cliente_controllers.buscarPorCpfOuCnpj)
router.post('/', cliente_controllers.cadastrar)
router.delete('/:cpfoucnpj', cliente_controllers.remover)
router.put('/:cpfoucnpj', cliente_controllers.atualizar)

export default router
