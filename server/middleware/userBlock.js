
import User from "../models/usersModel";

const checkUserStatus = async (req, res, next) => {
    const user = await User.findById(req.userId); // Assuming you have the user ID in the JWT token
  
    // If user is not listed, block further access
    if (!user || !user.isListed) {
      return res.status(403).json({ message: "Account is blocked. You cannot access this resource." });
    }
  
    next();
  };

  module.exports = {checkUserStatus}