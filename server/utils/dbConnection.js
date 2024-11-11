import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.DBCONNECTION) {
      throw new Error("DBCONNECTION environment variable not set");
    }
    await mongoose.connect(process.env.DBCONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

export default connectDB;
