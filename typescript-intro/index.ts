import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    response.status(400).json({ error: 'parameters invalid or missing' });
  }

  const bmi = calculateBmi(height, weight);

  response.status(200).json({ height, weight, bmi });
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, targetAverage } = request.body;

  if (!dailyExercises || !targetAverage) {
    return response.status(400).json({ error: 'parameters missing' });
  }
  if (isNaN(Number(targetAverage))) {
    return response.status(400).json({ error: 'malformatted parameters' });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exercises = dailyExercises as any[];
  exercises.map((dailyTotal) => {
    if (isNaN(Number(dailyTotal))) {
      return response.status(400).json({ error: 'malformatted parameters' });
    }
    return Number(dailyTotal);
  });

  return response
    .status(200)
    .json(calculateExercises(exercises as number[], targetAverage as number));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
