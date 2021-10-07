import mongoose from 'mongoose';

type TInput = {
  db: string;
};

export default ({ db }: TInput): void => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Connected to database`);
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
