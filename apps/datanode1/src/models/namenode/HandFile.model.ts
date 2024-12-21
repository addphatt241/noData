
import mongoose, { Schema } from 'mongoose';

const handleFileSchema = new Schema({
    index: { type: String, maxLength: 255 },
    name: { type: String, maxLength: 255 },
    urlFile: { type: String },
});
const HandleFile = mongoose.model('handleFile', handleFileSchema);
export default HandleFile;
