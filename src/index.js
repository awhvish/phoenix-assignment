import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import gadgetRoutes from './routes/gadgets.route.js';
import setupSwagger from './lib/swagger.js';

// import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

/* TODO: for frontend
app.use(cors({
    origin: [""],
    credentials: true,
}))*/

app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
