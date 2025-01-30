import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import gadgetRoutes from './routes/gadgets.route.js';

// import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

/* TODO:
app.use(cors({
    origin: ["https://chat-app-e782.vercel.app/"],
    credentials: true,
}))*/

app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
