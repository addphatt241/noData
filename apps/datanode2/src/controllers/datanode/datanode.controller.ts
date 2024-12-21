/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heartbeat } from './../../domain/namenode/heartbeat';
import dotenv from 'dotenv';
import path from 'path';
import HandleFile from '../../models/namenode/HandFile.model';
import axios from 'axios';
import fs from 'fs'

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

const uploadFile = async (req, res) => {
    const data = req.body
    const randomSuffix = Math.floor(Math.random() * 10000);
    const name = `\\${data?.name ?? 'file'}_${randomSuffix}`;
    // console.log(data)
    const rootDirectory = process.cwd();
    const directory = path.join(rootDirectory, '/apps/datanode2/src/store')
    console.log(directory)
    const fullPath = path.join(directory, name);

    fs.writeFileSync(fullPath, data?.file);

    const fileReplication = {
        index: data?.index,
        name: data?.name,
        file: data?.file,
        datanodeReplication1: '',
        datanodeReplication2: '',
    }

    const file = {
        index: data?.index,
        name: data?.name,
        urlFile: directory + name
    }

    await HandleFile
        .create(file)
    if (data?.datanodeReplication1 != "" && data?.datanodeReplication2 != "") {
        Promise.all([
            axios.post(`${data?.datanodeReplication1}/api/datanode/upload`, fileReplication),
            axios.post(`${data?.datanodeReplication2}/api/datanode/upload`, fileReplication)
        ])
            .then(res => { console.log(res) })
            .catch((err) => console.log(err))
    }
    else {
        console.log("Error")
    }
    res.send('Upload File Succes')
}

const readFile = async (req, res) => {
    const data = req.query
    console.log(data)
    await HandleFile.find({ name: data?.name, index: data?.index })
        .then(async (data) => {
            console.log(data)
            try {
                const file = fs.readFileSync(data[0].urlFile, "utf-8");
                const datafile = {
                    index: data[0].index,
                    name: data[0].name,
                    file: file
                }
                res.send(datafile)
            }
            catch (err) {
                console.log(`Lỗi khi đọc tệp ${err.message}`)
                // res.send(`Lỗi khi đọc tệp ${err.message}`)
            }
        })
}

export default {
    sendHeartbeat,
    uploadFile,
    readFile
}
