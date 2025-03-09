<template>
    <div class="pop_container">
        <div class="header">
            <div class="title">任务分配模块</div>
        </div>
        <span class="tool_title" style='font-size: 16px; color: white;margin: 0.5vh 1.5vw;'>挑选任务路段</span>
        <div style="display: flex; flex-direction: row; margin:  0.5vh 1.5vw;">
            <div class="draw_tools" :class="this.toolstoggle == 'circle' ? 'visited' : ''" v-on:click="tools('circle')">
                <svg t="1717317287016" class="icon" viewBox="0 0 1194 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2232" width="36" height="36">
                    <path
                        d="M597.333333 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-914.2784A402.2784 402.2784 0 1 0 999.611733 512 402.2784 402.2784 0 0 0 597.333333 109.7216zM597.333333 768a256 256 0 1 1 256-256 256 256 0 0 1-256 256z m0-402.2784A146.2784 146.2784 0 1 0 743.611733 512 146.2784 146.2784 0 0 0 597.333333 365.7216z"
                        fill="#ffffff" p-id="2233"></path>
                </svg>
            </div>

            <div class="draw_tools" :class="this.toolstoggle == 'rectangle' ? 'visited' : ''"
                v-on:click="tools('rectangle')">
                <svg t="1717317331372" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3373" width="36" height="36">
                    <path
                        d="M273.9 168.3H739v37.1H273.9zM273.9 819.6H739v37.1H273.9zM165.812 740.898v-465.1h37.1v465.1zM821.11 740.896v-465.1h37.1v465.1z"
                        fill="#ffffff" p-id="3374"></path>
                    <path
                        d="M184.7 66.2c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.5c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.7-37 82.7-82.7 82.7zM184.7 717.5c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.6c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.6-37 82.7-82.7 82.7zM840 717.5c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.6c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.6-37 82.7-82.7 82.7zM840 66.2c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.1-121-121-121z m-0.1 203.5c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7c0.1 45.7-37 82.7-82.7 82.7z"
                        fill="#ffffff" p-id="3375"></path>
                </svg>
            </div>

            <div class="draw_tools" :class="this.toolstoggle == 'polygon' ? 'visited' : ''"
                v-on:click="tools('polygon')">
                <svg t="1740121207551" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5003" width="36" height="36">
                    <path
                        d="M96 640.256L571.168 96 928 458.304V928H96v-287.744z m32 12V896h768V471.424L572.576 143.04 128 652.256z"
                        fill="#ffffff" p-id="5004"></path>
                </svg>
            </div>
            <div class="draw_tools" :class="this.toolstoggle == 'point' ? 'visited' : ''" v-on:click="tools('point')">
                <svg t="1717317366495" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4457" width="36" height="36">
                    <path d="M512 624a112 112 0 1 0 0-224 112 112 0 0 0 0 224z" p-id="4458" fill="#ffffff"></path>
                </svg>
            </div>
        </div>
        <div class="control">
            <el-button plain @click="clear()">清空</el-button>
            <el-button v-on:click="Workline()">确定</el-button>
        </div>
    </div>
</template>
<script>
import { map, view } from '../mapbody.vue'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import axios from 'axios';
import Graphic from '@arcgis/core/Graphic';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import { bodyrender,statesLabelClass  } from '../../js/render'
import Legend from "@arcgis/core/widgets/Legend.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Query from "@arcgis/core/rest/support/Query.js";
import Draw from "@arcgis/core/views/draw/Draw.js";
import Point from "@arcgis/core/geometry/Point.js";
import Circle from "@arcgis/core/geometry/Circle.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import { toRaw } from "vue";

var layer
var WorkingLayer
var middle;
var legend
var timelayer
var analydata

