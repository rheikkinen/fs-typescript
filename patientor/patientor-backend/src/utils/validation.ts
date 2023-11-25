import { Entry, EntryType, Gender, UnsavedPatient } from '../types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Invalid name: ${name}`);
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Invalid date: ${date}`);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Invalid SSN: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Invalid gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error(`Invalid occupation: ${occupation}`);
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('The key "entries" must be an array.');
  }

  if (
    entries.some(
      (entry) => !entry || typeof entry !== 'object' || !('type' in entry)
    )
  ) {
    throw new Error('Some entries are invalid.');
  }
  // Every entry is an object and has a field "type".
  // Ensure that the "type" field has a valid type:
  entries.forEach((entry) => {
    const entryType: unknown = entry.type;
    if (!isString(entryType) || !isEntryType(entryType)) {
      throw new Error(`Invalid entry type: ${entryType}`);
    }
  });

  return entries as Entry[];
};

export const toNewPatient = (object: unknown): UnsavedPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }
  // all keys are required
  if (
    !('name' in object) ||
    !object.name ||
    !('dateOfBirth' in object) ||
    !object.dateOfBirth ||
    !('ssn' in object) ||
    !object.ssn ||
    !('gender' in object) ||
    !object.gender ||
    !('occupation' in object) ||
    !object.occupation ||
    !('entries' in object) ||
    !object.entries
  ) {
    throw new Error('Some keys are missing or invalid');
  }
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
};
