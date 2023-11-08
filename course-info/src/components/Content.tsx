interface Part {
  name: string;
  exerciseCount: number;
}

const Content = ({ coursePart }: { coursePart: Part }) => {
  return (
    <p>
      {coursePart.name} {coursePart.exerciseCount}
    </p>
  );
};

export default Content;
