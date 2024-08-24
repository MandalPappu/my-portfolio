
import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface resume extends Document {
    _id:ObjectId
    resume: string
}
const resumeSchema: Schema<resume> = new Schema({
    _id: Schema.Types.ObjectId,
    resume: String
});

const resumeModel = mongoose.models.Resume<resume> || mongoose.model("Resume", resumeSchema)
export default resumeModel;