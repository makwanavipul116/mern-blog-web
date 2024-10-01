import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/configDB.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from 'cookie-parser'
import path from 'path'


//dotenv
dotenv.config()

//mongoDb Connect
connectDB()

const __dirname = path.resolve()

const app = express()

//middleware
// app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser())

//port
const port = process.env.PORT || 5000

//server Start
app.listen(port, () => {
    console.log(` Server Started ${port}`)
})

//routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})




