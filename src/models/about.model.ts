
import mongoose, { Schema, Document } from "mongoose";

interface about extends Document {
    aboutData: string
}
const aboutSchema = new Schema({
    aboutData: String
});

const aboutModel = mongoose.models.About<about> || mongoose.model("About", aboutSchema)
export default aboutModel;