import dotenv from 'dotenv'
import  express  from "express";
import path from 'path'
import cors from 'cors'//faz integração com o front-end
import router from './routes/Router.js'
import db from './config/db.js'

dotenv.config()
const __dirname = path.resolve()
const app = express()
const port = process.env.PORT

app.use(express.json())//configurção para ler dados em json
app.use(express.urlencoded({
    extended: false//para aceitar a form data
}))

//RESOLVENDO PROBLEMA DE CORS DO FRONT-END
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

//PASTAS DO DIRETORIO DO PROJETO
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//conexao com o banco de dados

app.use(router)

app.listen(port)