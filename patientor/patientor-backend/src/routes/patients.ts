import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils/validation';
import { Entry, UnsavedEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Error, something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

router.get('/:id', (req, res) => {
  const patientId = req.params.id;
  const patient = patientService.getPatientById(patientId);
  if (!patient) {
    res.status(400).json({ error: 'Patient not found. ' });
  }
  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = patientService.getPatientById(patientId);
    if (!patient) {
      return res.status(400).json({ error: 'Patient not found.' });
    }
    const newEntry: UnsavedEntry = toNewEntry(req.body);
    const addedEntry: Entry = patientService.addEntry(newEntry, patient);
    return res.status(200).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Error, something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

export default router;
