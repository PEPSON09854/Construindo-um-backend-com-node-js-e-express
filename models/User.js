import mongoose from 'mongoose'

const {Schema} = mongoose//Criando um model de schema do mongoose

//instanciando um model do mongoose do usuário
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User

//esse arquivo está sendo importado no controller