import { UnsavedDiaryEntry } from '../types';

interface DiaryFormProps {
  createDiaryEntry: (data: UnsavedDiaryEntry) => void;
}

const DiaryForm = ({ createDiaryEntry }: DiaryFormProps) => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    createDiaryEntry({
      date: form.date.value,
      weather: form.weather.value,
      visibility: form.visibility.value,
      comment: form.comment.value,
    });

    form.date.value = '';
    form.weather.value = '';
    form.visibility.value = '';
    form.comment.value = '';
  };

  return (
    <>
      <form style={{ marginBottom: 25 }} onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type='text' name='date' id='date' />

        <label>Weather:</label>
        <input type='text' name='weather' />

        <label>Visibility:</label>
        <input type='text' name='visibility' />

        <label>Comment:</label>
        <textarea name='comment'></textarea>

        <button type='submit'>Save</button>
      </form>
    </>
  );
};

export default DiaryForm;
