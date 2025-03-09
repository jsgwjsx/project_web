<template>
    <div class="assemble_container">
        <div class="mapsite" id="mapsite">

        </div>
        <div class="assemblecontrols">
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
                        <div class="draw_tools" :class="this.toolstoggle == 'point' ? 'visited' : ''"
                            v-on:click="tools('point')">
                            <svg t="1716961630072" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2128" width="20" height="20">
                                <path
                                    d="M512 512m-62.588477 0a62.588477 62.588477 0 1 0 125.176954 0 62.588477 62.588477 0 1 0-125.176954 0Z"
                                    p-id="2129"></path>
                                <path
                                    d="M512 788.856515c-73.951269 0-143.475715-28.798906-195.766662-81.089853-52.29197-52.29197-81.089853-121.815393-81.089853-195.766662s28.797883-143.475715 81.089853-195.766662c52.290947-52.29197 121.816416-81.089853 195.766662-81.089853s143.475715 28.797883 195.767686 81.089853c52.290947 52.290947 81.08883 121.816416 81.088829 195.766662 0 73.951269-28.798906 143.474692-81.088829 195.766662-52.29197 52.290947-121.81744 81.089853-195.767686 81.089853z m0-502.54772c-124.446313 0-225.691205 101.243869-225.691205 225.691205 0 124.447337 101.243869 225.691205 225.691205 225.691205s225.691205-101.243869 225.691205-225.691205c0-124.447337-101.244892-225.691205-225.691205-225.691205z"
                                    p-id="2130"></path>
                            </svg>
                        </div>
                        <div class="tool_title" style="margin-left: 12px;">地点:
                            <p style="height: 50px;">&emsp;&emsp;{{ locationname }}</p>
                        </div>
                        <div>
                            <el-button type="primary" style="position: relative; left:50%;margin: 10px;"
                                v-on:click="cleardata()">清空</el-button>
                            <el-button type="primary" style="position: relative; left:50%;margin: 10px;"
                                v-on:click='savedata()'>保存</el-button>
                        </div>
                        <span class="tool_title" style='font-size: 20px;'>辅助功能</span>
                        <input type="text" name="password" placeholder="请输入地址" class="input-item" v-model="position">
                        <div>
                            <el-button type="primary" style="position: relative; left:50%;margin: 10px;"
                                v-on:click="createdata()">生成</el-button>
                            <el-button type="primary" style="position: relative; left:50%;margin: 10px;"
                                v-on:click='savedata()'>保存</el-button>
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
                                            v-on:click="this.iseditable == true ? submitdata(index) : updatedata(index)">{{ contenttitle }}</el-button>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="close">
                <el-button type="primary" style="position: relative; left:74%;margin: 10px;"
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
import {gcj02towgs84,wgs84togcj02,newgcj02towgs84} from '../../js/transform'
import { collapseItemProps } from "element-plus";
import {} from '../../js/transform'
var map;
var view;
var data = [];
var name = [];
var res_layer
var renderdata = []
export default {
    data() {
        return {
            iseditable: false,
            contenttitle: '修改',
            isdisable: true,
            position: '',
            toolstoggle: '',
            pattern: 'control_tool',
            locationname: '',
            renderdata: [],
            inputdata: [],
            activenames: ''
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
            axios.post('/api/map/delassemble', { data: renderdata[index] }).then(res => {
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
            axios.post('/api/map/updateassemble', { data: renderdata[index], name: this.inputdata[index] }).then(res => {
                this.$message.success('数据更新成功')
            })
        },
        updatedata(index) {
            this.iseditable = true
            this.contenttitle = '保存'
            this.isdisable = false
        },
        renderdatas() {
            axios.get('/api/map/attainassemble').then(res => {
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
                var resdata = gcj02towgs84(Number(latlng[0]),Number(latlng[1]))
                view.goTo({
                    center: [Number(resdata[0]), Number(resdata[1])],
                    zoom: 14
                },
                    {
                        duration: 2000
                    });
                let point = {
                    type: "point",  // autocasts as new Point()
                    longitude: resdata[0],
                    latitude: resdata[1],
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
                name.push(this.position)
                data.push(webMercatorUtils.webMercatorToGeographic(middle).toJSON())
            })
        },
        attaindata() {
            res_layer = new GeoJSONLayer({
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
                    content: `{name}`
                },

            });
            map.add(res_layer);
        },
        savedata() {
            if (data[0]) {
                axios.post('/api/map/saveassemble', { data: data, name: name }).then(res => {
                    this.$message.success('数据保存成功')
                    view.graphics.removeAll();
                    data = []
                    name = []
                    map.remove(res_layer)
                    this.attaindata()

                })
            } else {
                this.$message.error('数据为空,请先设定数据')
            }
        },
        cleardata() {
            view.graphics.removeAll();
            data = []
            name = []
        },
        tools(tool) {
            this.toolstoggle = tool
            let draw = new Draw({
                view: view
            });
            let action = draw.create("point", { mode: "click" });
            var re = this
            action.on("draw-complete", function (evt) {
                createPointGraphic(evt.coordinates, re);
            });
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
                basemap:"arcgis-streets-night",
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

function createPointGraphic(coordinates, re) {
    let point = {
        type: "point", // autocasts as /Point
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: SpatialReference.WebMercator
    };
    var res = webMercatorUtils.webMercatorToGeographic(point)
    console.log(res.x,res.y)
    res = wgs84togcj02(res.x,res.y)

    var params = {
        key: '275ccc01069ccdb142f46282d65100c3',
        location: `${res[0]},${res[1]}`
    }
    var assemble = {
        type: "point", // autocasts as /Point
        x: res[0],
        y: res[1],
    };
    axios.post(`/api/map/geoencode`, params).then(res => {
        re.locationname = res.data.regeocode.formatted_address
        re.toolstoggle = null
        var middle = new Graphic({
            geometry: point,
            symbol: {
                type: 'picture-marker',
                url: '/public/pop4.png',
                size: '3px',
            },
        });
        name.push(res.data.regeocode.formatted_address)
        data.push(webMercatorUtils.webMercatorToGeographic(middle).toJSON())
        view.graphics.add(middle);
    })

}
</script>
<style scoped>
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

.assemblecontrols {
    width: 30%;
    height: 100%;
}
</style>