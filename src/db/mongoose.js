const mongoose = require('mongoose');

// const connectionURL = 'mongodb://127.0.0.1:27017/task-manager'
const connectionURL = 'mongodb+srv://testuser:testuser@cluster0.1milj.mongodb.net/?retryWrites=true&w=majority&appName=task-manager'
mongoose.connect(connectionURL);