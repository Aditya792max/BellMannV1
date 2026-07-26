const User = require("../Models/UserModel");

// ==========================
// Create User
// ==========================
const createUser = async (req, res) => {
    try {

        const {
            name,
            email,
            position,
            phone,
            userId,
            password
        } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { phone },
                { userId }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        const user = await User.create({
            name,
            email,
            position,
            phone,
            userId,
            password
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Get All Users
// ==========================
const getAllUsers = async (req, res) => {

    try {

        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Get User By Specific Field
// ==========================
const getUserByField = async (req, res) => {

    try {

        const { field, value } = req.params;

        const allowedFields = [
            "email",
            "phone",
            "userId",
            "name",
            "position"
        ];

        if (!allowedFields.includes(field)) {
            return res.status(400).json({
                success: false,
                message: "Invalid search field."
            });
        }

        const query = {};
        query[field] = value;

        const user = await User.findOne(query);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Update User
// ==========================
const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Delete User
// ==========================
const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createUser,
    getAllUsers,
    getUserByField,
    updateUser,
    deleteUser
};