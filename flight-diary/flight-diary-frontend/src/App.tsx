import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry, UnsavedDiaryEntry } from './types';
import DiaryItem from './components/DiaryItem';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((returnedData) => setDiaries(returnedData));
  }, []);

  const createDiaryEntry = (newDiary: UnsavedDiaryEntry) => {
    diaryService
      .create(newDiary)
      .then((data) => setDiaries(diaries.concat(data)));
  };

  return (
    <div>
      <h2>Flight Diary</h2>
      <h4>Add a new diary entry</h4>
      <DiaryForm createDiaryEntry={createDiaryEntry} />
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diaryEntry={diary} />
      ))}
    </div>
  );
};

export default App;
