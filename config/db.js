import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async ()=>{
    try {
        const db = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.pwzkcxt.mongodb.net/?retryWrites=true&w=majority`
            )
            console.log('conectado ao mongodb')
        return db
    } catch (error) {
        console.log(error)
    }
}

conn()

export default conn

// esse arquivo está sendo importado no app.js