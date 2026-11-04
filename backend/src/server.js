import express from 'express'
import cliente_routes from './routes/cliente_routes.js'
import produto_routes from './routes/produto_routes.js'
import sequelize from './config/database.js'
import './models/bd_cliente.js'
import './models/bd_produto.js'

const app = express()

// Habilita CORS para requisições do frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())

app.use('/cliente', cliente_routes)
app.use('/produto', produto_routes)

try {
  await sequelize.authenticate()
  await sequelize.sync()
  app.listen(3000, () => console.log('\x1b[1;4;36m', 'Server inicializado na porta 3000.'))
} catch (erro) {
  console.error('Falha ao Iniciar:', erro)
  process.exit(1)
}
