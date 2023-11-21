import { UnsavedDiaryEntry } from '../types';

interface DiaryFormProps {
  createDiaryEntry: (data: UnsavedDiaryEntry, form: HTMLFormElement) => void;
}

const DiaryForm = ({ createDiaryEntry }: DiaryFormProps) => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    createDiaryEntry(
      {
        date: form.date.value,
        weather: form.weather.value,
        visibility: form.visibility.value,
        comment: form.comment.value,
      },
      form
    );
  };

  return (
    <>
      <form
        style={{
          marginBottom: 25,
          width: '50%',
          padding: 10,
        }}
        onSubmit={handleSubmit}
      >
        <label>Date:</label>
        <input style={{ width: '100%' }} type='date' name='date' id='date' />

        <label>Comment:</label>
        <textarea style={{ width: '100%' }} name='comment'></textarea>

        <fieldset
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <legend>Weather:</legend>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='sunny' name='weather' value='sunny' />
            <label htmlFor='sunny'>sunny</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='rainy' name='weather' value='rainy' />
            <label htmlFor='rainy'>rainy</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='cloudy' name='weather' value='cloudy' />
            <label htmlFor='cloudy'>cloudy</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='stormy' name='weather' value='stormy' />
            <label htmlFor='stormy'>stormy</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='windy' name='weather' value='windy' />
            <label htmlFor='windy'>windy</label>
          </div>
        </fieldset>

        <fieldset
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <legend>Visibility:</legend>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='great' name='visibility' value='great' />
            <label htmlFor='great'>great</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='good' name='visibility' value='good' />
            <label htmlFor='good'>good</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='ok' name='visibility' value='ok' />
            <label htmlFor='ok'>ok</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='radio' id='poor' name='visibility' value='poor' />
            <label htmlFor='poor'>poor</label>
          </div>
        </fieldset>
        <button style={{ width: '100%', marginTop: 10 }} type='submit'>
          Save
        </button>
      </form>
    </>
  );
};

export default DiaryForm;
