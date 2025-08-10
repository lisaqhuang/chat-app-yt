import mongoose from 'mongoose';
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connecting to MongoDB...');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Re-throw the error to handle it in the calling function

    }
}
export default connectToMongoDB;