const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoute');

require('dotenv').config();


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };

app.use(cors(corsOptions));


app.use(express.json());



app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

app.use('/api/blogs', blogRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`connected to MongoDB`);
        })
    })
    .catch((error) => {
        console.log(error);
    })