//Esse arquivo faz validações de erros
import { validationResult } from 'express-validator'

//Função de validação e erros
const validate = (req, res, next)=>{/*como se trata de um middleware
 recebe un terceiro argumento o next */

    const errors = validationResult(req)//inicializando validação pela requisição

    if(errors.isEmpty()){//se erros forem fazios?
        return next()//prossiga em frente
    }

    // se houver erros, extrair erros da requisição
    const extracteErros = []
    //transforme erros em um array, e mapeie cada error e os empurrem para extracteErros 
    errors.array().map((err)=> extracteErros.push(err.msg))

    //retorne como resposta um status de error 422 em formato json 
    return res.status(422).json({
        errors: extracteErros
    })
}

export default validate //esse arquivo foi importado no UserRoutes.js