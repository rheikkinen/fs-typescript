const Notification = ({ message }: { message: string | null }) => {
  if (message === null) return null;

  return <p style={{ color: 'red' }}>{message}</p>;
};

export default Notification;
