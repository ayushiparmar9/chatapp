import User from "../models/userModel.js";
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