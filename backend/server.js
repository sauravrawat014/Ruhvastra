import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 8080;
connectDb();
connectCloudinary();

// middlewares

app.use(express.json());
app.use(cors());

// api endpoints

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(port, ()=>{
    console.log("server started on port ", + port);
});
