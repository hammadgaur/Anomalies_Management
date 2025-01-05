import express from 'express';
import { formController, getRecordById }  from '../controllers/formController.js';

const router = express.Router();

router.get('/:id', getRecordById); 

router.route('/')
    .get(formController)
    .post(formController)

export default router;






