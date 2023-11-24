import { NonSensitivePatient, Patient, UnsavedPatient } from '../types';
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

export default { getPatients, getPatientById, addPatient };
