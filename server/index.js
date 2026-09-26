const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app = express();

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    res.json({message: 'GitReal API running'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});