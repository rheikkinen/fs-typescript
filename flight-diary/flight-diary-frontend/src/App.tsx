import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry } from './types';
import DiaryItem from './components/DiaryItem';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((returnedData) => setDiaries(returnedData));
  }, []);

  return (
    <div>
      <h2>Flight Diary</h2>
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diaryEntry={diary} />
      ))}
    </div>
  );
};

export default App;
