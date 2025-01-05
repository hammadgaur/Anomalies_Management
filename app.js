import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Routes from './routes/routes.js';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'))

// View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/', Routes);

// Start Server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


