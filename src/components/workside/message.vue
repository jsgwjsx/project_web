<template>
    <div>
        <div class="header">
            <div class="title">任务模块</div>
        </div>
        <div class="navbar">
            <div v-on:click="styleset(1)">正进行</div>
            <div v-on:click="styleset(2)">已完成</div>
            <div class="border" :class="[isactive == 1 ? 'two' : '', isactive == 2 ? 'three' : '']"></div>
        </div>
        <div class="body">
            <div v-if="isprogressing" class="all">
                <el-scrollbar>
                    <p v-for="item, index in worklist" :key="item" class="scrollbar-demo-item">
                        <el-card class="card" v-on:click="selectItem = index">
                            <div
                                class="cards">
                                <div class="card_content_image">
                                    <img :src="item.avator" alt=""
                                        style="width: 100%; height: 100px; border-radius: 10px;">
                                </div>
                                <div class="card_content">
                                    <div>
                                        <span class="title_header">开始时间:</span>
                                        <span class="item_body"> {{ item.starttime }}</span>
                                    </div>
                                    <div>
                                        <span class="title_header">结束时间:</span>
                                        <span class="item_body">{{ item.endtime }}</span>
                                    </div>
                                    <div>
                                        <span class="title_header">负责人电话:</span>
                                        <span class="item_body">{{ item.tele }}</span>
                                    </div>
                                    <div>
                                        <span class="title_header">身份:</span>
                                        <span class="item_body">{{ item.grouperid.length>10?'司机':'组长' }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </p>
                </el-scrollbar>
            </div>
            <div v-if="iscomputed" class="all">
                <el-scrollbar>
                    <p v-for="item, index in worklist" :key="item" class="scrollbar-demo-item">
                        <el-card class="card" v-on:click="workconfirm(item.workid,item.grouperid,item.work_avator,index)">
                            <div
                                style="width: 100%;height: 80%; display: flex;flex-direction:row;justify-content:center;align-items: center;flex-wrap: wrap;">
                                <div class="card_content_image">
                                    <img :src="item.avator" alt=""
                                        style="width: 100%; height: 100px; border-radius: 10px;">
                                </div>
                                <div class="card_content">
                                    <div>
                                        <span class="title_header">结束时间:</span>
                                        <span class="item_body">{{ item.endtime }}</span>
                                    </div>
                                    <div>
                                        <span class="title_header">完成时间:</span>
                                        <span class="item_body">{{ item.computedtime }}</span>
                                    </div>
                                    <div>
                                        <span class="title_header">负责人电话:</span>
                                        <span class="item_body">{{ item.tele }}</span>
                                    </div>
                                    <div>
                                        <span class="title_header">身份:</span>
                                        <span class="item_body">{{ item.grouperid.length>10?'司机':'组长' }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </p>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
import { map, view } from '../mapbody.vue'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import axios from 'axios';
import Graphic from '@arcgis/core/Graphic';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import { bodyrender, statesLabelClass } from '../../js/render'
import Legend from "@arcgis/core/widgets/Legend.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Query from "@arcgis/core/rest/support/Query.js";
import Draw from "@arcgis/core/views/draw/Draw.js";
import Point from "@arcgis/core/geometry/Point.js";
import Circle from "@arcgis/core/geometry/Circle.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import * as turf from '@turf/turf';
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import Workconfirm from '../render/workconfirm.vue';
var socket
var intervalpos

var MachineLayer
var timelayer
export default {
    data() {
        return {
            selectItem: '',
            isprogressing: true,
            iscomputed: false,
            isactive: 1,
            worklist: [],
            Machine_licenselist: []
        }
    },
    watch: {
        "$store.state.workconfirm"(newVal){
            if(!newVal){
                this.worklistAttain(this.isactive)
                timelayer?map.remove(timelayer):''
            }
        },
        selectItem(newVal) {
            if (newVal + 1) {
                if (timelayer) {
                    map.remove(timelayer)
                }
                var data = this.worklist[newVal].geom
                var dataurl = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }))
                timelayer = new GeoJSONLayer({
                    url: dataurl,
                    renderer: new SimpleRenderer({
                        symbol: {
                            type: 'simple-line',
                            color: '#31c941',
                            width: '5px',
                        },
                    })

                })
                map.add(timelayer)
            } else {
                //删除图层
                map.remove(timelayer)
            }
        }
    },
    mounted() {
        //这个模块包括两个部分
        //一部分是对work以及workmachine完成情况的确认
        //另一部分是对车辆的实时定位显示
        // var socket = new WebSocket('ws://127.0.0.1:8000/ws/test/123123')
        this.Machinelocation()
        this.worklistAttain(this.isactive)
    },
    unmounted() {
        //客户端主动断开websocket连接
        socket.close()
        this.$message.error('断开连接')
        clearInterval(intervalpos)
        MachineLayer ? map.remove(MachineLayer) : ''
        this.selectItem = -1
        timelayer?map.remove(timelayer):''
    },
    methods: {
        workconfirm(workid,identity,avator,index){
            identity.length>10?identity = 'workmachine':identity='work'
            this.selectItem = index
            this.$store.state.workconfirm = true
            this.$store.state.workconfirm_data = {
                workid:workid,
                identity:identity,
                avator:avator
            }
        },
        async processData(dataArr) {
            for (var i = 0; i < dataArr.length; i++) {
                dataArr[i].endtime = processtime(dataArr[i].endtime * 1000)
                dataArr[i].starttime = processtime(dataArr[i].starttime * 1000)
                dataArr[i].computedtime ? dataArr[i].computedtime = processtime(dataArr[i].computedtime * 1000) : ''
            }
            this.worklist = dataArr
        },
        worklistAttain(status) {
            //type为1时，是正进行的
            //type为2时，是已经完成准备批阅的
            axios.post('/api/map/filterwork', { status: status }).then(res => {
                this.processData(res.data.data)
            })

        },
        Machinelocation() {
            socket = new WebSocket('ws://127.0.0.1:8000/ws/geolocation/pcadmin')
            socket.onopen = (events) => {
                //握手成功后的回调函数
                this.$message.success('连接成功')
            }
            socket.onmessage = (events) => {
                if (JSON.parse(events.data).types == 'close') {
                    this.Machine_licenselist = this.Machine_licenselist.filter(item => item.license != JSON.parse(events.data).license)
                    return
                }
                console.log(JSON.parse(events.data))
                // 服务器发送消息后的回调函数
                var index = this.Machine_licenselist.findIndex(item => item.license === JSON.parse(events.data).license)
                if (index !== -1) {
                    //有的话就更新
                    this.Machine_licenselist[index] = JSON.parse(events.data)
                } else {
                    //没有就添加
                    this.Machine_licenselist.push(JSON.parse(events.data))
                }
            }
            var re = this
            //设计一个延迟2s的函数每一次回调获取到
            intervalpos = setInterval(function () {
                //整体进行整合并更新
                if (!MachineLayer) {
                    MachineLayer = new GraphicsLayer()
                    map.add(MachineLayer)
                } else {
                    updatePoints(re.Machine_licenselist)
                }
            }, 2000)

        },
        styleset(e) {
            this.selectItem = -1
            this.isactive = e
            this.worklistAttain(e)
            if (e == 1) {
                this.isprogressing = true,
                    this.iscomputed = false
            } else if (e == 2) {
                this.isprogressing = false,
                    this.iscomputed = true
            }
        },

    }
}

