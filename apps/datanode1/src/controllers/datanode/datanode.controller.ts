/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heartbeat } from './../../domain/namenode/heartbeat';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') })


const sendHeartbeat = (req: any, res: any) => {
    const heartbeat: Heartbeat = {
        address: `http://${process.env.HOST}:${process.env.PORT_NAMENODE}`,
        datanode: process.env.DATANODE,
        description: 'HeartBeat',
        time: new Date()
    };
    res.send(heartbeat)
}

export default {
    sendHeartbeat
}
