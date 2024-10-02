import express , {urlencoded} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();  // Load environment variables

import { connectDB } from './utils/db.js';
const app = express();

//import routes file
import userRoutes from "./routes/user.route.js"
import lawyerRoutes from "./routes/lawyer.route.js"
import reviewRoutes from "./routes/review.route.js"
import legalResourceRoutes from "./routes/legalResources.route.js"
import appointmentRoutes from "./routes/appointment.route.js"

// Middleware
const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON requests
app.use(urlencoded({extended : true}));
app.use(cookieParser());


app.use('/api/user', userRoutes);
app.use('/api/lawyer', lawyerRoutes)
app.use('/api/appointments', appointmentRoutes);
app.use('/api/legal-resources', legalResourceRoutes);
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    connectDB();
  console.log(`Server running on port ${PORT}`);
});
