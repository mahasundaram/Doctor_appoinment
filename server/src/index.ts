import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import doctorRoutes from './routes/doctor.routes';
import appointmentRoutes from './routes/appointment.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:3000/api/doctors`);
});