export default {
    data() {
        return {
            WorkingLayer: '',
            toolstoggle: '',
            mapselect: '',
            hitselect: '',
            drawer: false
        }
    },
    unmounted() {
        map.remove(layer);
        map.remove(WorkingLayer);
        timelayer ? map.remove(timelayer) : ''
        view.ui.remove(legend)
        this.mapselect ? this.delete_status() : ''
    },
    mounted() {
        // 根据图层的 id 获取图层
        layer = map.findLayerById('synthesisLayer'); //layer成功获取，那么修改synthesisLayer的renderer规则,并且设置WorkingLayer为synthesisLayer
        layer ? this.synthesisRender() : layer = map.findLayerById('lineLayer')//layer成功获取，那么修改LineLayer的renderer规则,并且设置WorkingLayer为lineLayer

        if (!this.WorkingLayer) {
            layer ? this.lineRender() : this.attainLayer()//两个layer都没有获取到，那么此时要请求layer,并且设置id为WorkingLayer与WorkingLayer为WorkingLayer
        }
        //加载正在清雪中的图层,然后添加legend
        this.WorkingRender()

    },
    watch: {
        //监听drawer抽屉变换
        "$store.state.drawer": {
            handler: function (newVal, oldVal) {
                var dom = document.getElementsByClassName('pop_container')[0]
                if (newVal) {
                    dom.style.pointerEvents = "none";
                    this.mapselect ? this.delete_status() : ''
                    return
                }
                dom.style.pointerEvents = "auto";
                map.remove(timelayer)
                layer.refresh()
                this.WorkingRender()
            }
        }

    },
    methods: {
        Workline() {
            // 获取所有 Graphic 对象
            const graphicsArray = view.graphics.toArray();
            // 合并几何图形
            const geometries = graphicsArray.map(graphic => graphic.geometry);

            //将以上geometries转为polygon类型
            var geometryArr = geometries.map((geometry) => {
                if (geometry.type == 'polyline') {
                    var PolygonGeometry = geometryEngine.buffer(geometry, 10, "meters")
                } else {
                    var PolygonGeometry = geometry
                }
                return PolygonGeometry
            })
            //递归遍历geometries数组，用于合并
            var mergedGeometry = mergeGeometries(geometryArr);

            // 创建新的 Graphic 对象
            const mergedGraphic = new Graphic({
                geometry: mergedGeometry,
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
            view.graphics.removeAll()
            let query = new Query();
            query.geometry = mergedGeometry
            query.spatialRelationship = 'contains'
            query.returnGeometry = true
            query.outFields = ['*'];
            // map.add(features)
            layer.queryFeatures(query).then(res => {
                analydata = res
                var graphiclist = []
                for (var i = 0; i < res.features.length; i++) {
                    if (res.features[i].attributes.isclean == 2) continue;
                    if (res.features[i].attributes.isclean == 1) continue;
                    const regex = /隧道/;
                    //筛选数据，名称中有隧道两个字的不要
                    if (regex.test(res.features[i].attributes.name)) continue;
                    var graphic = new Graphic({
                        geometry: res.features[i].geometry,
                        symbol: {
                            type: 'simple-line',
                            color: '#31c941',
                            width: '5px',
                        },
                        attributes: res.features[i].attributes

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
                this.$store.state.drawer = true
                console.log(res)
                this.$store.state.WorkingData = res
            })


        },
        async selectdata() {
            var re = this
            re.mapselect = await view.on('click', async (e) => {
                re.hitselect = view.hitTest(e).then(function (response) {
                    if (response.results.length) {
                        var graphic = response.results.filter(function (result) {
                            return result.graphic.layer === layer
                        });

                        if (graphic.length) {
                            //graphic[0].attributes.isclean!=2
                            //根据graphic创建一个中间白两边蓝的graphic
                            var SelectGraphic = new Graphic({
                                geometry: graphic[0].graphic.geometry,
                                symbol: {
                                    type: "simple-line",  // autocasts as new SimpleFillSymbol()
                                    color: [51, 51, 204, 0.5],
                                    width: 10

                                }
                            })
                            view.graphics.add(SelectGraphic)
                        } else {
                            re.$message.error('没有找到道路')
                        }
                    }
                });
            })

        },
        delete_status() {
            toRaw(this.mapselect).remove();
            this.hitselect = null
            this.toolstoggle = ''
        },
        clear() {
            view.graphics.removeAll();
            this.mapselect ? this.delete_status() : ''
            this.toolstoggle = ''
            layer.popupEnabled = true
        },
        tools(tool) {
            layer.popupEnabled = false
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
                    this.toolstoggle = 'point'
                    this.selectdata()
                    break
            }
        },
        attainLayer() {
            layer = new FeatureLayer({
                url: 'https://localhost:6443/arcgis/rest/services/project1/route/FeatureServer/0',
                id: 'WorkingLayer',
                renderer: bodyrender,
                fields: [
                    {
                        name: 'gid',
                        alias: 'gid',
                        type: 'string'
                    },
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
                    },
                    {
                        name: 'shape_leng',
                        alias: 'shape_leng',
                        type: 'string'
                    },

                ],
                outFields: ['*'],
                popupTemplate: {  // 开启 popup
                    title: "{NAME}",
                    content: "{highway}"
                },
                spatialReference: new SpatialReference(102100),
                labelingInfo:[statesLabelClass]
            })
            map.add(layer)
            this.WorkingLayer = 'WorkingLayer'
        },
        //修改synthesisLayer的renderer
        synthesisRender() {
            view.ui.empty('bottom-right');
            layer.refresh()
            this.WorkingLayer = 'synthesisLayer'
        },
        lineRender() {
            view.ui.empty('bottom-right');
            layer.refresh()
            this.WorkingLayer = 'LineLayer'
        },
        WorkingRender() {
            if (WorkingLayer) {
                map.remove(WorkingLayer)
                view.ui.empty('bottom-right');
            }
            // 创建查询对象
            const query = new Query();
            query.where = "isclean = 2"; // 设置查询条件
            query.outFields = ["*"]; // 返回所有字段
            query.returnGeometry = true; // 返回几何信息
            // 执行查询
            layer.queryFeatures(query).then(function (results) {

                if (!results.features[0]) {
                    legend = new Legend({
                        view: view,
                        layerInfos: [{
                            layer: layer,
                            title: ''
                        }],
                    });
                    view.ui.add(legend, 'bottom-right');
                    return
                }
                WorkingLayer = new FeatureLayer({
                    source: results.features, // 使用查询结果作为数据源
                    fields: results.fields, // 使用原始图层的字段
                    geometryType: results.geometryType, // 使用原始图层的几何类型
                    spatialReference: results.spatialReference, // 使用原始图层的空间参考
                    renderer: {
                        type: "simple", // 设置渲染器
                        label: '正在清雪',
                        symbol: {
                            type: "simple-line",
                            color: [237, 197, 121, 0.5],
                            width: "15px",
                        },
                        font: {
                            size: 10
                        },
                        textExpressionInfo: {
                            expression: "$feature.name"
                        }
                    }
                });

                // 将过滤后的FeatureLayer添加到地图
                map.add(WorkingLayer);

                if (WorkingLayer)
                    //加载layer与workinglayer的图例图例
                    legend = new Legend({
                        view: view,
                        layerInfos: [{
                            layer: WorkingLayer,
                            title: ''
                        }, {
                            layer: layer,
                            title: ''
                        }],
                    });
                view.ui.add(legend, 'bottom-right');
            }).catch(function (error) {
                console.error("查询失败: ", error);
            });

        }
    }
}
// 递归合并函数
function mergeGeometries(geometries) {
    if (geometries.length === 0) return null; // 如果没有几何图形，返回 null
    if (geometries.length === 1) return geometries[0]; // 如果只有一个几何图形，直接返回

    // 取出前两个几何图形进行合并
    const geometry1 = geometries[0];
    const geometry2 = geometries[1];

    // 计算相交区域
    const intersection = geometryEngine.intersect(geometry1, geometry2);

    let mergedGeometry;
    if (intersection) {
        // 计算不相交的部分
        const diff1 = geometryEngine.difference(geometry1, intersection);
        const diff2 = geometryEngine.difference(geometry2, intersection);

        // 合并相交和不相交的部分
        mergedGeometry = geometryEngine.union([intersection, diff1, diff2]);
    } else {
        // 如果没有相交区域，直接合并两个几何图形
        mergedGeometry = geometryEngine.union(geometry1, geometry2);
    }

    // 将合并结果与剩余的几何图形继续合并
    const remainingGeometries = geometries.slice(2);
    return mergeGeometries([mergedGeometry, ...remainingGeometries]);
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
    view.graphics.add(res_data);
    re.toolstoggle = ''
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
            spatialReference: view.spatialReference
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
.tool_title {
    font-weight: 700;
    font-size: 16px;
    font-family: '楷体';

}

.draw_tools {
    background-color: black;
    border-left: 0.5px solid gray;
    display: flex;
    flex-direction: row;
    width: 36px;
    height: 36px;
    line-height: 20px;
    box-shadow: 1px 0.5px 0 grey;
    border-radius: 2px;
    cursor: pointer;
}

.visited {
    background-color: orange;
    box-shadow: 0px 0px 0 grey;
}

.draw_tools:hover {
    background-color: orange;
}

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
    margin-top: 1vw;
    margin-left: 1vw;
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
    font-size: 16px;
    font-weight: 800;
    color: white;
    width: 25%;
    margin: 4% 8%;

}

.control {
    position: relative;
    left: 30%;
}

.el-button.el-button {
    margin-left: 0px;
}
</style>