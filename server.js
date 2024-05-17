import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongodb.js';
import router from './routes/routes.js'
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router)
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});