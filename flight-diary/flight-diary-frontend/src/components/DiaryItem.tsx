import { DiaryEntry } from '../types';

const DiaryItem = ({ diaryEntry }: { diaryEntry: DiaryEntry }) => {
  return (
    <div style={{ marginBottom: 25 }}>
      <table width={'40%'}>
        <thead>
          <tr>
            <th colSpan={2}>
              <b>{diaryEntry.date}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Weather:</td>
            <td>{diaryEntry.weather}</td>
          </tr>
          <tr>
            <td>Visibility:</td>
            <td>{diaryEntry.visibility}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <em>{diaryEntry.comment}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DiaryItem;
