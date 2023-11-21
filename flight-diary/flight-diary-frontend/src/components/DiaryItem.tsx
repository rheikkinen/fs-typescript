import { DiaryEntry } from '../types';

const DiaryItem = ({ diaryEntry }: { diaryEntry: DiaryEntry }) => {
  return (
    <div style={{ marginBottom: 25 }}>
      <table width={'40%'}>
        <thead>
          <tr>
            <th>
              <b>{diaryEntry.date}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Weather:</b> {diaryEntry.weather}
            </td>
          </tr>
          <tr>
            <td>
              <b>Visibility:</b> {diaryEntry.visibility}
            </td>
          </tr>
          {diaryEntry.comment && (
            <tr>
              <td>
                <em>{diaryEntry.comment}</em>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiaryItem;
