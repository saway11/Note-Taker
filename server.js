// Importing express module, creating and express app, setting the port
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// importing the routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

