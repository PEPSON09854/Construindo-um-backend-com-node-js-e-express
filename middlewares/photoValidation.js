import { body } from "express-validator";//traz todo o corpo da requisição para validação


const photoInsertValidation = ()=>{
    
    return [
        body('title').not()
        .isString()
        .equals('undefined')
        .withMessage('O título é obrigatório!').not()
        .isLength({min: 3}).custom((value, {req}) => {
            if (!req.file) {
                return Promise.reject("O título precisa ter no mínimo 3 caracteres!");
            }
            return true
            
        }),
       
        body('image').custom((value, {req}) => {
            if (!req.file) {
                return Promise.reject("A imagem é obrigatória!");
            }
            
            return true
        }),
    ]
   
}

const photoUpdateValidation = ()=>{
    return [
        body('title')
        .not()
        .isString()
        .withMessage('O título é obrigatório!')
        .not()
        .isLength({min: 3}).custom((value, {req}) => {
            if (!req.file) {
                return Promise.reject("O título precisa ter no mínimo 3 caracteres!");
            }
            return true
            
        }),
        
    ]
}


const photoCommentValidation = ()=>{
    return [
        body('comment')
        .isString()
        .withMessage('O comentário é obrigatório!')
    ]
}


export {
    photoInsertValidation,
    photoUpdateValidation,
    photoCommentValidation

}//funçoes seno importadas em PhotosRoutes.js