
import mongoose, { Schema, Document } from "mongoose";

interface skill extends Document {
    skillName: string
    skillImage: string
    weblink?: string
}
const skillSchema: Schema<skill> = new Schema({
    skillName: {
        type: String,
        required: true,
        trim:true
    },
    skillImage: {
        type: String,
        required: true,
    },
    weblink: {
        type: String,
    }

});

const skillModel = mongoose.models.Skill<skill> || mongoose.model("Skill", skillSchema)
export default skillModel;