function processtime(timestamp) {
    const date = new Date(timestamp);
    // 转换为本地时间字符串
    // 获取年、月、日
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(date.getDate()).padStart(2, '0');

    // 返回格式化的日期字符串
    return `${year}-${month}-${day}`;
}
// 6. 更新所有点的经纬度坐标
function updatePoints(newPoints) {

    // 获取 GraphicsLayer 中的所有图形
    const graphics = MachineLayer.graphics.toArray();
    if (!graphics.length && newPoints.length) {
        //graphics为0，且newPoints.length>0
        //直接添加
        addPoints(newPoints)
        return
    }

    var { onlyInArr1, inBothArr1AndArr2, onlyInArr2 } = judgecondinaction(newPoints, graphics)
    onlyInArr2.length ? deleteGraphic(onlyInArr2) : ''
    onlyInArr1.length ? addPoints(onlyInArr1) : ''
    inBothArr1AndArr2.length ? updatepos(inBothArr1AndArr2) : ''
}
function judgecondinaction(arr1, arr2) {
    //三种情况，一种是graphic在arr1不再arr2中，此时要return [arr2index,'add']
    //二种是point在arr1，在arr2中，此时要return [arr2index,‘update']
    //三种是point不再arr1，在arr2中，此时要 return [arr2index,'delete',],在这里无法赘述,因为point一定在arr1中
    // 用于存储三种情况的数组
    const onlyInArr1 = []; // 情况 1：只在 arr1 中
    const inBothArr1AndArr2 = []; // 情况 2：同时在 arr1 和 arr2 中
    const onlyInArr2 = []; // 情况 3：只在 arr2 中

    // 遍历 arr1
    arr1.forEach(item1 => {
        // 检查当前对象是否在 arr2 中
        const foundInArr2 = arr2.find(item2 => item2.attributes.license === item1.license);
        if (foundInArr2) {
            // 情况 2：对象同时存在于 arr1 和 arr2 中
            inBothArr1AndArr2.push(item1);
        } else {
            // 情况 1：对象只在 arr1 中
            onlyInArr1.push(item1);
        }
    });
    // 遍历 arr2
    arr2.forEach(item2 => {
        // 检查当前对象是否在 arr1 中
        const foundInArr1 = arr1.find(item1 => item1.license === item2.attributes.license);
        if (!foundInArr1) {
            // 情况 3：对象只在 arr2 中
            onlyInArr2.push(item2);
        }
    });
    return {
        onlyInArr1,
        inBothArr1AndArr2,
        onlyInArr2
    }

}

