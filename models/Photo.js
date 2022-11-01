import mongoose from 'mongoose'

const {Schema} = mongoose//Criando um model de schema do mongoose

//instanciando um model do mongoose para fotos do usuário
const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String
},{
    timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema)

export default Photo

//esse arquivo está sendo importado no controller