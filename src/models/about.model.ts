
import mongoose, { Schema, Document } from "mongoose";

interface about extends Document {
    aboutData: string
}
const aboutSchema = new Schema(
   { aboutData: {
        type: String,
        required: true,
        default:1
    }}

);

const aboutModel = mongoose.models.About<about> || mongoose.model("About", aboutSchema)
export default aboutModel;