function deleteGraphic(graphics) {
    graphics.forEach(graphic => {
        MachineLayer.remove(graphic)
    })
}
function updatepos(newPoints) {
    newPoints.forEach(point => {
        var graphic = MachineLayer.graphics.find(item => item.attributes.license === point.license)
        graphic.geometry = new Point({
            longitude: point.position[0],
            latitude: point.position[1],
        });
    })
}

function addPoints(newPoints) {
    newPoints.forEach(point => {
        const pointGraphic = new Graphic({
            geometry: {
                type: "point",
                longitude: point.position[0],
                latitude: point.position[1]
            },
            symbol: {
                type: "simple-marker",
                color: [226, 119, 40],  // 橙色
                outline: {
                    color: [255, 255, 255],  // 白色
                    width: 1
                }
            },
            attributes: {
                license: point.license
            },
            popupTemplate: {
                title: "车牌号",
                content: "{license}"
            }
        });

        // 将点图形添加到图形图层
        MachineLayer.add(pointGraphic);
    })

}
</script>
<style scoped>
.cards{
    width: 100%;
    height: 80%; 
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;   
    background-color: rgba(255, 255, 255, 0);

}
.selectContent {
    max-height: 100px;
}

.item_body {
    font-family: 500;
    font-size: 10px;
    line-height: 10px;

}

.title_header {
    font-weight: 700;
    font-size: 12px;
    font-family: '宋体';
}

.card_content_image {
    flex: 2;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;

}

.card_content {
    padding: 0px 5px;
    flex: 4;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: flex-start;
}

.card {
    width: 98%;
    height: 98%;
 
}

.all {
    overflow: auto;
    height: 80vh;
}
:deep(.el-card){
    background-color:rgba(255, 255, 255,0) !important;
}
:deep(.el-card__body) {
    width: calc(100%-8px);
    padding: 5px;
    background-color:rgba(1, 138, 255, 0.3);
    cursor: pointer;
    border: none;
    color: white;

}

:deep(.el-card__body):hover {
    width: calc(100%-10px);
    padding: 5px;
    background-color:rgba(100, 255, 255, 0.0);
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    margin: 10px 5px;
    text-align: center;
    border-radius: 4px;
    color: var(--el-color-primary);

}

.scrollbar-demo-item:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    margin: 10px 5px;
    text-align: center;
    border-radius: 4px;
    background: #dd5a06;
    color: var(--el-color-primary);

}

.border {
    position: relative;
    background-color: black;
    height: 2px;
    width: 30px;
    top: 19px;
    left: -115px;
    transition: 0.5s;

}

.title {
    display: inline-block;
    position: relative;

}

.header {
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-family: '宋体';
    display: inline-block;
    line-height: 36px;
    color: white;
}

.navbar {
    font-size: 10px;
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: start;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
}

.navbar>* {
    margin: 2px 5px;
    box-sizing: content-box;
    cursor: pointer;
}


.two {
    background-color: orange;
    left: -80px;
}

.three {
    background-color: #00CCFF;
    left: -40px;
}

.navbar>:nth-child(1):hover~.border {
    background-color: orange;
    left: -80px;
}

.navbar>:nth-child(2):hover~.border {
    background-color: #00CCFF;
    left: -40px;
}

.navbar>*:hover {
    color: skyblue;
}
</style>