//Nesse arquivo etão as funções validações de registro e login do usuário

import { body } from "express-validator";//traz todo o corpo da requisição para validação

//função de validação de formulário do cadastro de usuário
const userCreateValidadtion = ()=>{
    
    return [
        body('name').isString().withMessage('O nome é obrigatório')
        .isLength({min: 3}).withMessage('O nome presisar ter no minimo 3 caracteres'),

        body('email').isEmail().withMessage('E-mail é obrigatório'),
        body('email').custom(value => {
            if (!value) {
                return Promise.reject("O e-mail precisa ser válido");
            }
            
            return true
        }),

        body('password').isString().withMessage('A senha é obrigatória').isLength({ min: 6}).withMessage('A senha precisa ter no mínimo 6 caracteres'),
        body('confirmpassword').isString().withMessage('A confirmação de senha é obrigatória').custom((value, { req })=>{
            if(value != req.body.password){
                return Promise.reject('As senhas precisam ser iguais')
            }
            return true

        }).withMessage('A senha precisa ser no mínimo 6 caracteres'),

        
    ]
   
}

const loginValidation = ()=>{
    return [
        body('email').isEmail().withMessage('E-mail é obrigatório'),
        body('email').custom(value => {
            if (!value) {
                return Promise.reject("O e-mail precisa ser válido");
            }
            
            return true
        }),
        body('password').isString().withMessage('A senha é obrigatória')
        .isLength({ min: 6}).withMessage('A senha precisa ter no mínimo 6 caracteres'),

       
    ]
}


//Função de validação de upload de imagens
const userUploadValidation = ()=>{

    return [
        body('name').optional().isLength({min: 3})
        .withMessage('O nome precisa ter no minimo 3 caracteres '),

        body('password').optional().isLength({min: 6})
        .withMessage('O a enha precisa ter no minimo 6 caracteres ')

    ]

}

 export {
    userCreateValidadtion,
    loginValidation,
    userUploadValidation
}//essas funções forom importadas no arquivo UserRouter.js