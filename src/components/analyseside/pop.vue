<template>
    <div class="pop_container">
        <div class="title">
            <div style="display: inline-block;position: relative;top: -5px;">人口密度评价分析模块</div>
        </div>
        <div class="gridcontrol">
            <svg t="1712630190921" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2826" width="18" height="18">
                <path
                    d="M928 42.666667h-149.333333a53.393333 53.393333 0 0 0-53.333334 53.333333v149.333333a53.393333 53.393333 0 0 0 53.333334 53.333334h149.333333a53.393333 53.393333 0 0 0 53.333333-53.333334V96a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666667 202.666666a10.666667 10.666667 0 0 1-10.666667 10.666667h-149.333333a10.666667 10.666667 0 0 1-10.666667-10.666667V96a10.666667 10.666667 0 0 1 10.666667-10.666667h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666667zM586.666667 384H437.333333a53.393333 53.393333 0 0 0-53.333333 53.333333v149.333334a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333334a53.393333 53.393333 0 0 0 53.333333-53.333333V437.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666666 202.666667a10.666667 10.666667 0 0 1-10.666666 10.666666H437.333333a10.666667 10.666667 0 0 1-10.666666-10.666666V437.333333a10.666667 10.666667 0 0 1 10.666666-10.666666h149.333334a10.666667 10.666667 0 0 1 10.666666 10.666666z m330.666667-202.666667h-149.333333a53.393333 53.393333 0 0 0-53.333334 53.333333v149.333334a53.393333 53.393333 0 0 0 53.333334 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333333-53.333333V437.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666667 202.666667a10.666667 10.666667 0 0 1-10.666667 10.666666h-149.333333a10.666667 10.666667 0 0 1-10.666667-10.666666V437.333333a10.666667 10.666667 0 0 1 10.666667-10.666666h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666666zM245.333333 725.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333334-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333334-53.333334z m10.666667 202.666667a10.666667 10.666667 0 0 1-10.666667 10.666667H96a10.666667 10.666667 0 0 1-10.666667-10.666667v-149.333333a10.666667 10.666667 0 0 1 10.666667-10.666667h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666667z m672-202.666667h-149.333333a53.393333 53.393333 0 0 0-53.333334 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333334 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333333-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666667 202.666667a10.666667 10.666667 0 0 1-10.666667 10.666667h-149.333333a10.666667 10.666667 0 0 1-10.666667-10.666667v-149.333333a10.666667 10.666667 0 0 1 10.666667-10.666667h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666667z m-352-202.666667H437.333333a53.393333 53.393333 0 0 0-53.333333 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333334a53.393333 53.393333 0 0 0 53.333333-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666666 202.666667a10.666667 10.666667 0 0 1-10.666666 10.666667H437.333333a10.666667 10.666667 0 0 1-10.666666-10.666667v-149.333333a10.666667 10.666667 0 0 1 10.666666-10.666667h149.333334a10.666667 10.666667 0 0 1 10.666666 10.666667z"
                    fill="#fff" p-id="2827"></path>
            </svg>
            网格分析
        </div>
        <div class="control">
            <el-button v-on:click="attaindata()">{{ $store.state.button2 }}</el-button>
            <el-button v-on:click="creategrid()">构建格网</el-button>
            <el-button v-on:click="rendergrid()">计算格网</el-button>
            <el-button v-on:click="deletedata()">删除格网</el-button>
        </div>
        <div class="gridcontrol">
            <svg t="1712630190921" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2826" width="18" height="18">
                <path
                    d="M928 42.666667h-149.333333a53.393333 53.393333 0 0 0-53.333334 53.333333v149.333333a53.393333 53.393333 0 0 0 53.333334 53.333334h149.333333a53.393333 53.393333 0 0 0 53.333333-53.333334V96a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666667 202.666666a10.666667 10.666667 0 0 1-10.666667 10.666667h-149.333333a10.666667 10.666667 0 0 1-10.666667-10.666667V96a10.666667 10.666667 0 0 1 10.666667-10.666667h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666667zM586.666667 384H437.333333a53.393333 53.393333 0 0 0-53.333333 53.333333v149.333334a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333334a53.393333 53.393333 0 0 0 53.333333-53.333333V437.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666666 202.666667a10.666667 10.666667 0 0 1-10.666666 10.666666H437.333333a10.666667 10.666667 0 0 1-10.666666-10.666666V437.333333a10.666667 10.666667 0 0 1 10.666666-10.666666h149.333334a10.666667 10.666667 0 0 1 10.666666 10.666666z m330.666667-202.666667h-149.333333a53.393333 53.393333 0 0 0-53.333334 53.333333v149.333334a53.393333 53.393333 0 0 0 53.333334 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333333-53.333333V437.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666667 202.666667a10.666667 10.666667 0 0 1-10.666667 10.666666h-149.333333a10.666667 10.666667 0 0 1-10.666667-10.666666V437.333333a10.666667 10.666667 0 0 1 10.666667-10.666666h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666666zM245.333333 725.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333334-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333334-53.333334z m10.666667 202.666667a10.666667 10.666667 0 0 1-10.666667 10.666667H96a10.666667 10.666667 0 0 1-10.666667-10.666667v-149.333333a10.666667 10.666667 0 0 1 10.666667-10.666667h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666667z m672-202.666667h-149.333333a53.393333 53.393333 0 0 0-53.333334 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333334 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333333-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666667 202.666667a10.666667 10.666667 0 0 1-10.666667 10.666667h-149.333333a10.666667 10.666667 0 0 1-10.666667-10.666667v-149.333333a10.666667 10.666667 0 0 1 10.666667-10.666667h149.333333a10.666667 10.666667 0 0 1 10.666667 10.666667z m-352-202.666667H437.333333a53.393333 53.393333 0 0 0-53.333333 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333334a53.393333 53.393333 0 0 0 53.333333-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666666 202.666667a10.666667 10.666667 0 0 1-10.666666 10.666667H437.333333a10.666667 10.666667 0 0 1-10.666666-10.666667v-149.333333a10.666667 10.666667 0 0 1 10.666666-10.666667h149.333334a10.666667 10.666667 0 0 1 10.666666 10.666667z"
                    fill="#fff" p-id="2827"></path>
            </svg>
            划区选块分析
        </div>
        <div class="control">
            <el-button v-on:click="selectgrid()">选择区块</el-button>
            <el-button v-on:click="savegrid()" v-model="savetitle">{{ savetitle }}</el-button>
        </div>

    </div>
