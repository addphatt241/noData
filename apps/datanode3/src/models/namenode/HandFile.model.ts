
import mongoose, { Schema } from 'mongoose';

const handleFileSchema = new Schema({
    index: { type: Number },
    name: { type: String, maxLength: 255 },
    urlFile: { type: String },
});
const HandleFile = mongoose.model('handleFile', handleFileSchema);
export default HandleFile;
