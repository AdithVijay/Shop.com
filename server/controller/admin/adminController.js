const Admin = require("../../models/adminModel")
const bcrypt = require('bcrypt');
const genarateAccesTocken = require('../../utils/genarateAccesTocken');
const genarateRefreshTocken = require('../../utils/genarateRefreshTocken');



const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
         genarateAccesTocken(res,admin._id); 
        genarateRefreshTocken(res,admin._id); 

        res.status(200).json({
            message: "Admin login successful",
            admin: {
              id: admin._id,
              email: admin.email,
            },
         
          });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};




module.exports = { adminLogin}