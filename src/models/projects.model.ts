
import mongoose, { Schema, Document } from "mongoose";

interface project extends Document {
    projectName: string
    projectImage: string
    weblink?: string
}
const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    projectImage: {
        type: String,
        required:true
    },
    weblink: {
        type: String
    }

});

const projectModel = mongoose.models.Project<project> || mongoose.model("Project", projectSchema)
export default projectModel;