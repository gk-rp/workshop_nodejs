const mongoose = require('mongoose');
require('dotenv').config();

const connectionURL = process.env.connectionURL;
mongoose.connect(connectionURL);