import { Patient, UnsavedPatient } from '../types';
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientData: UnsavedPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patientData,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
