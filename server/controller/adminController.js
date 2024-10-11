const bcrypt = require('bcrypt');
const Admin = require("../models/adminModel")


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        // Check if admin exists in the database
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        // Compare the hashed password with the one in the database
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If password matches, admin is authenticated
        res.status(200).json({ message: "Admin login successful", admin });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { adminLogin}