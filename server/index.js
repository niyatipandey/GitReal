const express = require('express')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const resumeRoute = require('./routes/resume')

const authRoutes = require('./routes/auth')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}))

app.use('/auth',authRoutes)
app.use('/resume',resumeRoute)

app.get('/',(req,res)=>{
    res.json({message: 'GitReal API running'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});