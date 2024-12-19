import axios from 'axios';
import ManagerDatanode from '../../models/namenode/managerDatanode.model';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') })

export const getHeartBeatNameNode1 = () => {
    const endPointDatanode1 = process.env.DATANODE1
    setInterval(async () => {
        await axios.post(endPointDatanode1)
            .then(async (res) => {
                const heartBeat = res.data
                console.log('dataheartdataNode1', heartBeat)
                await ManagerDatanode.findOne({ namenodeId: "123qwe" }).then(async (data) => {
                    const datanode1 = data.datanode1
                    if (!datanode1.alive) {
                        datanode1.alive = true
                        await ManagerDatanode.updateOne({
                            "namenodeId": "123qwe"
                        }, {
                            $set: { datanode1: datanode1 }
                        }

                        )
                    }
                })

            }).catch(async () => {
                await ManagerDatanode.findOne({ namenodeId: "123qwe" }).then(async (data) => {
                    const datanode1 = data.datanode1
                    if (datanode1.alive) {
                        datanode1.alive = false
                        await ManagerDatanode.updateOne({
                            "namenodeId": "123qwe"
                        }, {
                            $set: { datanode1: datanode1 }
                        }
                        )
                    }
                })
            })
    }, 3000)

}

export const getHeartBeatNameNode2 = () => {
    const endPointDatanode = process.env.DATANODE2
    setInterval(async () => {
        await axios.post(endPointDatanode)
            .then(async (res) => {
                const heartBeat = res.data
                console.log('dataheartdataNode2', heartBeat)
                await ManagerDatanode.findOne({ namenodeId: "123qwe" }).then(async (data) => {
                    const datanode2 = data.datanode2
                    if (!datanode2.alive) {
                        datanode2.alive = true
                        await ManagerDatanode.updateOne({
                            "namenodeId": "123qwe"
                        }, {
                            $set: { datanode2: datanode2 }
                        }

                        )
                    }
                })

            }).catch(async () => {
                await ManagerDatanode.findOne({ namenodeId: "123qwe" }).then(async (data) => {
                    const datanode2 = data.datanode2
                    if (datanode2.alive) {
                        datanode2.alive = false
                        await ManagerDatanode.updateOne({
                            "namenodeId": "123qwe"
                        }, {
                            $set: { datanode2: datanode2 }
                        }
                        )
                    }
                })
            })
    }, 3000)

}

export const getHeartBeatNameNode3 = () => {
    const endPointDatanode = process.env.DATANODE3
    setInterval(async () => {
        await axios.post(endPointDatanode)
            .then(async (res) => {
                const heartBeat = res.data
                console.log('dataheartdataNode3', heartBeat)
                await ManagerDatanode.findOne({ namenodeId: "123qwe" }).then(async (data) => {
                    // console.log(data)
                    const datanode3 = data.datanode3
                    // console.log(datanode1)
                    if (!datanode3.alive) {
                        datanode3.alive = true
                        await ManagerDatanode.updateOne({
                            "namenodeId": "123qwe"
                        }, {
                            $set: { datanode3: datanode3 }
                        }

                        )
                    }
                })

            }).catch(async () => {
                await ManagerDatanode.findOne({ namenodeId: "123qwe" }).then(async (data, err) => {
                    const datanode3 = data.datanode3
                    // console.log(data)
                    if (datanode3.alive) {
                        datanode3.alive = false
                        await ManagerDatanode.updateOne({
                            "namenodeId": "123qwe"
                        }, {
                            $set: { datanode3: datanode3 }
                        }
                        )
                    }
                })
            })
    }, 3000)

}
