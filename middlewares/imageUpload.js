import multer from 'multer'
import path from 'path'

//função de configução do caminho das imagens
const imageStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = ""

        if(req.baseUrl.includes('user')){
            folder = "users"
        }else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        //salvando as imagens na pasta upload do diretório do projeto
        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb)=>{
        //salvando a data e formato da imagem
        cb(null, Date.now() + path.extname(file.originalname))

    }
})

//Função de configuração de upload das imagens
const imageUpload = multer({

    storage: imageStorage,

    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Só é permitido o formato png ou jpg!'))
        }
        cb(undefined, true)
    }

})

export default imageUpload//arquivo foi importado no UserRoutes.js
