
const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const resumeRoute = require('./routes/resume');
const authRoutes = require('./routes/auth');

const app = express();

// Render runs behind a proxy; trust it for secure cookies.
app.set('trust proxy', 1);

// Read allowed frontend origins from environment variables.
const allowedOrigins = (process.env.CLIENT_URL || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests without an Origin header (e.g. server-to-server).
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());

const isProduction = process.env.NODE_ENV === 'production';

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }
}));

app.use('/auth', authRoutes);
app.use('/resume', resumeRoute);

app.get('/', (req, res) => {
    res.json({ message: 'GitReal API running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
