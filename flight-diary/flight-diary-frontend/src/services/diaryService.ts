import axios from 'axios';
import { DiaryEntry, UnsavedDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const create = (diaryData: UnsavedDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, diaryData)
    .then((response) => response.data);
};

export default { getAll, create };
