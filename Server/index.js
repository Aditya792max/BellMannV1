const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const UserRoutes = require('./Routes/UserRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", UserRoutes);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Database Connection
mongoose.connect(MONGODB_URI)
.then(() => {

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})
.catch((err) => {
    console.log("Database Connection Error:", err);
});