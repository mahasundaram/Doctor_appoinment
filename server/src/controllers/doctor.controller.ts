import { Request, Response } from 'express';
import { db } from '../config/db';

export const getDoctors = (req: Request, res: Response) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const getDoctorsName = (req: Request, res: Response) => {
  db.query('SELECT name FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const createDoctor = (req: Request, res: Response) => {
  const { fullName, specialization, experience, availableSlots, contactInfo } = req.body;
  const query = 'INSERT INTO doctors (fullName, specialization, experience, availableSlots, contactInfo) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [fullName, specialization, experience, availableSlots, contactInfo], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Doctor created successfully' });
  });
};

export const updateDoctor = (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, specialization, experience, availableSlots, contactInfo } = req.body;
  const query = 'UPDATE doctors SET fullName=?, specialization=?, experience=?, availableSlots=?, contactInfo=? WHERE id=?';
  db.query(query, [fullName, specialization, experience, availableSlots, contactInfo, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Doctor updated successfully' });
  });
};

export const deleteDoctor = (req: Request, res: Response) => {
  const { id } = req.params;
  db.query('DELETE FROM doctors WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Doctor deleted successfully' });
  });
};
