<template>
    <div class="snowarea_container">
        <div class="mapsite" id="mapsite">

        </div>
        <div class="snowareacontrols">
            <div class="sidebar">
                <el-radio-group v-model="pattern" size="small" text-color="#000" fill="#fff" default="control_tool"
                    style="margin: 5px 10px;border: 0.1px grey solid ;border-radius: 6px">
                    <el-radio-button label="管理页面" value="control_tool" />
                    <el-radio-button label="数据列表" value="control_list" />
                </el-radio-group>
            </div>
            <div class="content">
                <div class="control_tool" v-if="pattern === 'control_tool'">
                    <div class="content_container">
                        <span class="tool_title" style='font-size: 20px;'>基础功能</span>
                        <div style="display: flex; flex-direction: row; margin: 5px 10px;">
                            <div class="draw_tools" :class="this.toolstoggle == 'circle' ? 'visited' : ''"
                                v-on:click="tools('circle')">
                                <svg t="1717317287016" class="icon" viewBox="0 0 1194 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2232" width="20" height="20">
                                    <path
                                        d="M597.333333 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-914.2784A402.2784 402.2784 0 1 0 999.611733 512 402.2784 402.2784 0 0 0 597.333333 109.7216zM597.333333 768a256 256 0 1 1 256-256 256 256 0 0 1-256 256z m0-402.2784A146.2784 146.2784 0 1 0 743.611733 512 146.2784 146.2784 0 0 0 597.333333 365.7216z"
                                        fill="#333333" p-id="2233"></path>
                                </svg>
                            </div>

                            <div class="draw_tools" :class="this.toolstoggle == 'rectangle' ? 'visited' : ''"
                                v-on:click="tools('rectangle')">
                                <svg t="1717317331372" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3373" width="20" height="20">
                                    <path
                                        d="M273.9 168.3H739v37.1H273.9zM273.9 819.6H739v37.1H273.9zM165.812 740.898v-465.1h37.1v465.1zM821.11 740.896v-465.1h37.1v465.1z"
                                        fill="#2c2c2c" p-id="3374"></path>
                                    <path
                                        d="M184.7 66.2c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.5c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.7-37 82.7-82.7 82.7zM184.7 717.5c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.6c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.6-37 82.7-82.7 82.7zM840 717.5c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.6c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.6-37 82.7-82.7 82.7zM840 66.2c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.5c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.7-37 82.7-82.7 82.7z"
                                        fill="#2c2c2c" p-id="3375"></path>
                                </svg>
                            </div>

                            <div class="draw_tools" :class="this.toolstoggle == 'polygon' ? 'visited' : ''"
                                v-on:click="tools('polygon')">
                                <svg t="1717317366495" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4457" width="20" height="20">
                                    <path d="M512 624a112 112 0 1 0 0-224 112 112 0 0 0 0 224z" p-id="4458"></path>
                                </svg>
                            </div>

                        </div>
                        <span class="tool_title" style='font-size: 20px;'>辅助功能</span>
                        <div class="auxiliary">
                            <el-scrollbar height="100%"
                                style="font-size: 14px;font-weight: 700;font-family: '楷体'; border: 1px solid black;">
                                <div v-for="(item, index) in name" :key="item" v-on:click="selectanalydata(index)"
                                    style="width: 100%;height: 100%;" :class="selected(index) ? 'selected' : ''">
                                    {{ `${index + 1}-${item} ` }}</div>
                            </el-scrollbar>
                        </div>
                        <div class="analysefunction">
                            <el-button type="primary" style="flex: 1;"
                                v-on:click="processor('intersect')">相交</el-button>
                            <el-button type="primary" style="flex: 1;" v-on:click="processor('union')">合并</el-button>
                            <el-button type="primary" style="flex: 1;"
                                v-on:click="processor('difference')">交集取反</el-button>
                        </div>
                    </div>
                </div>
                <div class="control_list" v-if="pattern === 'control_list'">
                    <div><span class="tool_title" style='font-size: 20px;'>数据管理</span></div>
                    <div class="contents">
                        <el-scrollbar>
                            <el-collapse accordion :change="iseditable === false ? changefocus(activenames) : ''"
                                v-model="activenames">
                                <el-collapse-item :name="index" v-for="(item, index) in renderdata" :key="index">
                                    <template #title>
                                        <input type="text" name="password" class="input-item1" :disabled="isdisable"
                                            :value="`${index + 1}-${item}`" v-if="iseditable == false">
                                        <input type="text" name="password" class="input-item1" :disabled="isdisable"
                                            v-model="inputdata[index]" v-if="iseditable == true">
                                    </template>
                                    <div>
                                        <el-button type="primary" style="position: relative; left:48%;margin: 10px;"
                                            v-on:click="position_data(index)">
                                            <svg t="1717137740756" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="3226" width="20" height="20">
                                                <path
                                                    d="M504.448 519.552m-151.189333 0a151.189333 151.189333 0 1 0 302.378666 0 151.189333 151.189333 0 1 0-302.378666 0Z"
                                                    fill="#ffffff" p-id="3227"></path>
                                                <path
                                                    d="M504.448 124.714667c-218.069333 0-394.858667 176.768-394.858667 394.837333s176.789333 394.858667 394.858667 394.858667 394.837333-176.789333 394.837333-394.858667S722.517333 124.714667 504.448 124.714667z m0 64c182.72 0 330.837333 148.117333 330.837333 330.837333s-148.117333 330.858667-330.837333 330.858667S173.589333 702.272 173.589333 519.552c0-182.72 148.138667-330.837333 330.858667-330.837333z"
                                                    fill="#ffffff" p-id="3228"></path>
                                                <path
                                                    d="M519.552 10.666667a32 32 0 0 1 32 32v98.922666a32 32 0 1 1-64 0V42.666667a32 32 0 0 1 32-32zM519.552 850.410667a32 32 0 0 1 32 32V981.333333a32 32 0 0 1-64 0v-98.922666a32 32 0 0 1 32-32z"
                                                    fill="#ffffff" p-id="3229"></path>
                                                <path
                                                    d="M10.666667 519.552a32 32 0 0 1 32-32h98.922666a32 32 0 1 1 0 64H42.666667a32 32 0 0 1-32-32zM850.410667 519.552a32 32 0 0 1 32-32H981.333333a32 32 0 0 1 0 64h-98.922666a32 32 0 0 1-32-32z"
                                                    fill="#ffffff" p-id="3230"></path>
                                            </svg>
                                        </el-button>
                                        <el-button type="danger" style="position: relative; left:44%;margin: 10px;"
                                            v-on:click="deletedata(index)">删除</el-button>
                                        <el-button :type="this.iseditable == true ? 'primary' : 'success'"
                                            style="position: relative; left:40%;margin: 10px;"
                                            v-on:click="this.iseditable == true ? submitdata(index) : updatedata(index)">{{
                                                contenttitle }}</el-button>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="close">
                <el-button type="primary" style="position: relative; left:30%;margin: 10px;" v-on:click="cleardata()"
                    v-if="pattern === 'control_tool'">清空</el-button>
                <el-button type="primary" style="position: relative; left:30%;margin: 10px;" v-on:click='savedata()'
                    v-if="pattern === 'control_tool'">保存</el-button>
                <el-button type="primary" style="position: absolute; left:93%;margin: 10px;"
                    v-on:click="close()">关闭</el-button>
            </div>
        </div>

    </div>
