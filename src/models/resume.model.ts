
import mongoose, { Schema, Document } from "mongoose";

interface resume extends Document {
    resume: string
}
const resumeSchema = new Schema({
    resume: String
});

const resumeModel = mongoose.models.Resume<resume> || mongoose.model("Resume", resumeSchema)
export default resumeModel;