
import mongoose, { Schema, Document } from "mongoose";

interface project extends Document {
    name: string
    image: string
}
const projectModel = new Schema({
    name: {
        type: String,
        req: true,
        trim: true
    },
    image: {
        type: String,
        req: true,
    }

}, { timestamps: true });

const Project = mongoose.models.User<project> || mongoose.model("Project", projectModel)
export default Project;