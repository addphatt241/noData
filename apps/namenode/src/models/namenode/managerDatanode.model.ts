import { ManagerDatanode } from "../../domain/namenode/managerDatanode.entity";
import mongoose, { Schema } from 'mongoose';
const ManagerDatanodeSchema = new Schema<ManagerDatanode>({
    namenodeId: { type: String, maxLength: 255 },
    datanode1: {
        type: new Schema({
            address: { type: String, required: true },
            alive: { type: Boolean, required: true },
            size: { type: Number, required: true }
        }),
    },
    datanode2: {
        type: new Schema({
            address: { type: String, required: true },
            alive: { type: Boolean, required: true },
            size: { type: Number, required: true }
        }),
    },
    datanode3: {
        type: new Schema({
            address: { type: String, required: true },
            alive: { type: Boolean, required: true },
            size: { type: Number, required: true }
        }),
    }
});
const ManagerDatanode = mongoose.model('ManagerDatanode', ManagerDatanodeSchema);
export default ManagerDatanode;