</template>
<script>
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
import Point from "@arcgis/core/geometry/Point.js";
import Circle from "@arcgis/core/geometry/Circle.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import { toRaw } from "vue";
import * as geometryService from "@arcgis/core/rest/geometryService.js";
import { gcj02towgs84, wgs84togcj02, newgcj02towgs84 } from '../../js/transform'
var middle;
var map;
var view;
var res_layer
var renderdata = []
export default {
    data() {
        return {
            iseditable: false,
            contenttitle: '修改',
            isdisable: true,
            buffer: '',
            toolstoggle: '',
            pattern: 'control_tool',
            renderdata: [],
            inputdata: [],
            activenames: '',
            name: [],
            analysedata: [],
            data: [],
            uid: [],

        }
    },
    mounted() {
        this.initmap()
    },
    updated() {
        if (this.pattern === 'control_tool') {

        }
        else if (this.pattern === 'control_list') {
            this.renderdatas()
        }
    },
    methods: {
        processor(type) {
            var re = this
            if (this.analysedata.length < 2) {
                this.$message.error('分析所需图形数量不足,请选择两个')
                return
            }
            if (this.analysedata.length > 2) {
                this.$message.error('分析所需图形数量太多,请选择两个')
                return
            }
            const isIntersecting = geometryEngine.intersects(toRaw(this.analysedata[0]).geometry, toRaw(this.analysedata[1]).geometry);
            if (!isIntersecting) {
                this.$message.error('两个图形不相交,没有交集')
                return
            }
            var Geometry1 = toRaw(this.analysedata[0]).geometry
            var Geometry2 = toRaw(this.analysedata[1]).geometry
                switch (type) {
                    case 'intersect':
                        var geometry = geometryEngine.intersect(Geometry1, Geometry2);
                        break
                    case 'union':
                        const intersection = geometryEngine.intersect(Geometry1, Geometry2);
                        if (intersection) {
                            // 计算不相交的部分
                            const rectangleDiff = geometryEngine.difference(Geometry1, intersection);
                            const circleDiff = geometryEngine.difference(Geometry2, intersection);
                            // 合并所有部分
                            var geometry = geometryEngine.union([intersection, rectangleDiff, circleDiff]);
                            console.log(geometry);
                        }
                        break
                    case 'difference':
                        var geometry = geometryEngine.difference(Geometry1, Geometry2);
                        break

                }
            




            view.graphics.remove(toRaw(this.analysedata[0]))
            view.graphics.remove(toRaw(this.analysedata[1]))
            for (var i = 0; i < this.uid.length; i++) {
                if (this.analysedata[0].uid == this.uid[i]) {
                    this.uid.splice(i, 1)
                    this.name.splice(i, 1)
                    this.data.splice(i, 1)
                }
                if (this.analysedata[1].uid == this.uid[i]) {
                    this.uid.splice(i, 1)
                    this.name.splice(i, 1)
                    this.data.splice(i, 1)
                }
            }

            this.analysedata = []

            var res_data = new Graphic({
                geometry: geometry,
                symbol: {
                    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                    color: [51, 51, 204, 0.5],
                    style: "solid",
                    outline: {  // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            });
            // 将绘制的图形添加到view
            view.graphics.add(res_data);
            re.toolstoggle = ''
            re.data.push(res_data)
            console.log(res_data)
            geodecode(res_data.geometry.centroid, re)
            re.uid.push(res_data.uid)
            this.$message.success('图形处理成功')
        },
        selected(index) {
            for (var i = 0; i < this.analysedata.length; i++) {
                if (this.analysedata[i].uid == this.data[index].uid) {
                    return 1
                }
            }
            return 0
        },
        selectanalydata(index) {
            var middle_res = [];
            var ifrepeat = false
            if (this.analysedata[0] !== undefined) {
                for (var i = 0; i < this.analysedata.length; i++) {
                    if (this.analysedata[i].uid == this.data[index].uid) {
                        this.analysedata.splice(i, 0)
                        ifrepeat = true
                    } else {
                        middle_res.push(this.analysedata[i])
                    }

                }
                if (!ifrepeat) {
                    middle_res.push(this.data[index])
                }
                this.analysedata = middle_res

            } else {
                this.analysedata.push(this.data[index])
            }

        },
        position_data(index) {
            view.goTo({
                center: renderdata[index].geometry.coordinates,
                zoom: 14,
            },
                {
                    duration: 2000
                })
        },
        deletedata(index) {
            axios.post('/api/map/delsnowarea', { data: renderdata[index] }).then(res => {
                this.$message.success('数据删除成功')
                map.remove(res_layer)
                this.attaindata()
                this.renderdatas()
            })
        },
        changefocus(index) {
            this.isdisable = true
        },
        submitdata(index) {
            this.iseditable = false
            this.contenttitle = '修改'
            console.log(this.inputdata[index], renderdata[index], this.renderdata[index])
            this.renderdata[index] = this.inputdata[index]
            axios.post('/api/map/updatesnowarea', { data: renderdata[index], name: this.inputdata[index] }).then(res => {
                this.$message.success('数据更新成功')
                map.remove(res_layer)
                this.attaindata()
                this.renderdatas()
            })
        },
        updatedata(index) {
            this.iseditable = true
            this.contenttitle = '保存'
            this.isdisable = false
        },
        renderdatas() {
            axios.get('/api/map/attainsnowarea').then(res => {
                this.renderdata = []
                this.inputdata = []
                for (var i = 0; i < res.data.features.length; i++) {
                    this.renderdata.push(res.data.features[i].properties.name)
                    this.inputdata.push(res.data.features[i].properties.name)
                }
                renderdata = res.data.features
            })
        },
        createdata() {
            var params = {
                key: '275ccc01069ccdb142f46282d65100c3',
                position: `${this.position}`
            }

            axios.post(`/api/map/geodecode`, params).then(res => {
                var latlng = res.data.geocodes[0].location.split(',')
                view.goTo({
                    center: [Number(latlng[0]), Number(latlng[1])],
                    zoom: 14
                },
                    {
                        duration: 2000
                    });
                let point = {
                    type: "point",  // autocasts as new Point()
                    longitude: latlng[0],
                    latitude: latlng[1],
                    spatialReference: SpatialReference.WebMercator
                };
                var middle = new Graphic({
                    geometry: point,
                    symbol: {
                        type: 'picture-marker',
                        url: '/public/pop4.png',
                        size: '3px',
                    },
                });
                view.graphics.add(middle);
                this.name.push(this.position)
                this.data.push(webMercatorUtils.webMercatorToGeographic(middle).toJSON())
            })
        },
        attaindata() {
            res_layer = new GeoJSONLayer({
                url: '/api/map/attainsnowarea',
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
                    content: `{name}`
                },
                opacity: 0.5,
            });
            map.add(res_layer);

        },
        savedata() {
            if (this.data[0]) {
                var params = {
                    data: toRaw(this.data),
                    name: toRaw(this.name)
                }
                axios.post('/api/map/savesnowarea', params).then(res => {
                    console.log(res.data)
                    this.$message.success('数据保存成功')
                    view.graphics.removeAll();
                    this.data = []
                    this.name = []
                    map.remove(res_layer)
                    this.attaindata()

                })
            } else {
                this.$message.error('数据为空,请先设定数据')
            }
        },
        cleardata() {
            view.graphics.removeAll();
            this.toolstoggle = ''
            this.data = []
            this.name = []
            this.analysedata = []
            this.uid = []
        },
        tools(tool) {
            this.toolstoggle = tool
            let draw = new Draw({
                view: view
            });
            let action = draw.create(`${tool}`, { mode: "click" });
            var re = this
            switch (tool) {
                case 'circle':
                    action.on('cursor-update', function (evt) {
                        createcricle(evt.vertices)
                    })
                    action.on('draw-complete', function (evt) {
                        completecircle(evt.vertices, re)
                    })
                    action.on('vertex-add', function (evt) {
                        createcricle(evt.vertices)
                    })
                    break
                case 'rectangle':
                    action.on('cursor-update', function (evt) {
                        createrectangle(evt.vertices)
                    })
                    action.on('draw-complete', function (evt) {
                        completectangle(evt.vertices, re)
                    })
                    action.on('vertex-add', function (evt) {
                        createrectangle(evt.vertices)
                    })
                    break;
                case 'polygon':
                    action.on("vertex-add", function (evt) {
                        createPolygon(evt.vertices)
                    });
                    //顶点移除事件
                    action.on("vertex-remove", function (evt) {
                        createPolygon(evt.vertices)
                    });


                    // 鼠标移动事件
                    action.on("cursor-update", function (evt) {
                        createPolygon(evt.vertices)
                    });


                    // 绘制完成事件
                    action.on("draw-complete", function (evt) {
                        completePolygon(evt.vertices, re)
                    });
                    break;
                case 'point':
                    break
            }




        },
        close() {
            this.$store.state.editscreen = null
        },
        initmap() {
            esriConfig.apiKey =
                "AAPK6c9f304833a84bf387317cb4eeba7146uZYZz8s72KAn-I9-ZWWXHFpQ4pX9a_zAcmVf9L1R_KAFWYclG9uH9ZV8mdyQa7fD";
            map = new Map({
                basemap: "arcgis/streets-night"

            });
            map = new Map({
                basemap: "satellite" // 使用ArcGIS Online的影像底图",
            })
            view = new MapView({
                center: [126.60, 45.72],
                zoom: 10,
                container: "mapsite",
                map: map,
            });
            this.map = map
            view.ui.components = []
            this.attaindata()
        }
    }
}
function geodecode(position, re) {
    var res = wgs84togcj02(position.longitude, position.latitude)
    var params = {
        key: '275ccc01069ccdb142f46282d65100c3',
        location: `${res[0]},${res[1]}`
    }

    axios.post(`/api/map/geoencode`, params).then(res => {
        re.name.push(res.data.regeocode.formatted_address)
    })
}
function completecircle(events, re) {
    var vertices = events;
    //少于一个点无法展示圆
    if (vertices.length < 2) {
        return
    }
    //清除之前绘制
    view.graphics.remove(middle);
    //生成绘制的图形,两点画圆
    var center = new Point({
        hasZ: false,
        hasM: false,
        x: vertices[0][0],
        y: vertices[0][1],
        spatialReference: { wkid: 3857 }
    });
    var dis = center.distance(new Point({
        hasZ: false,
        hasM: false,
        x: vertices[1][0],
        y: vertices[1][1],
        spatialReference: { wkid: 3857 }
    }));
    var res_data = new Graphic({
        geometry: geometryEngine.buffer(center, dis, "meters"),
        // new Circle({
        //     hasZ: false,
        //     hasM: false,
        //     center: center,
        //     radius: dis,
        //     spatialReference: { wkid: 3857 }
        // }),
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    });
    // 将绘制的图形添加到view
    view.graphics.add(res_data);
    re.toolstoggle = ''
    re.data.push(res_data)
    geodecode(center, re)
    re.uid.push(res_data.uid)
}
function createcricle(events) {
    var vertices = events;
    //少于一个点无法展示圆
    if (vertices.length < 2) {
        return
    }
    //清除之前绘制
    view.graphics.remove(middle);
    //生成绘制的图形,两点画圆
    var center = new Point({
        hasZ: false,
        hasM: false,
        x: vertices[0][0],
        y: vertices[0][1],
        spatialReference: { wkid: 3857 }
    });
    var dis = center.distance(new Point({
        hasZ: false,
        hasM: false,
        x: vertices[1][0],
        y: vertices[1][1],
        spatialReference: { wkid: 3857 }
    }));
    middle = new Graphic({
        geometry: new Circle({
            hasZ: false,
            hasM: false,
            center: center,
            radius: dis,
            spatialReference: { wkid: 3857 }
        }),
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    });
    // 将绘制的图形添加到view
    view.graphics.add(middle);


}
function completectangle(events, re) {
    var vertices = events;
    //两点画矩形
    if (vertices.length < 2) {
        return
    }
    var rings = [vertices[0], [vertices[0][0], vertices[1][1]], vertices[1], [vertices[1][0], vertices[0][1]]];
    //清除之前绘制
    view.graphics.remove(middle);

    // 生成绘制的图形
    var res_data = new Graphic({
        geometry: new Polygon({
            hasZ: false,
            hasM: false,
            rings: [rings],
            spatialReference: { wkid: 3857 }
        }),
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    });
    // 将绘制的图形添加到view
    view.graphics.add(res_data);
    re.toolstoggle = ''
    re.data.push(res_data)
    geodecode(res_data.geometry.centroid, re)
    // var position = webMercatorUtils.webMercatorToGeographic(center)
    // geodecode(position)
    re.uid.push(res_data.uid)
}
function createrectangle(events) {
    var vertices = events;
    //两点画矩形
    if (vertices.length < 2) {
        return
    }
    var rings = [vertices[0], [vertices[0][0], vertices[1][1]], vertices[1], [vertices[1][0], vertices[0][1]]];
    //清除之前绘制
    view.graphics.remove(middle);

    // 生成绘制的图形
    middle = new Graphic({
        geometry: new Polygon({
            hasZ: false,
            hasM: false,
            rings: [rings],
            spatialReference: { wkid: 3857 }
        }),
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    });
    // 将绘制的图形添加到view
    view.graphics.add(middle);
}
function completePolygon(events, re) {
    //获取所有顶点
    var vertices = events;
    //清除之前绘制
    view.graphics.remove(middle);

    // 生成绘制的图形
    var res_data = new Graphic({
        geometry: new Polygon({
            hasZ: false,
            hasM: false,
            rings: [vertices],
            spatialReference: { wkid: 3857 }
        }),
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    });
    // 将绘制的图形添加到view
    view.graphics.add(res_data);
    re.toolstoggle = ''
    re.data.push(res_data)
    geodecode(res_data.geometry.centroid, re)
    re.uid.push(res_data.uid)
}
function createPolygon(events) {
    //获取所有顶点
    var vertices = events;
    //清除之前绘制
    view.graphics.remove(middle);

    // 生成绘制的图形
    middle = new Graphic({
        geometry: new Polygon({
            hasZ: false,
            hasM: false,
            rings: [vertices],
            spatialReference: { wkid: 3857 }
        }),
        symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.5],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    });
    // 将绘制的图形添加到view
    view.graphics.add(middle);
}

</script>
<style scoped>
.selected {
    background-color: #dd5a06;
}

.analysefunction {
    height: 50px;
    display: flex;
    flex-direction: row;
    margin: 10px 5px;
    width: 100%;
}

.auxiliary {
    display: flex;
    height: 50%;
    margin: 5px;
    width: 100%;
    flex-direction: column;
}

.input-item1 {
    position: relative;
    display: block;
    height: 100%100px;
    width: 100%;
    border: 0;
    font-size: 12px;
    outline: none;
    font-family: '宋体';
}

.contents {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    display: flex;
    flex-direction: column;

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

.input-item {
    position: relative;
    display: block;
    height: 50px;
    width: 100%;
    border: 0;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;

}

.draw_tools {
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
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.content {
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

.snowareacontrols {
    width: 30%;
    height: 100%;
}
</style>