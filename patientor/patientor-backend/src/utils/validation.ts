import {
  BaseEntry,
  Diagnosis,
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  UnsavedEntry,
  UnsavedPatient,
} from '../types';

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

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
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

const parseTextField = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error(`Invalid text input: ${text}`);
  }
  return text;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (isNaN(Number(rating)) || !isHealthCheckRating(Number(rating))) {
    throw new Error(`Invalid health check rating: ${rating}`);
  }

  return Number(rating);
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

export const toNewEntry = (object: unknown): UnsavedEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }
  if (
    !('type' in object) ||
    !object.type ||
    !('description' in object) ||
    !object.description ||
    !('date' in object) ||
    !object.date ||
    !('specialist' in object) ||
    !object.specialist
  ) {
    throw new Error('Some keys are missing or invalid');
  }

  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parseTextField(object.description),
    date: parseDate(object.date),
    specialist: parseTextField(object.specialist),
    diagnosisCodes:
      'diagnosisCodes' in object
        ? // assume that the diagnostic codes are sent in a correct form
          (object.diagnosisCodes as Array<Diagnosis['code']>)
        : [],
  };

  switch (object.type) {
    case EntryType.HealthCheck:
      if (!('healthCheckRating' in object) || !object.healthCheckRating) {
        throw new Error('Health check rating is missing or invalid');
      }
      return {
        ...baseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthcare:
      if (!('employerName' in object) || !object.employerName) {
        throw new Error('Employer name is missing');
      }
      if (!('sickLeave' in object) || !object.sickLeave) {
        return {
          ...baseEntry,
          type: EntryType.OccupationalHealthcare,
          employerName: parseTextField(object.employerName),
        };
      }
      if (
        typeof object.sickLeave !== 'object' ||
        !('startDate' in object.sickLeave) ||
        !('endDate' in object.sickLeave)
      ) {
        throw new Error(
          `Sick leave dates are invalid: ${JSON.stringify(object.sickLeave)}`
        );
      }
      return {
        ...baseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: parseTextField(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
      };

    case EntryType.Hospital:
      if (
        !('discharge' in object) ||
        !object.discharge ||
        typeof object.discharge !== 'object' ||
        !('date' in object.discharge) ||
        !('criteria' in object.discharge)
      ) {
        throw new Error('Discharge details missing or invalid');
      }
      return {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseTextField(object.discharge.criteria),
        },
      };

    default:
      throw new Error(`Invalid entry type: ${JSON.stringify(object.type)}`);
  }
};
