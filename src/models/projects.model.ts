
import mongoose, { Schema, Document } from "mongoose";

interface project extends Document {
    projectName: string
    projectImages: Array<string> 
    weblink?: string
}
const projectSchema:Schema<project> = new Schema({
    projectName: {
        type: String,
        required: true
    },
    projectImages:[
        {
            type: String,
        }],
    weblink: {
        type: String
    }

});

const projectModel = mongoose.models.Project<project> || mongoose.model("Project", projectSchema)
export default projectModel;