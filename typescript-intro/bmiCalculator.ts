interface BmiParameters {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight))
    throw new Error('Arguments must be numbers!');

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0)
    throw new Error("Arguments can't be negative or zero!");
  const bmi = (weight / height ** 2) * 10_000;

  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (healthy weight)';
  if (bmi < 18.5) return 'Underweight';
  if (bmi > 24.9) return 'Overweight';
  return 'Something went wrong';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) console.error(error.message);
}
