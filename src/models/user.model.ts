import mongoose, { Schema, Document, ObjectId } from "mongoose";


interface User extends Document {
    _id:ObjectId
    email: string,
    password: string
}
const userModel: Schema<User> = new Schema({
    _id: Schema.Types.ObjectId,
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