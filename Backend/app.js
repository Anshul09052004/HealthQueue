import express from 'express';
import connectDb from './Db/index.js';
import cors from 'cors';
import adminRoutes from './Routes/admin.routes.js';
import connectCloudinary from './Utils/Cloudinary.js';
import doctorRoutes from './Routes/doctor.routes.js';
import userRoutes from './Routes/user.routes.js';

const app = express();
connectDb();
connectCloudinary();
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors({
  origin: [
    "https://healthqueue-frontend.onrender.com",
    "https://healthqueue-admin.onrender.com",
     "http://10.22.37.239:5173",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("server running successfully");
});

app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);

export default app;