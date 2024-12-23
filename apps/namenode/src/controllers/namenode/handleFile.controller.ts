import dotenv from 'dotenv';
import path from 'path';
import ManagerDatanode from '../../models/namenode/managerDatanode.model';
import MetaData from '../../models/namenode/matadata.model';
import httpStatus from 'http-status';

dotenv.config({ path: path.join(__dirname, '../.env') })

const checkUploadFile = async (req, res) => {
    const dataBody = req.body;
    // console.log(data)
    let numberChunk;

    const size = Number(dataBody?.size);
    const MB150 = Number(process.env.MB150);
    const MB200 = Number(process.env.MB200);

    if (size < MB150) {
        numberChunk = 3;
    }
    else if (size >= MB150 && size <= MB200) {
        numberChunk = 3;
    }
    else {
        numberChunk = 3;
    }

    await ManagerDatanode.findOne({ namenodeId: "123qwe" })
        .then(async (data) => {
            const datanodeAlive = [];
            const datanodeWrite = [];
            const datanodeReplication1 = []
            const datanodeReplication2 = []
            const metaDatas = []
            for (let i = 1; i < 5; i++) {
                if (data[`datanode${i}`]?.alive) {
                    datanodeAlive.push(data[`datanode${i}`])
                }
            }

            if (datanodeAlive.length >= 3) {
                for (let i = 0; i < numberChunk; i++) {
                    const datanodeSave = datanodeAlive.slice()
                    datanodeWrite.push(getRandom(datanodeSave));
                    datanodeReplication1.push(getRandom(datanodeSave));
                    datanodeReplication2.push(getRandom(datanodeSave));
                }
            } else if (datanodeAlive.length == 2) {
                for (let i = 0; i < numberChunk; i++) {
                    const random = Math.floor(Math.random() * datanodeAlive.length)
                    datanodeWrite.push(datanodeAlive[0]);
                    datanodeReplication1.push(datanodeAlive[1]);
                    datanodeReplication2.push(datanodeAlive[random]);
                }
            } else {
                for (let i = 0; i < numberChunk; i++) {
                    datanodeWrite.push((datanodeAlive[0]));
                    datanodeReplication1.push(datanodeAlive[0]);
                    datanodeReplication2.push(datanodeAlive[0]);
                }
            }

            for (let i = 0; i < numberChunk; i++) {
                metaDatas.push({
                    name: dataBody?.name,
                    index: i + 1,
                    datanode: datanodeWrite[i]?.address,
                    datanodeReplication1: datanodeReplication1[i]?.address,
                    datanodeReplication2: datanodeReplication2[i]?.address,
                })
            }

            // console.log(metaDatas)
            await MetaData.insertMany(metaDatas)
                .then(
                    res.send({
                        metaDatas: metaDatas,
                        numberChunk: numberChunk,
                    })
                )

        })


}

function getRandom(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];
    arr.splice(randomIndex, 1);
    return randomElement;
}

const checkReadFile = async (req, res) => {
    const name = req.query.name;
    console.log(name)
    await MetaData.find({ name: name })
        .then(async (data: any) => {
            if (data.length == 0) {
                res.status(httpStatus.NOT_FOUND).send();
            }
            else {
                const metaDatas = [];
                await ManagerDatanode.findOne({ namenodeId: "123qwe" })
                    .then(async (managerData) => {
                        const datanodeAlive = [];
                        for (let i = 1; i < 5; i++) {
                            if (managerData[`datanode${i}`]?.alive) {
                                datanodeAlive.push(managerData[`datanode${i}`].address)
                            }
                        }
                        // console.log(datanodeAlive)

                        data.forEach(e => {
                            // console.log(e)
                            if (datanodeAlive.includes(e.datanode)) {
                                metaDatas.push({
                                    name: e?.name,
                                    index: e?.index,
                                    datanode: e?.datanode
                                })
                                return;
                            }
                            else if (datanodeAlive.includes(e?.datanodeReplication1)) {
                                metaDatas.push({
                                    name: e?.name,
                                    index: e?.index,
                                    datanode: e?.datanodeReplication1
                                })
                                return;
                            }
                            else if (datanodeAlive.includes(e?.datanodeReplication2)) {
                                metaDatas.push({
                                    name: e?.name,
                                    index: e?.index,
                                    datanode: e?.datanodeReplication2
                                })
                                return;
                            }
                        });
                    })
                res.send({
                    metadata: metaDatas,
                })
            }
        })
}
export default {
    checkUploadFile,
    checkReadFile
}

