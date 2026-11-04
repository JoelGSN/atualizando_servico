import * as prod_controllers from '../controllers/produto_controllers.js'
import { Router } from 'express'

const router = Router()

router.get('/', prod_controllers.listar)
router.get('/:produto', prod_controllers.buscarPorNome)
router.post('/', prod_controllers.cadastrar)
router.delete('/:produto', prod_controllers.remover)
router.put('/:produto', prod_controllers.atualizar)

// Comprar
router.post('/:produto/comprar', prod_controllers.comprar)
// Vender
router.post('/:produto/vender', prod_controllers.vender)

export default router
