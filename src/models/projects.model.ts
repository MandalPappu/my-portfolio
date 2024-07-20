
import mongoose, { Schema, Document } from "mongoose";

interface project extends Document {
    projectName: string
    projectImage: string
    weblink: string
}
const projectSchema = new Schema({
    projectName: String,
    projectImage: String,
    weblink: String

});

const projectModel = mongoose.models.Project<project> || mongoose.model("Project", projectSchema)
export default projectModel;