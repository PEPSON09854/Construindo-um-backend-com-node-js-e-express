import Photo from '../models/Photo.js'
import User from '../models/User.js'
import mongoose from 'mongoose'



//Função de inserção de foto do usuário
const insertPhoto = async (req, res)=>{

    const {title} = req.body
    const image = req.file.filename
    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    //Função de criação de nova Foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    if(!newPhoto){
        res.status(422).json({errors: ['Houve um erro, tente mais tarde!']})
        return
    }

    res.status(201).json(newPhoto)

}


//função que remove a foto
const deletePhotos = async (req, res)=>{

    const {id} = req.params
    const reqUser = req.user
   
    try {
        const photo =  await Photo.findById(mongoose.Types.ObjectId(id))

        //checando se a foto existe!
        if(!photo){
            res.status(404).json({errors: ['Imagem não encontrada!']})
            return
        }
    
        //checando se o id da foto pertence ao usuario com mesmo id
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ['Ocorreu um erro, tente mais tarde!']})
            return
        }
    
        await Photo.findByIdAndDelete(photo)
    
        res.status(200).json({id: photo._id, message: 'Foto excluída com sucesso!'})

    } catch (error) {
        res.status(404).json({errors: ['Imagem não encontrada!!']})
        return
    
    }
}


//Função que pega todas as fotos do banco e exibe na home
const getAllPhotos = async (req, res)=>{

    //no metodo find se coloca uma chave vazia para trazer todas as fotos
    //o metodo sort está ordenando as imagens de forma que traga uma lista descrecente
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()//metodo exec executa a operação

     return res.status(200).json(photos)

}

//Função que pega fotos do usuário
const getUserPhotos = async (req, res)=>{

    const {id} = req.params

    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)

}

//Função que pega fotos pelo id
const getIdPhoto = async (req, res)=>{

    const {id} = req.params

    
        const photo =  await Photo.findById(mongoose.Types.ObjectId(id))
        if(!photo){
            res.status(404).json({errors: ['Foto não encontrada!']})
            return
        }

        res.status(200).json(photo)
   
}

//Função que atualiza a foto
const updatePhoto = async (req, res)=>{
    const {id} = req.params
    const {title}= req.body

    const reqUser = req.user
    const photo = await Photo.findById(id)

    //se afoto existe
    if(!photo){
        res.status(404).json({errors: ['Foto não encontrada!']})
        return
    }

    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ['Ocorreu um erro, tente mais tarde!']})
        return
    }

    if(title){
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message: 'Foto atualizada com sucesso!'})
}

//Função de like da foto
const likePhoto = async (req, res)=>{
    const {id} = req.params
    

    const reqUser = req.user
    const photo = await Photo.findById(id)

    //se afoto existe
    if(!photo){
        res.status(404).json({errors: ['Foto não encontrada!']})
        return
    }

    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors: ['Foto já curtida!']})
        return
    }

    photo.likes.push(reqUser._id)

    await photo.save()

    res.status(200).json({photoId: id, userId: reqUser, message: 'Foto curtida com sucesso!'})
}


//Função de like da foto
const commentsPhoto = async (req, res)=>{
    const {id} = req.params
    const {comment}= req.body

    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    //se afoto existe
    if(!photo){
        res.status(404).json({errors: ['Foto não encontrada!']})
        return
    }

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id

    }

    

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({comment: userComment, message: 'Comentário criado com sucesso!'})
}

//Função de busca por fotos
const searchPhotos = async (req, res)=>{
    const{q} = req.query
    
    const photos = await Photo.find({title: new RegExp(q, 'i')}).exec()//metodo exec executa a operação

    return res.status(200).json(photos)


}







export {
    insertPhoto, 
    deletePhotos,
    getAllPhotos,
    getUserPhotos,
    getIdPhoto,
    updatePhoto,
    likePhoto,
    commentsPhoto,
    searchPhotos  
}//funcões estão sendo importadas no PhotosRoutes.js

