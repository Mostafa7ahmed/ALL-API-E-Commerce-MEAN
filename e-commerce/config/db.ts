import mongoose from 'mongoose';

const dbConnection = () => {
  mongoose.connect(process.env.DB!).then(() => {
    console.log(`mongodb connected to Done`);
  });
};

export default dbConnection;
