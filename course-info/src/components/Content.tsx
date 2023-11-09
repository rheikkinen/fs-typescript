import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts
        .sort((a, b) => (a.kind > b.kind ? 1 : -1))
        .map((part) => (
          <Part key={part.name} part={part} />
        ))}
    </>
  );
};

export default Content;
