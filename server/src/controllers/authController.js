import User from "../models/userModel.js";
import { generateToken } from "../config/authToken.js";
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
         userType: "regular",
        
        

    });
    //send dresponse to frontend
    console.log(newUser);
    res.status(201).json({message:"Registration successful"});


  } catch (error) {
    next(error);
  }
};


// export const UserLogin = async (req, res, next ) => {
//   try {
//     //fetch data from frontend
//     const { email, password } = req.body;
//     if (!email || !password) {
//       const error = new Error("ALL feilds required");
//       error.statusCode = 400;
//       return next(error);
//     }
    
//     //check if user is regited or not
//     const existingUser = await User.findOne({email});
//     console.log(existingUser);
//     if (!existingUser) {
//       const error = new Error("email not registered");
//       error.statusCode = 401;
//       return next(error);
//     }
// //verify the password 
// const isVerified=await bcrypt.compare(password , existingUser.password);
// if(!isVerified){
//     const error = new Error("password didn't match");
//       error.statusCode = 401;
//       return next(error);
// }
// //send messsage to frontend
// //token generation willl be done here
// // genToken(existingUser , res);
// res.status(200).json({message:'login successfull', data:existingUser});
// // //End



//   } catch (error) {
//     next(error);
//   }
// generateToken(existingUser._id, res);


// };
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 400;
      return next(error);
    }

    const isGoogleUser = existingUser.userType === "google";
    if (isGoogleUser) {
      const error = new Error("Please log in with Google");
      error.statusCode = 400;
      return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      const error = new Error("Password did not match");
      error.statusCode = 400;
      return next(error);
    }

    // Generate token and set cookie
    generateToken(existingUser._id, res);
    
    res.status(200).json({
      message: "Login successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

export const GoogleUserLogin = async (req, res, next) => {
  try {
    const { name, email, id, imageUrl } = req.body;

    if (!imageUrl) {
      //use Defualt Photo Code here
      //using placehold.co
    }
    let existingUser = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);

    if (existingUser && existingUser.userType) {
      if (existingUser.userType === "regular") {
        console.log("pink");
        existingUser.userType = "hybrid";
        existingUser.googleId = bcrypt.hash(id, salt);
        await existingUser.save();
      } else {
        console.log("green");
        const isVerified = await bcrypt.compare(id, existingUser.googleId);
        if (!isVerified) {
          const error = new Error("User Not Verified");
          error.statusCode = 400;
          return next(error);
        }
      }
    } else {
      console.log("orange");
      const hashGoogleID = await bcrypt.hash(id, salt);

      const newUser = await User.create({
        fullName: name,
        email,
        googleId: hashGoogleID,
        userType: "google",
      });
      existingUser = newUser;
    }

    //genrate login token if requred

    generateToken(existingUser._id, res);
    res.status(200).json({
      message: "Login successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};