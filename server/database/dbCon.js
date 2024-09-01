import mongoose from "mongoose";


 const dbCn = async()=>{
     try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected successfully`)
     } catch (error) {
          console.log(error)
     }
}


export default dbCn;