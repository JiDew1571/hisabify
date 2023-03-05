import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (uri) => {
	mongoose.set('strictQuery', false);
	return await mongoose.connect(uri);
};
export default connectDB;
