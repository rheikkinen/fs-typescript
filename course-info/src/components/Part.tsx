import { CoursePart } from '../types';
import { assertNever } from '../utils/helpers';

const Part = ({ part }: { part: CoursePart }) => {
  const additionalPartDetails = () => {
    switch (part.kind) {
      case 'basic':
        return <em>{part.description}</em>;
      case 'group':
        return <>Projects: {part.groupProjectCount}</>;
      case 'background':
        return (
          <>
            <em>{part.description}</em>
            <br />
            Background material: {part.backgroundMaterial}
          </>
        );
      case 'special':
        return <>Required skills: {part.requirements.join(', ')}</>;
      default:
        assertNever(part);
    }
  };

  return (
    <p>
      <b>
        {part.name} ({part.exerciseCount} exercises)
      </b>
      <br />
      {additionalPartDetails()}
    </p>
  );
};

export default Part;
