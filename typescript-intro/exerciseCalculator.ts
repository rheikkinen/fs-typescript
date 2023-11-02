interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  targetAverage: number;
  average: number;
}

const parseArguments = (
  args: string[]
): { exerciseHours: number[]; targetAverage: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetAverage = Number(args[2]);

  if (isNaN(targetAverage)) throw new Error('Arguments must be numbers!');

  const exerciseHours = args.slice(3).map((arg) => {
    if (isNaN(Number(arg))) throw new Error('Arguments must be numbers!');
    return Number(arg);
  });

  return { exerciseHours, targetAverage };
};

/**
 * Calculates the average time of daily exercise hours and
 * compares it to the target amount of daily hours.
 * @param {Array} exerciseHours
 * @param {number} targetAverage
 * @returns {ResultObject} Object that includes the following values:
 * - total number of days
 * - the number of training days
 * - the target average for daily training hours
 * - the calculated average
 * - boolean value describing if the target was reached
 * - a rating between 1-3 that tells how well the hours are met
 * - a text feedback explaining the rating
 */
export const calculateExercises = (
  exerciseHours: number[],
  targetAverage: number
): ResultObject => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.reduce(
    (days, dailyHours) => days + (dailyHours !== 0 ? 1 : 0),
    0
  );
  const average =
    exerciseHours.reduce((sum, dailyHours) => sum + dailyHours, 0) /
    periodLength;

  const success = targetAverage <= average;

  const rating = success ? 3 : (average >= 0.7 * targetAverage && 2) || 1;

  const desc = {
    1: 'Not quite there, you can do better!',
    2: 'Nice effort, keep pushing!',
    3: 'Great job, keep it up!',
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: desc[rating],
    targetAverage,
    average,
  };
};

try {
  const { exerciseHours, targetAverage } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetAverage));
} catch (error: unknown) {
  if (error instanceof Error) console.error(error.message);
}
