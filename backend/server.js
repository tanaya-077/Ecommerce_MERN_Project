
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   
const cookieParser = require('cookie-parser');
const path = require('path');
const User = require('./models/User'); // Ensure the path is correct based on your project structure'
const authRoutes = require('./routes/auth/auth-routes'); // Ensure the path is correct based on your project structure
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
// app.use(express.urlencoded({ extended: true }));

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization','Cache-control', 'Expires', 'Pragma'],
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MernEcom');
}

//get
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


