import mongoose
 from "mongoose";
 
 
  const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI);
        console.log("MOGO DB CONNECTED AT ", conn.connection.host);
        console.log("DB name :", conn.connection.name);
        
        

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
  };
  export default connectDB;