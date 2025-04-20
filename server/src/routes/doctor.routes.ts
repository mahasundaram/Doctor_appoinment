  import { Router } from 'express';
  import { getDoctors, createDoctor, updateDoctor, deleteDoctor,getDoctorsName } from '../controllers/doctor.controller';

  const router = Router();

  router.get('/', getDoctors);
  router.post('/', createDoctor);
  router.get('/',getDoctorsName);
  router.put('/:id', updateDoctor);
  router.delete('/:id', deleteDoctor);

  export default router;