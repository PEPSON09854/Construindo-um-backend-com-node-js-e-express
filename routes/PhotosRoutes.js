import express from 'express'
import authGuard from '../middlewares/authGuard.js'
import imageUpload from '../middlewares/imageUpload.js'
import validate from '../middlewares/handleValidation.js'
import { 
    photoInsertValidation, 
    photoUpdateValidation, 
    photoCommentValidation 
} from '../middlewares/photoValidation.js'

import { 
    insertPhoto, 
    deletePhotos, 
    getAllPhotos, 
    getUserPhotos, 
    getIdPhoto,
    updatePhoto,
    likePhoto,
    commentsPhoto,
    searchPhotos
} from '../controllers/PhotosComtroller.js'



const PhotosRouter = express.Router()

PhotosRouter.get('/', 
    authGuard, 
    imageUpload.single('image'),
    photoInsertValidation(),
    validate,
    insertPhoto
)

PhotosRouter.delete('/:id', authGuard, deletePhotos)
PhotosRouter.get('/', authGuard, getAllPhotos)
PhotosRouter.get('/user/:id', authGuard, getUserPhotos)
PhotosRouter.get('/search', authGuard, searchPhotos)
PhotosRouter.get('/:id', authGuard, getIdPhoto)
PhotosRouter.put('/:id', authGuard, photoUpdateValidation(), validate, updatePhoto)
PhotosRouter.put('/like/:id', authGuard, likePhoto)
PhotosRouter.put('/comment/:id', authGuard, photoCommentValidation(), validate, commentsPhoto)



export default PhotosRouter// arquivo está sendo importado no Router.js