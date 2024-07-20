import mongoose, { Schema, Document } from "mongoose";


interface User extends Document {
    email: string,
    password: string,
    timestamps: Date
}
const userModel = new Schema({
    email: {
        type: String,
        req: true,
        unique: true,
        trim: true

    },
    password: {
        type: String,
        req: true
    },

}, { timestamps: true });


const User = mongoose.models.User<User> || mongoose.model("User", userModel)
export default User;