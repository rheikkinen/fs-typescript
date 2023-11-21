import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry, UnsavedDiaryEntry } from './types';
import DiaryItem from './components/DiaryItem';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import { AxiosError } from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then((returnedData) => setDiaries(returnedData));
  }, []);

  const showNotificationWithTimeout = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const createDiaryEntry = (
    newDiary: UnsavedDiaryEntry,
    form: HTMLFormElement
  ): void => {
    diaryService
      .create(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        form.reset();
      })
      .catch((error: unknown) => {
        let errorMessage;
        if (error instanceof AxiosError) {
          errorMessage =
            error.response?.data ||
            'Error occured when creating a new diary entry.';
        }
        showNotificationWithTimeout(errorMessage);
      });
  };

  return (
    <div>
      <h2>Flight Diary</h2>
      <Notification message={notification} />
      <h4>Add a new diary entry</h4>
      <DiaryForm createDiaryEntry={createDiaryEntry} />
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diaryEntry={diary} />
      ))}
    </div>
  );
};

export default App;
