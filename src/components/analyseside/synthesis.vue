<template>
    <div class="pop_container">
        <div class="title">
            <div style="display: inline-block;position: relative;top: -5px;">道路综合评价分析模块</div>
        </div>
        <div class="gridcontrol">
            <svg t="1713172210648" class="icon" viewBox="0 0 1080 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2311" width="18" height="18">
                <path
                    d="M539.306667 0c11.377778 0 20.48 9.216 20.48 20.707556v43.747555h401.863111c11.377778 0 20.423111 9.159111 20.423111 20.707556V669.582222h49.948444c11.377778 0 20.423111 9.216 20.423111 20.707556v121.969778c-2.275556 11.491556-11.377778 20.707556-22.755555 20.707555h-301.226667l126.464 158.72c6.826667 9.272889 4.551111 20.764444-2.275555 27.648a31.857778 31.857778 0 0 1-13.653334 4.608 20.48 20.48 0 0 1-15.928889-6.883555l-144.384-184.092445H406.812444l-142.222222 184.092445c-4.551111 4.551111-11.377778 6.883556-15.928889 6.883555-4.551111 0-9.102222-2.275556-11.377777-4.551111-9.045333-6.940444-9.045333-18.432-2.275556-27.648l122.766222-158.776889H48.867556a20.48 20.48 0 0 1-20.423112-20.536889v-122.140444a20.48 20.48 0 0 1 20.48-20.707556h36.295112V85.162667a20.48 20.48 0 0 1 20.423111-20.707556h413.240889V20.707556A20.48 20.48 0 0 1 539.306667 0zM96.426667 711.054222h-29.411556v82.830222h326.712889a17.806222 17.806222 0 0 1 5.859556 0h609.735111V711.111111H114.858667a20.138667 20.138667 0 0 1-9.216 2.275556 20.081778 20.081778 0 0 1-9.216-2.275556zM941.226667 105.813333H126.008889v563.768889h815.104V105.813333zM829.44 208.099556c35.498667 0 64.284444 29.184 64.284444 65.137777 0 36.010667-28.785778 65.194667-64.284444 65.194667-11.377778 0-22.072889-3.015111-31.345778-8.248889l-99.555555 100.920889c5.12 9.386667 8.135111 20.195556 8.135111 31.744 0 36.010667-28.842667 65.194667-64.284445 65.194667-35.555556 0-64.341333-29.184-64.341333-65.194667 0-7.395556 1.137778-14.449778 3.413333-21.048889L479.573333 364.430222a63.772444 63.772444 0 0 1-70.314666 17.294222L300.657778 501.76c5.347556 9.500444 8.419556 20.48 8.419555 32.199111 0 36.010667-28.785778 65.194667-64.284444 65.194667-35.555556 0-64.341333-29.184-64.341333-65.194667 0-36.010667 28.785778-65.137778 64.284444-65.137778 11.207111 0 21.674667 2.844444 30.833778 7.964445l105.301333-116.394667a65.422222 65.422222 0 0 1-13.312-39.708444c0-36.010667 28.785778-65.194667 64.284445-65.194667a64.739556 64.739556 0 0 1 63.374222 76.344889l106.268444 80.725333a63.544889 63.544889 0 0 1 72.248889-6.599111l99.555556-100.977778a65.592889 65.592889 0 0 1-8.192-31.744c0-35.953778 28.785778-65.137778 64.284444-65.137777zM244.792889 504.32a29.411556 29.411556 0 0 0-29.240889 29.639111c0 16.384 13.084444 29.639111 29.240889 29.639111a29.411556 29.411556 0 0 0 29.184-29.582222c0-16.384-13.084444-29.696-29.184-29.696z m397.539555-71.111111a29.411556 29.411556 0 0 0-29.240888 29.639111c0 16.384 13.084444 29.639111 29.240888 29.639111a29.411556 29.411556 0 0 0 29.240889-29.582222c0-16.384-13.084444-29.639111-29.240889-29.639111z m-210.488888-142.222222a29.411556 29.411556 0 0 0-29.240889 29.696c0 16.327111 13.084444 29.582222 29.240889 29.582222a29.411556 29.411556 0 0 0 29.240888-29.582222c0-16.384-13.084444-29.639111-29.240888-29.639111z m397.596444-47.388445a29.411556 29.411556 0 0 0-29.240889 29.639111c0 16.384 13.084444 29.639111 29.240889 29.639111a29.411556 29.411556 0 0 0 29.240889-29.582222c0-16.384-13.084444-29.696-29.240889-29.696z"
                    fill="#fff" p-id="2312"></path>
            </svg>
            舆情分析辅助
        </div>
        <div class="control">
            <el-button v-on:click="evaluate()">群众反馈</el-button>
            <el-button plain @click="open">加载词云</el-button>
        </div>
        <div class="gridcontrol">
            <svg t="1713172210648" class="icon" viewBox="0 0 1080 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2311" width="18" height="18">
                <path
                    d="M539.306667 0c11.377778 0 20.48 9.216 20.48 20.707556v43.747555h401.863111c11.377778 0 20.423111 9.159111 20.423111 20.707556V669.582222h49.948444c11.377778 0 20.423111 9.216 20.423111 20.707556v121.969778c-2.275556 11.491556-11.377778 20.707556-22.755555 20.707555h-301.226667l126.464 158.72c6.826667 9.272889 4.551111 20.764444-2.275555 27.648a31.857778 31.857778 0 0 1-13.653334 4.608 20.48 20.48 0 0 1-15.928889-6.883555l-144.384-184.092445H406.812444l-142.222222 184.092445c-4.551111 4.551111-11.377778 6.883556-15.928889 6.883555-4.551111 0-9.102222-2.275556-11.377777-4.551111-9.045333-6.940444-9.045333-18.432-2.275556-27.648l122.766222-158.776889H48.867556a20.48 20.48 0 0 1-20.423112-20.536889v-122.140444a20.48 20.48 0 0 1 20.48-20.707556h36.295112V85.162667a20.48 20.48 0 0 1 20.423111-20.707556h413.240889V20.707556A20.48 20.48 0 0 1 539.306667 0zM96.426667 711.054222h-29.411556v82.830222h326.712889a17.806222 17.806222 0 0 1 5.859556 0h609.735111V711.111111H114.858667a20.138667 20.138667 0 0 1-9.216 2.275556 20.081778 20.081778 0 0 1-9.216-2.275556zM941.226667 105.813333H126.008889v563.768889h815.104V105.813333zM829.44 208.099556c35.498667 0 64.284444 29.184 64.284444 65.137777 0 36.010667-28.785778 65.194667-64.284444 65.194667-11.377778 0-22.072889-3.015111-31.345778-8.248889l-99.555555 100.920889c5.12 9.386667 8.135111 20.195556 8.135111 31.744 0 36.010667-28.842667 65.194667-64.284445 65.194667-35.555556 0-64.341333-29.184-64.341333-65.194667 0-7.395556 1.137778-14.449778 3.413333-21.048889L479.573333 364.430222a63.772444 63.772444 0 0 1-70.314666 17.294222L300.657778 501.76c5.347556 9.500444 8.419556 20.48 8.419555 32.199111 0 36.010667-28.785778 65.194667-64.284444 65.194667-35.555556 0-64.341333-29.184-64.341333-65.194667 0-36.010667 28.785778-65.137778 64.284444-65.137778 11.207111 0 21.674667 2.844444 30.833778 7.964445l105.301333-116.394667a65.422222 65.422222 0 0 1-13.312-39.708444c0-36.010667 28.785778-65.194667 64.284445-65.194667a64.739556 64.739556 0 0 1 63.374222 76.344889l106.268444 80.725333a63.544889 63.544889 0 0 1 72.248889-6.599111l99.555556-100.977778a65.592889 65.592889 0 0 1-8.192-31.744c0-35.953778 28.785778-65.137778 64.284444-65.137777zM244.792889 504.32a29.411556 29.411556 0 0 0-29.240889 29.639111c0 16.384 13.084444 29.639111 29.240889 29.639111a29.411556 29.411556 0 0 0 29.184-29.582222c0-16.384-13.084444-29.696-29.184-29.696z m397.539555-71.111111a29.411556 29.411556 0 0 0-29.240888 29.639111c0 16.384 13.084444 29.639111 29.240888 29.639111a29.411556 29.411556 0 0 0 29.240889-29.582222c0-16.384-13.084444-29.639111-29.240889-29.639111z m-210.488888-142.222222a29.411556 29.411556 0 0 0-29.240889 29.696c0 16.327111 13.084444 29.582222 29.240889 29.582222a29.411556 29.411556 0 0 0 29.240888-29.582222c0-16.384-13.084444-29.639111-29.240888-29.639111z m397.596444-47.388445a29.411556 29.411556 0 0 0-29.240889 29.639111c0 16.384 13.084444 29.639111 29.240889 29.639111a29.411556 29.411556 0 0 0 29.240889-29.582222c0-16.384-13.084444-29.696-29.240889-29.696z"
                    fill="#fff" p-id="2312"></path>
            </svg>
            道路综合分析
        </div>
        <div class="controls">
            <el-button v-on:click="attaindata()" class="analyses">{{ $store.state.button1 }}</el-button>

            <div class="bufferset">
                <div style="width: 80px;height: 26px;line-height: 26px;margin: 5px;">缓冲区/m:</div><el-slider
                    v-model="value" :max="200" />
            </div>
            <el-button v-on:click="attainpoi()" style="" class="analyses">{{ $store.state.button3 }}</el-button>
            <el-button v-on:click="analyses()" style="" class="analyses">综合分析</el-button>
        </div>
        <div class="controls">

        </div>

    </div>
