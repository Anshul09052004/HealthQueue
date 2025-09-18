import express from 'express';
import connectDb from './Db/index.js';
import cors from 'cors';
import adminRoutes from './Routes/admin.routes.js';
import connectCloudinary from './Utils/Cloudinary.js';

const app = express();
connectDb();
connectCloudinary();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("server running successfully");
});

// app.use('/api/v1/user', userRoutes);
app.use('/api/v1/doctor', adminRoutes);

export default app;