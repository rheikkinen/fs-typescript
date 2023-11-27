import {
  Entry,
  NonSensitivePatient,
  Patient,
  UnsavedEntry,
  UnsavedPatient,
} from '../types';
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addPatient = (patientData: UnsavedPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patientData,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entryData: UnsavedEntry, patient: Patient): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entryData,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, getPatientById, addPatient, addEntry };
