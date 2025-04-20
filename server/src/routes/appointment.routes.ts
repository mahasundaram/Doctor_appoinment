import { Router } from 'express';
import { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } from '../controllers/appointment.controller';

const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;
