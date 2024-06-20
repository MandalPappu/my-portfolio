import mongoose from "mongoose";
const DB_NAME = "My-Portfolio"


async function dbConnect() {
    let isConnected = false;
    try {
        if (isConnected) return console.log("db already connected!.");

        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connected to MongoDB ${DB_NAME} database and host ${connect.connection.host}`)
        isConnected = true;
    } catch (error) {
        console.log("db connection failed", error);

    }
}

export default dbConnect;