</template>
<script>

import Legend from "@arcgis/core/widgets/Legend.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { toRaw } from "vue";
import { poprender, gridfirstrender, griddensity } from "../../js/render";
import Query from "@arcgis/core/rest/support/Query.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import axios from 'axios';
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Point from "@arcgis/core/geometry/Point.js";
import { time } from 'echarts';
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import { map, view } from '../mapbody.vue'
var features;
var legend;
var grid;
var timelayer;
var polygonGraphic;
var rendergrid;
var savegrid;
var saveGraphic;
var savedata = []
var deletelist = []
export default {
    data() {
        return {
            mapExtentChange: null,
            mapselect: null,
            issave: false,
            savetitle: '保存区块',
        }
    },
    methods: {
        savegrid() {
            this.issave = !this.issave
            if (this.issave == true) {
                this.savetitle = '取消保存'
            } else {
                this.savetitle = '保存区块'
            }
        },
        selectgrid() {
            if (rendergrid == null) {
                this.$message.error('grid未渲染')
                return
            }
            if (this.$store.state.sumpeople) {
                this.$store.state.sumpeople = false
            }
            this.mapselect = view.on('click', async (e) => {
                if (this.mapExtentChange != null) {
                    this.mapExtentChange.remove();
                }
                var point;
                point = new Graphic({
                    geometry: new Point({
                        latitude: e.mapPoint.latitude,
                        longitude: e.mapPoint.longitude,
                    }),
                    symbol: new SimpleMarkerSymbol({
                        color: [255, 0, 0], // 红色
                        outline: {
                            color: [255, 255, 255], // 白色边框
                            width: 1
                        }
                    })
                })

                let query = new Query();
                query.geometry = point.geometry;
                query.spatialRelationship = 'envelope-intersects'
                query.returnGeometry = true
                query.outFields = ['*'];
                await rendergrid.queryFeatures(query)
                    .then(function (res) {
                        if (polygonGraphic !== undefined) {
                            view.graphics.remove(polygonGraphic);
                            timelayer.destroy()
                        }
                        saveGraphic = new Graphic({
                            geometry: res.features[0].geometry,
                            symbol: {
                                type: "simple-fill",  // autocasts as new SimpleMarkerSymbol()
                                color: [255, 255, 255, 0.5],
                                outline: {  // autocasts as new SimpleLineSymbol()
                                    color: 'grey',
                                    width: 0.5,
                                }
                            }
                        });
                        savegrid = new GraphicsLayer();
                        savegrid.graphics.add(saveGraphic);
                        deletelist.push(saveGraphic)
                        savedata.push(saveGraphic.geometry)
                        view.graphics.add(saveGraphic);
                    })


            })

        },
        creategrid() {
            grid = new GeoJSONLayer({
                url: "/api/map/creategrid",
                renderer: gridfirstrender,
            });
            map.add(grid);
        },
        rendergrid() {
            map.remove(features)
            this.$store.state.button2 = '加载数据'
            rendergrid = new GeoJSONLayer({
                url: '/api/map/rendergrid',
                outFields: ['*'],
                renderer: griddensity,
            });
            map.add(rendergrid);
            var point;
            this.mapExtentChange = view.on('click', async (e) => {
                //point = new Graphic(e.mapPoint, new SimpleMarkerSymbol())
                point = new Graphic({
                    geometry: new Point({
                        latitude: e.mapPoint.latitude,
                        longitude: e.mapPoint.longitude,
                    }),
                    symbol: new SimpleMarkerSymbol({
                        color: [255, 0, 0], // 红色
                        outline: {
                            color: [255, 255, 255], // 白色边框
                            width: 1
                        }
                    })
                })
                let query = new Query();
                query.geometry = point.geometry;
                query.spatialRelationship = 'envelope-intersects'
                query.returnGeometry = true
                query.outFields = ['*'];
                var middle = await rendergrid.queryFeatures(query)
                    .then(function (res) {
                        if (polygonGraphic !== undefined) {
                            if (res.features[0].geometry.centroid.x === polygonGraphic.geometry.centroid.x && res.features[0].geometry.centroid.y === polygonGraphic.geometry.centroid.y) {
                                return 1
                            } else {
                                view.graphics.remove(polygonGraphic);
                                timelayer.destroy()
                            }
                        }
                        console.log(res.features)
                        polygonGraphic = new Graphic({
                            geometry: res.features[0].geometry,
                            symbol: {
                                type: "simple-fill",  // autocasts as new SimpleMarkerSymbol()
                                color: [100, 149, 237, 0.5],
                                outline: {  // autocasts as new SimpleLineSymbol()
                                    color: 'grey',
                                    width: 0.5,

                                }
                            }
                        });
                        view.graphics.add(polygonGraphic);
                    })
                query.geometry = polygonGraphic.geometry
                query.spatialRelationship = 'contains'
                var renderdata;
                await features.queryFeatures(query)
                    .then(function (res) {
                        renderdata = res.features
                        var graphiclist = []
                        for (var i = 0; i < res.features.length; i++) {
                            var graphic = new Graphic({
                                geometry: res.features[i].geometry,
                                symbol: {
                                    type: 'simple-marker',
                                    color: 'white',
                                    size: 3,
                                }

                            })
                            graphiclist.push(graphic)
                        }
                        if (timelayer !== undefined && middle == 1) {
                            return
                        }
                        timelayer = new GraphicsLayer({
                            graphics: graphiclist,
                            outFields: ['*'],
                            fields: [
                                {
                                    name: 'gid',
                                    alias: 'gid',
                                    type: 'oid'
                                },
                                {
                                    name: 'people',
                                    alias: 'people',
                                    type: 'string'
                                },
                            ],
                            renderer: poprender
                        })
                        map.add(timelayer)
                    }).catch((error) => {
                        console.log(error)
                    })
                this.$store.state.renderdata = renderdata
                this.$store.state.sumpeople = false
                this.$nextTick(function () {
                    this.$store.state.sumpeople = true
                })

            })

        },
        deletedata() {
            if (this.issave == false) {
                view.graphics.item=[]
                for(var i=0;i<deletelist.length;i++){
                    view.graphics.remove(deletelist[i])
                }
                deletelist = []
              
            }
            if (this.mapExtentChange != null) {
                this.mapExtentChange.remove();
            }
            if (this.mapselect != null) {
                this.mapselect.remove();
            }
            if (this.$store.state.sumpeople = true) {
                this.$store.state.sumpeople = false
            }

            map.remove(features)
            map.remove(grid)
            map.remove(timelayer)
            map.remove(rendergrid)
            view.graphics.remove(polygonGraphic);
            polygonGraphic = undefined
            this.$store.commit('cleardata')
         
        },
        attaindata() {
            if (this.$store.state.button2 === '加载数据') {
                features = new FeatureLayer({
                    url: 'https://localhost:6443/arcgis/rest/services/project1/population/FeatureServer/1',
                    outFields: ['*'],
                    popupTemplate: {  // 开启 popup
                        title: "{gid}",
                        content: "{people}",
                        fields: [
                            {
                                name: 'gid',
                                alias: 'gid',
                                type: 'oid'
                            },
                            {
                                name: 'people',
                                alias: 'people',
                                type: 'string'
                            },
                        ],
                    },
                    renderer: poprender
                })
                map.add(features)
                this.$store.state.button2 = '删除数据'
                this.$message.success('数据获取成功')
            } else if (this.$store.state.button2 === '删除数据') {
                map.remove(features)
                this.$store.state.button2 = '加载数据'
            }
        }
    },
    unmounted() {
        if (this.issave == true) {
            this.$store.state.savedata = savedata
            savedata = []
        }

        if (this.mapExtentChange != null) {
            this.mapExtentChange.remove();
        }
        if (this.mapselect != null) {
            this.mapselect.remove();
        }
        rendergrid = null
    },
    mounted() {

    }
}
</script>
<style scoped>
.control>*:hover {
    background-color: #dd5a06;
    cursor: pointer;
    opacity: 1;
}

.gridcontrol {
    color: white;
    height: 30px;
    line-height: 30px;

}

.pop_container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;

}

.title {
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-family: '宋体';
    display: inline-block;
    line-height: 36px;
    color: white;

}

.control>* {
    background-color: rgb(0, 0, 0, 1);
    margin: 10px;
    font-size: 16px;
    font-weight: 800;
    color: white;

}

.el-button.el-button {
    margin-left: 0px;
}

.control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: start;
}
</style>