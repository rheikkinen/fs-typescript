import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height)
  const weight = Number(request.query.weight)

  if (isNaN(height) || isNaN(weight)) {
    response.status(400).json({ error: 'parameters invalid or missing' })
  }

  const bmi = calculateBmi(height, weight)

  response.status(200).json({ height, weight, bmi })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
