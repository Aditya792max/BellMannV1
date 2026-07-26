const express = require("express");

const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserByField,
    updateUser,
    deleteUser
} = require("../Controllers/UserController");

// Create User
router.post("/", createUser);

// Get All Users
router.get("/", getAllUsers);

// Get User By Any Field
// Example:
// /users/email/abc@gmail.com
// /users/userId/EMP001
// /users/phone/9876543210
router.get("/:field/:value", getUserByField);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

module.exports = router;