</template>
<script>
import { toRaw } from 'vue'
import { ElMessageBox } from 'element-plus'
import axios from 'axios';
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Query from "@arcgis/core/rest/support/Query.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import { gridrender, synthesis } from '../../js/render';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import { Axis } from 'echarts';
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import { map, view } from '../mapbody.vue'
import { poirender } from '../../js/render';
import Point from "@arcgis/core/geometry/Point.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
var features;
var savedata;
var timelayer;
var timelayer1;
var timelayer2;
var timelayer3;
var analydata;
var feature;
var res_layer;
var synthesisrender;
var geo;
var poi_layer;
var legend;
export default {
    data() {
        return {
            value: 50,
            savetitle: '保存结果',
            issave: false,
        }
    },
    mounted() {
        savedata = toRaw(this.$store.state.savedata)
        if (savedata) {
            geo = geometryEngine.union(savedata);
        }

    },
    unmounted() {
        if (this.$store.state.savedata == null) {
            geo = null
        }
        this.$store.state.savedata = null
        //删除点击事件监听
        if (synthesisrender != undefined) {
            synthesisrender.remove();
        }
        this.$store.state.analysesgrade = false
    },

    methods: {
        attainpoi() {
            if (this.$store.state.button3 == '加载poi') {
                if (!this.$store.state.savedata) {
                    poi_layer = new FeatureLayer({
                        url: 'https://localhost:6443/arcgis/rest/services/project1/point/MapServer/0',
                        fields: [
                            {
                                name: 'name',
                                alias: 'name',
                                type: 'string'
                            },
                            {
                                name: 'type',
                                alias: 'type',
                                type: 'string'
                            },
                            {
                                name: 'typecode',
                                alias: 'typecode',
                                type: 'string'
                            },
                            {
                                name: 'address',
                                alias: 'address',
                                type: 'string'
                            },
                        ],
                        renderer: poirender,
                        outFields: ['*'],
                        popupTemplate: {  // 开启 popup
                            title: "{NAME}",
                            content: "{type}",
                            address: '{address}',
                            code: '{typecode}'
                        },
                    })
                    map.add(poi_layer)
                    this.$store.state.button3 = '删除poi'

                    return
                }
                this.$store.state.button3 = '删除poi'
                poi_layer = new FeatureLayer({
                    url: 'https://localhost:6443/arcgis/rest/services/project1/point/MapServer/0',
                    fields: [
                        {
                            name: 'name',
                            alias: 'name',
                            type: 'string'
                        },
                        {
                            name: 'type',
                            alias: 'type',
                            type: 'string'
                        },
                        {
                            name: 'typecode',
                            alias: 'typecode',
                            type: 'string'
                        },
                        {
                            name: 'address',
                            alias: 'address',
                            type: 'string'
                        },
                    ],
                    renderer: poirender,
                    outFields: ['*'],
                    popupTemplate: {  // 开启 popup
                        title: "{NAME}",
                        content: "{type}",
                        address: '{address}',
                        code: '{typecode}'
                    },
                })

                let query = new Query();
                query.geometry = geo
                query.spatialRelationship = 'contains'
                query.returnGeometry = true
                query.outFields = ['*'];
                // map.add(features)
                poi_layer.queryFeatures(query).then(res => {
                    console.log(res)
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
                    timelayer2 = new GraphicsLayer({
                        graphics: graphiclist,
                    })
                    map.add(timelayer2)
                })

            } else if (this.$store.state.button3 == '删除poi') {
                this.$store.state.button3 = '加载poi'
                map.remove(poi_layer)
                map.remove(timelayer2)
            }
        },
        analyses() {
            if (!features) {
                this.$message.error('请先请求数据')
            } else {
                if (!analydata) {
                    var query = new Query()
                    query.returnGeometry = true
                    query.where = "1=1";
                    query.outFields = ['*'];
                    var values = this.value
                    var me = this
                    features.queryFeatures(query)
                        .then(function (res) {
                            var gpUrl = 'https://localhost:6443/arcgis/rest/services/project1/buffers/GPServer/buffers'
                            geoprocessor.execute(gpUrl, {
                                input: res,
                                distance: {
                                    "distance": values,
                                    "units": "esriMeters"
                                }
                            }, { outSpatialReference: { wkid: 4326 }, }).then((res) => {
                                res = res.results[0].value
                                renderlayer(res)
                                //console.log(res.toJSON())
                                me.Synthesis(res.toJSON())
                            })
                        }).catch((error) => {
                            console.log(error)
                        })
                } else {
                    var values = this.value
                    var gpUrl = 'https://localhost:6443/arcgis/rest/services/project1/buffers/GPServer/buffers'
                    geoprocessor.execute(gpUrl, {
                        input: analydata,
                        distance: {
                            "distance": values,
                            "units": "esriMeters"
                        },

                    }, { outSpatialReference: { wkid: 4326 }, }).then((res) => {
                        res = res.results[0].value
                        this.Synthesis(res.toJSON())

                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }
        },
        evaluate() {
            this.$store.state.evaluate = !this.$store.state.evaluate
        },
        open() {
            axios.get('/api/work/wordcloud').then(
                res => {
                    ElMessageBox.alert('<img src="http://localhost:8000/static/wordcloud/res.png" class="wordcloud">', {
                        dangerouslyUseHTMLString: true,
                    })
                }
            )

        },
        Synthesis(res) {
            axios.post('/api/map/synthesis', { data: res, road: this.value }).then(res => {
                map.remove(timelayer)
                map.remove(timelayer1)
                map.remove(features)
                res_layer = new GeoJSONLayer({
                    url: res.data,
                    outFields: ['*'],
                    renderer: synthesis,
                    editingEnabled: true,
                    id: 'synthesisLayer'
                });
                map.add(res_layer);
                legend = new Legend({
                    view: view,
                    layerInfos: [{
                        layer: res_layer,
                        title: ''
                    }],
                    respectLayerVisibility:false
                });

                view.ui.add(legend, 'bottom-right');
                var point;
                synthesisrender = view.on('click', async (e) => {
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
                    var resdata;
                    var middle = await res_layer.queryFeatures(query)
                        .then(function (res) {
                            resdata = res
                        })
                    if (resdata.features.length == 0) {
                        return
                    } else {
                        this.$store.state.analysesdata = resdata.features
                        this.$store.state.analysesgrade = false
                        this.$nextTick(function () {
                            this.$store.state.analysesgrade = true
                        })
                    }

                })
            })
        },
        attaindata() {
            if (this.$store.state.button1 == '加载路网') {
                if (!this.$store.state.savedata) {
                    features = new FeatureLayer({
                        url: 'https://localhost:6443/arcgis/rest/services/project1/route/FeatureServer/0',
                        fields: [
                            {
                                name: 'name',
                                alias: 'name',
                                type: 'string'
                            },
                            {
                                name: 'highway',
                                alias: 'highway',
                                type: 'string'
                            },
                            {
                                name: 'isclean',
                                alias: 'isclean',
                                type: 'string'
                            }

                        ],
                        renderer: gridrender,
                        outFields: ['*'],
                        popupTemplate: {  // 开启 popup
                            title: "{NAME}",
                            content: "{highway}"
                        },
                    })
                    map.add(features)
                    this.$store.state.button1 = '删除图层'
                    return
                }
                this.$store.state.button1 = '删除图层'
                features = new FeatureLayer({
                    url: 'https://localhost:6443/arcgis/rest/services/project1/route/FeatureServer/0',
                    fields: [
                        {
                            name: 'name',
                            alias: 'name',
                            type: 'string'
                        },
                        {
                            name: 'highway',
                            alias: 'highway',
                            type: 'string'
                        },
                        {
                            name: 'isclean',
                            alias: 'isclean',
                            type: 'string'
                        }

                    ],
                    renderer: gridrender,
                    outFields: ['*'],
                    popupTemplate: {  // 开启 popup
                        title: "{NAME}",
                        content: "{highway}"
                    },
                })

                let query = new Query();
                query.geometry = geo
                query.spatialRelationship = 'contains'
                query.returnGeometry = true
                query.outFields = ['*'];
                // map.add(features)
                features.queryFeatures(query).then(res => {
                    analydata = res
                    var graphiclist = []
                    for (var i = 0; i < res.features.length; i++) {
                        var graphic = new Graphic({
                            geometry: res.features[i].geometry,
                            symbol: {
                                type: 'simple-line',
                                color: 'white',
                                width: '5px',
                            }

                        })
                        graphiclist.push(graphic)

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
                                name: 'name',
                                alias: 'name',
                                type: 'string'
                            },
                        ],
                    })
                    map.add(timelayer)
                })

            } else if (this.$store.state.button1 == '删除图层') {
                this.$store.state.button1 = '加载路网'
                map.remove(timelayer)
                map.remove(timelayer1)
                map.remove(features)
                analydata = null
                map.remove(res_layer)
                if (synthesisrender != undefined) {
                    synthesisrender.remove();
                }

                this.$store.state.analysesgrade = false

            }

        }
    }
}
function renderlayer(res) {
    var graphiclist = []
    for (var i = 0; i < res.features.length; i++) {
        var graphic = new Graphic({
            geometry: res.features[i].geometry,
            symbol: {
                type: 'simple-fill',
                color: [122, 197, 205, 0.3],
                outline: {
                    color: 'grey',
                    width: 0,
                }
            }

        })
        graphiclist.push(graphic)

    }
    timelayer1 = new GraphicsLayer({
        graphics: graphiclist,
        outFields: ['*'],
        fields: [
            {
                name: 'gid',
                alias: 'gid',
                type: 'oid'
            },
            {
                name: 'name',
                alias: 'name',
                type: 'string'
            },
        ],
    })
    map.add(timelayer1)
}

</script>
<style scoped>
.gridcontrol {
    color: white;
    height: 30px;
    line-height: 30px;
}

.wordcloud {
    width: 100%;
    height: 100%;
}

.slider-demo-block {
    max-width: 250px;
    display: flex;
    align-items: center;
}

.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
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

.bufferset {
    font-size: 16px;
    display: flex;
    width: 100%;
    height: 36px;
    font-weight: 400;
}

.control>* {
    background-color: rgb(0, 0, 0, 0.5);
    margin: 10px;
    font-size: 16px;
    font-weight: 800;
    color: white;

}

.control>*:hover {
    background-color: #dd5a06;
    cursor: pointer;
    opacity: 1;
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

.controls>* {
    margin: 5px;
    font-size: 12px;
    font-weight: 800;
    color: white;
    margin: 5px;

}

.controls {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: start;


}

.analyses {
    width: 80%;
    background-color: black;
    opacity: 1;
}

.analyses:hover {
    background-color: #dd5a06;
}
</style>