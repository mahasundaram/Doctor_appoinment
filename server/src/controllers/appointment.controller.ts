import { Request, Response } from 'express';
import { db } from '../config/db';

export const getAppointments = (req: Request, res: Response) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const createAppointment = (req: Request, res: Response) => {
  const { patientName,doctorId, appointmentTime,contactInfo } = req.body;
  console.error(patientName+doctorId+ appointmentTime+contactInfo );
  const query = 'INSERT INTO appointments (doctorId, patientName, appointmentTime, contactInfo, status) VALUES (?,?,?,?, "pending")';
  db.query(query, [doctorId, patientName, appointmentTime, contactInfo], (err) => {
    if (err) return res.status(500).json( { error: err });
    res.status(201).json({ message: 'Appointment booked successfully' });
  });
};

export const updateAppointmentStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE appointments SET status=? WHERE id=?';
  db.query(query, [status, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Appointment status updated' });
  });
};

export const deleteAppointment = (req: Request, res: Response) => {
  const { id } = req.params;
  db.query('DELETE FROM appointments WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Appointment cancelled' });
  });
};