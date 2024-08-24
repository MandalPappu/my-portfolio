
import mongoose, { Schema, Document } from "mongoose";

interface resume extends Document {
    resume: string
}
const resumeSchema: Schema<resume> = new Schema({
    resume: {
        type: String,
    }
});

const resumeModel = mongoose.models.Resume<resume> || mongoose.model("Resume", resumeSchema)
export default resumeModel;