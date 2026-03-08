import User from "../models/userModel.js";
import Message from "../models/messegeModel.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const filteredUsers = users.filter(
      (user) => user._id.toString() !== currentUser._id.toString(),
    );
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const { fullName, email, mobileNumber } = req.body;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({
        email: email,
        _id: { $ne: currentUser._id }
      });
      if (existingUser) {
        const error = new Error("Email already in use");
        error.statusCode = 400;
        return next(error);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(mobileNumber !== undefined && { mobileNumber })
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ 
      message: "Profile updated successfully", 
      data: updatedUser 
    });
  } catch (error) {
    next(error);
  }
}
export const fetchMessages = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const receiverId = req.params.receiverId;
    const senderId = currentUser._id.toString();

    const verifyReceiver = await User.findById(receiverId);
    if (!verifyReceiver) {
      const error = new Error("Unknown Receiver");
      error.statusCode = 404;
      return next(error);
    }

    // console.log({
    //   senderId,
    //   receiverId,
    // });

    const mychat = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).select("-_id -__v")
      .sort({ createdAt: 1 });

    //console.log(mychat);

    res.status(200).json({ data: mychat });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const { inputMessage } = req.body;

    const receiverId = req.params.receiverId;
    const senderId = currentUser._id.toString();

    const verifyReceiver = await User.findById(receiverId);
    if (!verifyReceiver) {
      const error = new Error("Unknown Receiver");
      error.statusCode = 404;
      return next(error);
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: inputMessage,
    });

    res.status(201).json({ data: newMessage });
  } catch (error) {
    next(error);
  }
};