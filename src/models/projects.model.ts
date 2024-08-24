
import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface project extends Document {
    _id:ObjectId
    projectName: string
    projectImages: Array<string> 
    weblink?: string
}
const projectSchema: Schema<project> = new Schema({
    _id: Schema.Types.ObjectId,
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