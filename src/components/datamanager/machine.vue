<template>
    <div class="assemble_container">
        <el-dialog v-model="selectMachine" title="分配机器" width="500">
            <el-scrollbar>
                <div class="selectContent">
                    <el-radio-group v-model="selectDriver.Machine_license">
                        <p v-for="item in selectContent" :key="item" class="scrollbar-demo-item">
                            <el-card class="card">
                                <div
                                    style="width: 90%;height: 80%; display: flex;flex-direction:row;justify-content: space-around;align-items: space-around;flex-wrap: wrap;">
                                    <el-radio :value="item.license"></el-radio>
                                    <div class="card_content_image">
                                        <img :src="item.avator" alt=""
                                            style="width: 98%; height: 90%; border-radius: 10px;">
                                    </div>
                                    <div class="card_content">
                                        <div>
                                            <span class="title_header">车牌号:</span>
                                            <span class="item_body"> {{ item.license }}</span>
                                        </div>
                                        <div>
                                            <span class="title_header">状态:</span>
                                            <span class="item_body">
                                                <span v-if="!item.status" style="color: red;">工作中</span>
                                                <span v-if="item.status" style="color: green;">休息中</span>
                                            </span>
                                        </div>
                                        <div>
                                            <span class="title_header">类型:</span>
                                            <span class="item_body">{{ item.type }}</span>
                                        </div>
                                        <div>
                                            <span class="title_header">停放点:</span>
                                            <span class="item_body">{{ item.accumulation_name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </p>
                    </el-radio-group>
                    <p v-if="!content[0]">
                        <img src="/public/nomessage.png" alt="" style="width: 100%; height: 100%;">
                    </p>


                </div>
            </el-scrollbar>
            <template #footer>
                <div class="dialog-footer">
                    <el-button v-on:click="selectMachine = false">取消</el-button>
                    <el-button type="primary" v-on:click="successApplication">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="MachineApplication" title="新增机器" width="500">
            <el-form :model="form">
                <el-form-item label="类型" :label-width="'140px'">
                    <el-select v-model="form.type" placeholder="Please select a zone">
                        <el-option label="铲雪车" value="铲雪车" />
                        <el-option label="运雪车" value="运雪车" />
                    </el-select>
                </el-form-item>
                <el-form-item label="容量" :label-width="'140px'" v-if="form.type=='运雪车'">
                    <el-input v-model="form.capcity" autocomplete="off" />
                </el-form-item>
                <el-form-item label="聚集点" :label-width="'140px'">
                    <el-select v-model="form.accumulation" placeholder="Please select a zone">
                        <el-option v-for="item in assembleOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="照片" :label-width="'140px'">
                    <div class="image"><input type="file" id="image" v-on:change="filepreview(this)"></div>
                    <div><el-button type="primary" v-on:click="uploadAvator()" class="image_update">上传照片</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="" :label-width="'140px'">
                    <img :src="form.avator" alt="" class="images" id="show">
                </el-form-item>
                <el-form-item label="车牌号" :label-width="'140px'">
                    <el-input v-model="form.license" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="resetform">取消</el-button>
                    <el-button type="primary" @click="uploadMachine">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <div class="mapsite" id="mapsite">
        </div>
        <div class="assemblecontrols">
            <div class="sidebar">
                <el-radio-group v-model="pattern" size="small" text-color="#000" fill="#fff" default="control_tool"
                    style="margin: 5px 10px;border: 0.1px grey solid ;border-radius: 6px">
                    <el-radio-button label="司机管理" value="control_list" />
                    <el-radio-button label="车辆管理" value="control_tool" />
                </el-radio-group>
            </div>
            <div class="content">
                <div class="control_tool" v-if="pattern === 'control_tool'">
                    <div class="flex flex-wrap items-center selectmachine" style="margin: 10px 0;">
                        <div style="margin:0px 5px;">筛选:</div>
                        <el-select v-model="value1" placeholder="筛选模式" style="width: 32%; margin: 0 5px;" size="small"
                            @change="filter(value1)">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <el-select v-model="value2" :placeholder="placetext" style="width: 32%; margin:0 5px;"
                            filterable size="small" @change="Filtration(value2)" clearable>
                            <el-option v-for="item in options2" :key="item" :label="item" :value="item" />
                        </el-select>
                        <el-button type="primary" circle style="margin:0 5%;" color="skyblue"
                            @click="MachineApplication = true">
                            <svg t="1739091979822" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5583" width="24" height="24">
                                <path
                                    d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z"
                                    p-id="5584" fill="#ffffff"></path>
                            </svg>
                        </el-button>
                    </div>
                    <el-scrollbar>
                        <div>
                            <p v-for="item in content" :key="item" class="scrollbar-demo-item">
                                <el-card class="card">
                                    <div
                                        style="width: 90%;height: 80%; display: flex;flex-direction:row;justify-content: space-around;align-items: space-around;flex-wrap: wrap;">
                                        <div class="card_content_image">
                                            <img :src="item.avator" alt=""
                                                style="width: 98%; height: 90%; border-radius: 10px;">
                                        </div>
                                        <div class="card_content">
                                            <div>
                                                <span class="title_header">车牌号:</span>
                                                <span class="item_body"> {{ item.license }}</span>
                                            </div>
                                            <div>
                                                <span class="title_header">状态:</span>
                                                <span class="item_body">
                                                    <span v-if="item.status=='1'" style="color: red;">工作中</span>
                                                    <span v-if="item.status=='0'" style="color: green;">休息中</span>
                                                </span>
                                            </div>
                                            <div>
                                                <span class="title_header">类型:</span>
                                                <span class="item_body">{{ item.type }}</span>
                                            </div>
                                            <div>
                                                <span class="title_header">司机电话:</span>
                                                <span class="item_body">{{ item.driver }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-card>
                            </p>
                            <p v-if="!content[0]">
                                <img src="/public/nomessage.png" alt="" style="width: 100%; height: 100%;">
                            </p>
                        </div>
                    </el-scrollbar>

                </div>

                <div class="control_list" v-if="pattern === 'control_list'">
                    <div><span class="tool_title" style='font-size: 20px;'>图层管理</span></div>
                    <div class="layercontrol">
                        <el-checkbox v-model="assemble" label="聚集点" size="large" />
                        <el-checkbox v-model="pop" label="司机" size="large" />
                    </div>
                    <div style="width: 100%; height:80%">
                        <div><span class="tool_title" style='font-size: 20px;'>人员申请</span></div>
                        <el-scrollbar>
                            <div style="height: 100%;">
                                <p v-for="item, index in driverContent" :key="item" class="scrollbar-demo-item">
                                    <el-card class="card">
                                        <div
                                            style="width: 90%;height: 80%; display: flex;flex-direction:row;justify-content: space-around;align-items: space-around;flex-wrap: wrap;">
                                            <div class="card_content_image">
                                                <img :src="item.avator" alt=""
                                                    style="width: 80%; height: 90%; border-radius: 10px;">
                                            </div>
                                            <div class="card_content">
                                                <div>
                                                    <span class="title_header">申请类型:</span>
                                                    <span class="item_body"> {{ item.apply_type }}</span>
                                                </div>
                                                <div>
                                                    <span class="title_header">名字:</span>
                                                    <span class="item_body">{{ item.name }}</span>
                                                </div>
                                                <div>
                                                    <span class="title_header">驾照:</span>
                                                    <span class="item_body"><a :href="item.dirver_license"
                                                            target="_blank">查看图片</a></span>
                                                </div>
                                                <div>
                                                    <span class="title_header">司机电话:</span>
                                                    <span class="item_body">{{ item.username }}</span>
                                                </div>
                                                <div class="button_group">
                                                    <el-button type="primary" circle
                                                        v-on:click="LocationDriver(item, index)">
                                                        <svg t="1739685613419" class="icon" viewBox="0 0 1024 1024"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4189"
                                                            width="24" height="24">
                                                            <path
                                                                d="M504.448 519.552m-151.189333 0a151.189333 151.189333 0 1 0 302.378666 0 151.189333 151.189333 0 1 0-302.378666 0Z"
                                                                fill="#ffffff" p-id="4190"></path>
                                                            <path
                                                                d="M504.448 124.714667c-218.069333 0-394.858667 176.768-394.858667 394.837333s176.789333 394.858667 394.858667 394.858667 394.837333-176.789333 394.837333-394.858667S722.517333 124.714667 504.448 124.714667z m0 64c182.72 0 330.837333 148.117333 330.837333 330.837333s-148.117333 330.858667-330.837333 330.858667S173.589333 702.272 173.589333 519.552c0-182.72 148.138667-330.837333 330.858667-330.837333z"
                                                                fill="#ffffff" p-id="4191"></path>
                                                            <path
                                                                d="M519.552 10.666667a32 32 0 0 1 32 32v98.922666a32 32 0 1 1-64 0V42.666667a32 32 0 0 1 32-32zM519.552 850.410667a32 32 0 0 1 32 32V981.333333a32 32 0 0 1-64 0v-98.922666a32 32 0 0 1 32-32z"
                                                                fill="#ffffff" p-id="4192"></path>
                                                            <path
                                                                d="M10.666667 519.552a32 32 0 0 1 32-32h98.922666a32 32 0 1 1 0 64H42.666667a32 32 0 0 1-32-32zM850.410667 519.552a32 32 0 0 1 32-32H981.333333a32 32 0 0 1 0 64h-98.922666a32 32 0 0 1-32-32z"
                                                                fill="#ffffff" p-id="4193"></path>
                                                        </svg>
                                                    </el-button>
                                                    <el-button type="success" circle v-on:click="allocate(item)">
                                                        <svg t="1739687450671" class="icon" viewBox="0 0 1024 1024"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4199"
                                                            width="24px" height="24px">
                                                            <path
                                                                d="M511.36 691.84l-64 64-215.04-215.04 47.36-46.72 231.68 197.76z"
                                                                fill="#e6e6e6" p-id="4200"></path>
                                                            <path
                                                                d="M447.36 755.84l-64-64 419.2-381.44 44.8 45.44-400 400z"
                                                                fill="#e6e6e6" p-id="4201"></path>
                                                        </svg>
                                                    </el-button>
                                                    <el-button type="danger" circle v-on:click="strikeApply(item.username)">
                                                        <svg t="1739687491379" class="icon" viewBox="0 0 1024 1024"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5298"
                                                            width="24px" height="24px">
                                                            <path
                                                                d="M811.974537 862.529445c-13.094226 0-26.187429-4.994758-36.177967-14.985296l-600.670505-600.623433c-19.9821-19.980054-19.983123-52.376904-0.00307-72.357981 19.980054-19.9821 52.377928-19.983123 72.357981-0.00307l600.670505 600.623433c19.9821 19.980054 19.983123 52.376904 0.00307 72.357981C838.164013 857.532641 825.06774 862.529445 811.974537 862.529445z"
                                                                fill="#ffffff" p-id="5299"></path>
                                                            <path
                                                                d="M211.303009 862.529445c-13.096273 0-26.189476-4.995781-36.180014-14.987343-19.980054-19.981077-19.97903-52.377928 0.00307-72.357981l600.670505-600.623433c19.981077-19.980054 52.378951-19.978007 72.357981 0.00307 19.980054 19.981077 19.97903 52.377928-0.00307 72.357981l-600.670505 600.623433C237.491461 857.533664 224.396211 862.529445 211.303009 862.529445z"
                                                                fill="#ffffff" p-id="5300"></path>
                                                        </svg>
                                                    </el-button>

                                                </div>
                                            </div>
                                        </div>
                                    </el-card>

                                </p>
                                <p v-if="!driverContent[0]">
                                    <img src="/public/nomessage.png" alt="" style="width: 100%; height: 100%;">
                                </p>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="close">
                <el-button type="primary" style="position: relative; left:70%;margin: 10px;"
                    v-on:click="close()">关闭</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import { Check, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import WebMap from "@arcgis/core/WebMap.js";
import Graphic from "@arcgis/core/Graphic.js";
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import TileLayer from '@arcgis/core/layers/TileLayer'
import esriConfig from '@arcgis/core/Config'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Draw from "@arcgis/core/views/draw/Draw.js";
import axios from "axios";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import { render } from "vue";
import Locate from "@arcgis/core/widgets/Locate.js";
import { employeerender } from '../../js/render'
import Geometry from "@arcgis/core/geometry/Geometry.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Query from "@arcgis/core/rest/support/Query.js";
import Point from "@arcgis/core/geometry/Point.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import * as geometryService from "@arcgis/core/rest/geometryService.js";
import BufferParameters from "@arcgis/core/rest/support/BufferParameters.js";
import { toRaw } from "vue";
import { ElMessageBox } from 'element-plus'
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import { selectKey } from 'element-plus';
var map;
var view;

var graphicObj = {}

var assemble_layer;
var pop_layer;
export default {
    data() {
        return {
            selectMachine: false,
            form: {
                license: '',
                type: '',
                accumulation: '',
                avator: '/public/avator_defalut.png',
                capcity:'0',
            },
            MachineApplication: false,
            driverContent: [],
            content: [],
            assembleOptions: [],
            assemble: false,
            pop: false,
            pattern: 'control_list',
            map: null,
            value1: '全部',
            value2: '全部',
            options: [
                {
                    value: '全部',
                    label: '全部',
                },
                {
                    value: '地区',
                    label: '地区',
                },
                {
                    value: '类型',
                    label: '类型',
                },
                {
                    value: '状态',
                    label: '状态'
                },
                {
                    value: '车牌号',
                    label: '车牌号'
                },
            ],
            options2: ['全部'],
            placetext: '全部',
            selectDriver: {
                username: '',
                type: '',
                Machine_license: '0',
            },
            selectContent: ['宋体']
        }
    },

    mounted() {
        this.initmap()
    },
    methods: {
        strikeApply(username){
            var param = {username:username}
            axios.post('/api/map/failApplication', param).then(res => {
                    this.attainassemble()
                })
        },
        successApplication() {
            if (!this.selectDriver.Machine_license) {
                this.$message.error('请选择车辆进行分配')
                return
            } else {

                var param = { username: this.selectDriver.username, license: this.selectDriver.Machine_license }
                axios.post('/api/map/successApplication', param).then(res => {
                    this.selectMachine = false
                    this.attainassemble()
                    this.$message.success('请求分配车辆成功')
                })
            }
        },
        allocate(item) {
            this.selectDriver.username = item.username
            this.selectDriver.type = item.apply_type
            this.selectMachine = true
            this.selectDriver.Machine_license = 0

        },
        LocationDriver(item, index) {
            item = toRaw(item)
            if (!graphicObj[index]) {
                const point = { //点设置
                    type: "point",  //类型：点、线、面
                    longitude: item.geom.coordinates[0],  //经度
                    latitude: item.geom.coordinates[1] //纬度
                }
                const simpleMarkerSymbol = {  //点符号设置
                    type: "simple-marker",  //点符号类型(一般为SimpleMarkerSymbol, PictureMarkerSymbol 和 TextSymbol等)
                    color: '#00ccff',  //符号颜色
                    outline: {  //轮廓设置
                        color: [255, 255, 255], //轮廓颜色
                        width: 1  //轮廓宽度
                    }
                }
                const PointAtt = {
                    Name: item.name,
                    address: item.address,
                    username: item.username,
                    avator: item.avator
                };

                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    attributes: PointAtt,
                    popupTemplate: {
                        title: '名称',
                        content: ` <img src="{avator}" alt="" style="width: 100px; height: 120px;">
                        <div><b>姓名</b>:   {Name}</div>
                        <div><b>电话</b>:   {username}</div>
                        <div><b>家庭住址</b>:  {address}</div>
                        `
                    },
                });

                // Add the line graphic to the view's GraphicsLayer
                view.graphics.add(pointGraphic);
                view.goTo({
                    center: [item.geom.coordinates[0], item.geom.coordinates[1]],
                    zoom: 14
                }, {
                    duration: 2000
                })
                graphicObj[index] = pointGraphic
            } else {
                view.graphics.remove(graphicObj[index])
                delete graphicObj[index]
            }

        },
        uploadMachine() {
            var headimgurl = document.getElementById('image').files[0]
            var formData = new FormData()
            formData.append("license", this.form.license)
            formData.append("type", this.form.type)
            formData.append("avator", headimgurl)
            formData.append('accumulation_name', this.form.accumulation)
            if(this.form.type == '运雪车'){
                formData.append('capcity',this.form.capcity)
            }else{
                formData.append('capcity','0')
            }
            if (this.form.license && this.form.type && this.form.accumulation) {
                axios.post("/api/map/addMachine", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(res => {
                    this.$message.success('修改成功')
                    this.resetform()
                })
            } else {
                this.$message.error('有属性值为空')
            }

        },
        attainassemble() {
            //assembleOptions
            axios.get('/api/map/attainassemble').then(res => {
                let DataArr = []
                for (var i = 0; i < res.data.features.length; i++) {
                    DataArr.push({ label: res.data.features[i].properties.name, value: res.data.features[i].properties.name })
                }
                this.assembleOptions = DataArr
            })
            //driverContent获取
            axios.get('/api/map/attainApplication').then(res => {
                this.driverContent = res.data.data
            })
            //selectContent初始化,否则单选框的value不赋值会报错
            this.selectContent = []
        },
        Filtration() {
            if (!this.value2) return
            var param = { method: this.value1, value: this.value2 }

            switch (param.method) {
                case '全部':
                    param.method = 1
                    param.value = 1
                    break;
                case '地区':
                    if (param.value == '全部') {
                        param.method = 1
                        param.value = 1
                    } else {
                        param.method = 'area'
                        param.value = this.value2
                    }
                    break;
                case '类型':
                    param.method = 'type'
                    break;
                case '状态':
                    if (param.value == '工作中') {
                        param.method = 'status'
                        param.value = '1'
                    }
                    if (param.value == '休息中') {
                        param.method = 'status'
                        param.value = '0'
                    }
                    if (param.value == '未分配') {
                        param.method = 'driver'
                        param.value = '0'
                    }
                    if (param.value == '已分配') {
                        param.method = 'driver'
                        param.value = '!0'
                    }
                    break;
                case '车牌号':
                    param.method = 'license'
                    break;

            }
            axios.post('/api/map/filtration', param).then(res => {
                this.content = res.data.data
                console.log(res.data.data)
            })
        },
        filter(value) {
            switch (value) {
                case '全部':
                    this.options2 = ['全部']
                    break;
                case '地区':
                    this.options2 = ['全部', '南岗区', '道里区', '道外区', '香坊区', '呼兰区', '松北区', '阿城区', '双城区', '平房区',]
                    break;
                case '类型':
                    this.options2 = ['铲雪车', '运雪车']
                    break;
                case '状态':
                    this.options2 = ['工作中', '休息中', '未分配', '已分配',]
                    break;
                case '车牌号':
                    //发送axios请求请求数据
                    axios.get('/api/map/attainlicense').then(res => {
                        this.options2 = res.data.data
                    })
                    break;
            }
        },
        resetform() {
            this.MachineApplication = false
            this.form={
                license: '',
                type: '',
                accumulation: '',
                avator: '/public/avator_defalut.png',
                capcity:'0',
            },
            document.getElementById("image").value = "";
        },
        close() {
            this.$store.state.editscreen = null
        },
        uploadAvator() {
            var image = document.querySelector('#image')
            image.click()
        },
        filepreview(e) {
            var re = this
            var reads = new FileReader();
            var f = document.getElementById('image').files[0];
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                re.form.avator = this.result;

            }
        },
        initmap() {
            esriConfig.apiKey =
                "AAPK6c9f304833a84bf387317cb4eeba7146uZYZz8s72KAn-I9-ZWWXHFpQ4pX9a_zAcmVf9L1R_KAFWYclG9uH9ZV8mdyQa7fD";
            map = new Map({
                basemap: "arcgis/streets-night"

            });
            map = new Map({
                basemap: "arcgis-streets-night",
            })
            view = new MapView({
                center: [126.60, 45.72],
                zoom: 10,
                container: "mapsite",
                map: map,
            });
            this.map = map
            view.ui.components = []
            this.attainassemble()
            this.Filtration()
        }

    },
    watch: {
        selectMachine(newValue, oldvalue) {
            if (!newValue) return
            axios.post('/api/map/attainSelect', {
                type: this.selectDriver.type
            }).then(res => {
                this.selectContent = res.data.data
            })
        },
        assemble(newvalue, oldvalue) {
            if (newvalue) {
                assemble_layer = new GeoJSONLayer({
                    url: '/api/map/attainassemble',
                    outFields: ['*'],
                    fields: [{
                        name: "gid",
                        alias: "gid",
                        type: "oid"
                    }, {
                        name: "name",
                        alias: "name",
                        type: "string"
                    }],
                    popupTemplate: {
                        title: '名称',
                        content: ` {name} `
                    },
                    renderer: {
                        type: 'simple',
                        symbol: {
                            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                            width: "3px",
                            color: '#FFC125',

                        }
                    }
                });
                map.add(assemble_layer);
            } else {
                map.remove(assemble_layer)
                assemble_layer = null
            }
        },
        pop(newvalue, oldvalue) {
            if (newvalue) {
                try {
                    pop_layer = new GeoJSONLayer({
                        url: '/api/map/attaindriver',
                        outFields: ['*'],
                        fields: [{
                            name: "gid",
                            alias: "gid",
                            type: "oid"
                        }, {
                            name: "name",
                            alias: "name",
                            type: "string"
                        }, {
                            name: "telephone",
                            alias: "elephone",
                            type: "string"
                        },
                        {
                            name: "avator",
                            alias: "avator",
                            type: "string"
                        },
                        {
                            name: "groupid",
                            alias: "groupid",
                            type: "string"
                        },
                        {
                            name: "home",
                            alias: "home",
                            type: "string"
                        }
                        ],
                        popupTemplate: {
                            title: '名称',
                            content: ` <img src="http://127.0.0.1:8000/static{avator}" alt="" style="width: 100px; height: 120px;">
                        <div><b>姓名</b>:   {name}</div>
                        <div><b>电话</b>:   {telephone}</div>
                        <div><b>家庭住址</b>:  {home}</div>
                        `
                        },
                        renderer: {
                            type: 'simple',
                            symbol: {
                                type: "simple-marker",  //点符号类型(一般为SimpleMarkerSymbol, PictureMarkerSymbol 和 TextSymbol等)
                                color: '#00ccff',  //符号颜色
                                outline: {  //轮廓设置
                                    color: [255, 255, 255], //轮廓颜色
                                    width: 1  //轮廓宽度
                                }

                            }
                        }

                    });
                    map.add(pop_layer);
                }
                catch (error) {
                }

            } else {
                map.remove(pop_layer)
                pop_layer = null
            }
        },
    }
}

</script>
<style scoped>
.selectContent {
    max-height: 300px;
}

.item_body {
    font-family: 500;
    font-size: 12px;
    line-height: 12px;
}

.title_header {
    font-weight: 700;
    font-size: 16px;
    font-family: '宋体';
}

.card_content_image {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;


}

.card_content {
    flex: 1;
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

#show {
    width: 50px;
    height: 50px;
    margin: 0 10px;
}

.image_update {
    font-size: 12px;
    margin-left: -200%;
}

.image>input {
    opacity: 0;
    width: 10px;
}

.image {
    width: 50%;
    height: 100%;
    overflow: hidden;
}

:deep(.el-card__body) {
    width: 100%;
    height: 100%;
}

:deep(.el-select__wrapper) {
    background-color: white;
}

.select_pages {
    padding: 10px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 60%;
    z-index: 5;
    border-radius: 10px;


}

.list_item {
    font-size: 16px;
    font-family: '宋体';
    font-weight: 700;
    color: #2A2A28;
}

.visited {
    background-color: orange;
    box-shadow: 0px 0px 0 grey;
}

.control_item {
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    width: 20px;
    height: 20px;
    line-height: 20px;
    box-shadow: 1px 2px 0 grey;
    border-radius: 2px;
    margin-top: 10px;
}

.group_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.group {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;

}

.group_control {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.group_list {
    width: 100%;
    height: 80%;
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
}

.layercontrol {
    padding: 10px 20px;
    height: 30px;
    line-height: 30px;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.control_list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.input_container {
    height: 50px;
    width: 100%;
}

.draw_tools {
    margin: 5px 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    width: 20px;
    height: 20px;
    line-height: 20px;
    box-shadow: 1px 2px 0 grey;
    border-radius: 2px;
}

.draw_tools:hover {
    background-color: orange;
}

.visited {
    background-color: orange;
    box-shadow: 0px 0px 0 grey;
}

.content_container {
    margin-left: 10px;
    display: 1;
    width: 100%;

}

.tool_title {
    font-weight: 700;
    font-size: 16px;
    font-family: '楷体';

}

.control_tool {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.maincontent {
    margin: 10px;
    height: 80%;
    width: 93%;

}

#mapsite {
    border: none;
}

.mapsite {
    width: 70%;
    height: 100%;
    background-color: #2A2A28;
}

.assemblecontrols {
    width: 30%;
    height: 100%;
}

.content_one {
    font-family: '宋体';
    color: white;
    font-size: 18px;
    width: 90%;
    min-height: 150px;
    border-bottom: 1px solid white;
    margin: 2px 10px;
}

.content {
    width: 100%;
    height: 85%;
    overflow: auto;
}

.selectmachine {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
}

.search {
    background-color: black;
    margin: 10px;
    width: 200px;
    height: 24px;
    display: block;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.evaluate {
    position: absolute;
    right: 0vh;
    width: 20vw;
    height: 98vh;
    background-image: url(/8.png);
    background-size: 110% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    z-index: 3;
}



.title {
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-family: '宋体';
    display: inline-block;
    line-height: 36px;


}

.all {
    overflow: auto;
    height: 80vh;
}

.scrollbar-demo-item {
    width: 96%;
    border-radius: 10px;
    height: 200px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
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
    padding: 5px;
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-family: '宋体';
    display: inline-block;
    line-height: 36px;
    background-color: rgba(1, 1, 1, 0);
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

.one {
    background-color: #4d857c;
    left: -115px;
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
    background-color: #4d857c;
    left: -115px;
}

.navbar>:nth-child(2):hover~.border {
    background-color: orange;
    left: -80px;
}

.navbar>:nth-child(3):hover~.border {
    background-color: #00CCFF;
    left: -40px;
}

.navbar>*:hover {
    color: skyblue;
}
</style>