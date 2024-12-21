import { ManagerDatanode } from "../../domain/namenode/managerDatanode.entity";
import mongoose, { Schema } from 'mongoose';
const ManagerDatanodeSchema = new Schema<ManagerDatanode>({
    namenodeId :{ type: String, maxLength: 255 },
    datanode1 :{type : Object},
    datanode2 :{type : Object},
    datanode3 :{type : Object}
});
const ManagerDatanode = mongoose.model('metaData', ManagerDatanodeSchema);
export default ManagerDatanode;
