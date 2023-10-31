const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height ** 2) * 10_000

  if (bmi >= 18.5 && bmi <= 24.9) return "Normal (healthy weight)"
  if (bmi < 18.5) return "Underweight"
  if (bmi > 24.9) return "Overweight"
}

console.log(calculateBmi(180, 75))
