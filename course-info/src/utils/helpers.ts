export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled value in discriminated union: ${JSON.stringify(value)}`
  );
};
