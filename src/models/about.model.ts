
import mongoose, { Schema, Document, ObjectId  } from "mongoose";

interface about extends Document {
    _id:ObjectId
    aboutData: string
}
const aboutSchema: Schema<about> = new Schema({
    _id: Schema.Types.ObjectId,
    aboutData: String
});

const aboutModel = mongoose.models.About<about> || mongoose.model("About", aboutSchema)
export default aboutModel;