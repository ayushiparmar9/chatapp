import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
export const UserRegister = async (req, res, next) => {
  try {
    //accept data from frontend
    const { fullName, email, mobileNumber,password,role } = req.body;
    if (!fullName || !email || !mobileNumber || !password) {
      const error = new Error("ALL feilds required");
      error.statusCode = 400;
      return next(error);
    }
    //check fro duplicate
    const existingUser = await User.findOne({email});
    if (existingUser) {
      const error = new Error("email already registered");
      error.statusCode = 409;
      return next(error);
    }
    //encrpt password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    
    //save data tomdatabase 
    const newUser = await User.create({
        fullName ,
        email,
        mobileNumber,
        password:hashedpassword,
        
        

    });
    //send dresponse to frontend
    console.log(newUser);
    res.status(201).json({message:"Registration successful"});


  } catch (error) {
    next(error);
  }
};


export const UserLogin = async (req, res, next ) => {
  try {
    //fetch data from frontend
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("ALL feilds required");
      error.statusCode = 400;
      return next(error);
    }
    
    //check if user is regited or not
    const existingUser = await User.findOne({email});
    console.log(existingUser);
    if (!existingUser) {
      const error = new Error("email not registered");
      error.statusCode = 401;
      return next(error);
    }
//verify the password 
const isVerified=await bcrypt.compare(password , existingUser.password);
if(!isVerified){
    const error = new Error("password didn't match");
      error.statusCode = 401;
      return next(error);
}
//send messsage to frontend
//token generation willl be done here
// genToken(existingUser , res);
res.status(200).json({message:'login successfull', data:existingUser});
// //End



  } catch (error) {
    next(error);
  }
};