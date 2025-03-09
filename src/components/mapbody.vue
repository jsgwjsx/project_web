<template>
    <div id="container">
        <div class="map-mask"></div>
        <el-drawer v-model="drawer" title="I am the title">
            <span>Hi, there!</span>
        </el-drawer>
        <el-drawer v-model="this.$store.state.drawer" size="40%" :modal="drawer" modal-class="custom-modal"
            :open="initEcharts()">
            <template #header>
                <h3>雪情预测</h3>
            </template>
            <template #default>
                <div class="working_container">
                    <div id="chart" style="width: 100%; height: 30%;"></div>
                    <div class="content_container" v-if="Workcontrols == 0" style="height: 70%;">
                        <h3 style="color: rgb(114, 118, 123);margin: 1vh 0; ">任务时间</h3>
                        <div style="width: 100%;text-align: center;;">
                            <el-date-picker v-model="time" type="datetimerange" range-separator="--"
                                start-placeholder="Start date" end-placeholder="End date" @change="filterGroup"
                                :disabled-date="disabledDate" :disabled-hours="disabledHours"
                                :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" />
                        </div>
                        <h3 style="color: rgb(114, 118, 123);margin: 1vh 0;">任务小组<span
                                style="font-size: 12px;">(组号-距离)</span></h3>
                        <div style="width: 100%;text-align: center;height: 42%;">
                            <el-transfer v-model="form.SelectGroup" :data="GroupData" :titles="['空闲小组', '选择小组']"
                                @change="selectChange" />
                        </div>
                    </div>
                    <div class="content_container" v-if="Workcontrols == 1" style="height: 70%;">
                        <h3 style="color: rgb(114, 118, 123);margin: 1vh 0;">任务时间</h3>
                        <div style="width: 100%;text-align: center;;">
                            <el-date-picker v-model="time" type="datetimerange" range-separator="--"
                                start-placeholder="Start date" end-placeholder="End date" :disabled-date="disabledDate"
                                :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes"
                                :disabled-seconds="disabledSeconds" @change="filterMachine" />
                        </div>
                        <h3 style="color: rgb(114, 118, 123);margin: 1vh 0;">任务车辆</h3>
                        <div style="width: 100%;text-align: center; height: 63%;">
                            <div class="sidebar">
                                <el-radio-group v-model="machine_type" size="small" text-color="#000" fill="#fff"
                                    default="control_tool"
                                    style="margin: 5px 10px;border: 0.1px grey solid ;border-radius: 6px">
                                    <el-radio-button label="铲雪车" value="铲雪车" />
                                    <el-radio-button label="运雪车" value="运雪车" />
                                </el-radio-group>
                            </div>
                            <div style="height: 100%;width: 100%;">
                                <el-scrollbar>
                                    <el-checkbox-group v-model="form.SelectMachine">
                                        <el-collapse v-model="activeNames">
                                            <el-collapse-item v-for="item, index in Machinelist"
                                                :title="`${item.license}-${item.distance}m`" :name="index">
                                                <div
                                                    style="width: 90%;height: 200px; display: flex;flex-direction:row;justify-content: space-around;align-items: space-around;flex-wrap: wrap;">
                                                    <!-- echeck -->
                                                    <el-checkbox :value="`${item.Machine_types}-${item.Machineid}`"
                                                        style="margin: 1%;" />
                                                    <div class="card_content_image">
                                                        <img :src="item.avator" alt=""
                                                            style="width: 98%; height: 90%; border-radius: 10px;">
                                                    </div>
                                                    <div class="card_content">
                                                        <div>
                                                            <span class="title_header">类型:</span>
                                                            <span class="item_body">{{ item.Machine_types }}</span>
                                                        </div>
                                                        <div>
                                                            <span class="title_header">车牌号:</span>
                                                            <span class="item_body">{{ item.license }}</span>
                                                        </div>
                                                        <div>
                                                            <span class="title_header">司机电话:</span>
                                                            <span class="item_body">{{ item.driver }}</span>
                                                        </div>
                                                        <div v-if="item.capcity != '0'">
                                                            <span class="title_header">铲车容积:</span>
                                                            <span class="item_body">{{ item.capcity }}立方米</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-checkbox-group>
                                </el-scrollbar>

                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">cancel</el-button>
                    <el-button type="primary" @click="confirmClick">confirm</el-button>
                </div>

            </template>
        </el-drawer>
    </div>
</template>
<script>
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import esriConfig from '@arcgis/core/Config'
import * as echarts from 'echarts';
import { toRaw } from "vue";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import axios from 'axios';
import { sum } from 'element-plus/es/components/table-v2/src/utils.mjs';

var map;
var view;

var renderdata;
var chart
export default {
    data() {
        return {
            activeNames: '',
            Machinelist: [],
            machine_type: '铲雪车',
            echartsData: {
                sum: 0,
                footRoad: 0,
                len: 0
            },
            drawer: false,
            Workcontrols: 0,
            GroupData: [],
            time: '',
            islock: false,
            form: {
                Grouptime: '',
                Machinetime: '',
                SelectGroup: [],
                SelectMachine: [],
            },
            param1: 0,
            param2: 0,
            Machinedata: [],
        }
    },
    mounted() {
        this.initmap()
    },
    watch: {
        machine_type(newValue) {
            let value = this.time
            const StartTime = new Date(value[0]);
            const start = Math.floor(StartTime.getTime() / 1000);
            const EndTime = new Date(value[1]);
            const end = Math.floor(EndTime.getTime() / 1000);//s为单位，而不是毫秒
            const center = this.getFeatureCenter();
            const types = this.machine_type
            var params = {
                startTime: start,
                endTime: end,
                center: {
                    lng: center.x,
                    lat: center.y
                },
                machine_type: types
            }
            //机器信息
            axios.post('/api/map/filterMachine', params).then(res => {
                this.Machinelist = res.data
            });
        },
        //监听drawer抽屉变换
        "$store.state.drawer": {
            handler: function (newVal, oldVal) {
                if (!newVal) return;
                renderdata = toRaw(this.$store.state.WorkingData)
                this.refresh()
            }
        },
        'form.SelectMachine'(value) {
            if(!value[0] && this.Workcontrols==0)return;
  
            let resdata = toRaw(value)
            let Machine = []//铲雪车
            for (var i = 0; i < resdata.length; i++) {
                let Machine_type = resdata[i].slice(0, 3);
                let Machine_license = resdata[i].slice(4)
                if (Machine_type == '铲雪车') {
                    Machine.push(Machine_license)
                }
            }
            //根据铲雪车的数量*100*工作时间 可以计算出所选车辆清理积雪的总体积
            //根据所有组的人数*3*时间(h)，计算出选择的人可以清理积雪的总体积
            const StartTime = new Date(this.time[0]);
            const start = Math.floor(StartTime.getTime());
            const EndTime = new Date(this.time[1]);
            const end = Math.floor(EndTime.getTime());//s为单位，而不是毫秒
            const hours = ((end - start) / 1000 / 3600).toFixed(1)

            this.param2 = Machine.length*hours*100
            this.processData(this.params1,this.param2)
        }

    },
    methods: {
        filterMachine(value) {
            if (!value) {
                this.Machinelist = [] //日期为空
                this.form.SelectMachine = []
                return
            }
            const StartTime = new Date(value[0]);
            const start = Math.floor(StartTime.getTime() / 1000);

            const EndTime = new Date(value[1]);
            const end = Math.floor(EndTime.getTime() / 1000);//s为单位，而不是毫秒
            const center = this.getFeatureCenter();

            const types = this.machine_type

            var params = {
                startTime: start,
                endTime: end,
                center: {
                    lng: center.x,
                    lat: center.y
                },
                machine_type: types
            }
            //机器信息
            axios.post('/api/map/filterMachine', params).then(res => {
                this.Machinelist = res.data
                this.form.SelectMachine = []
            });

        },
        refresh() {
            this.form = {
                Grouptime: '',
                Machinetime: '',
                SelectGroup: [],
                SelectMachine: [],
            }
            this.param1 = 0
            this.param2 = 0
            this.Workcontrols = 0
            this.time = ''
            this.GroupData = []
            this.Machinelist = []
            this.machine_type = '铲雪车'
        },
        selectChange(newVal) {
            newVal = toRaw(newVal)
            //根据所有组的人数*3*时间(h)，计算出选择的人可以清理积雪的总体积
            const StartTime = new Date(this.time[0]);
            const start = Math.floor(StartTime.getTime());
            const EndTime = new Date(this.time[1]);
            const end = Math.floor(EndTime.getTime());//s为单位，而不是毫秒
            const hours = ((end - start) / 1000 / 3600).toFixed(1)
            // sum: 0, sum-res
            // footRoad: 0-res
            //len: 0
            axios.post('/api/map/groupPop', { groupid: newVal }).then(res => {
                this.params1 = (res.data * 3 * hours)
                this.processData(this.params1)
            })
        },
        // 禁用当前日期之前的日期
        disabledDate(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },

        // 禁用当前时间之前的小时
        disabledHours() {
            const now = new Date();
            if (this.time && new Date(this.time).toDateString() === now.toDateString()) {
                return Array.from({ length: now.getHours() }, (_, i) => i);
            }
            return [];
        },

        // 禁用当前时间之前的分钟
        disabledMinutes() {
            const now = new Date();
            if (this.time && new Date(this.time).toDateString() === now.toDateString()) {
                return Array.from({ length: now.getMinutes() }, (_, i) => i);
            }
            return [];
        },

        // 禁用当前时间之前的秒
        disabledSeconds() {
            const now = new Date();
            if (this.time && new Date(this.time).toDateString() === now.toDateString()) {
                return Array.from({ length: now.getSeconds() }, (_, i) => i);
            }
            return [];
        },

        filterGroup(value) {
            if (!value) {
                this.GroupData = [] //日期为空
                this.form.SelectGroup = []
                return
            }
            const StartTime = new Date(value[0]);
            const start = Math.floor(StartTime.getTime() / 1000);

            const EndTime = new Date(value[1]);
            const end = Math.floor(EndTime.getTime() / 1000);//s为单位，而不是毫秒
            const center = this.getFeatureCenter()
            var params = {
                startTime: start,
                endTime: end,
                center: {
                    lng: center.x,
                    lat: center.y
                }
            }
            //组信息
            axios.post('/api/map/filterGroup', params).then(res => {
                var reslist = []
                for (var i = 0; i < res.data.length; i++) {
                    reslist.push({
                        key: res.data[i].groupid,
                        label: `第${res.data[i].groupid}组-${res.data[i].distance}m`
                    })
                }
                this.GroupData = reslist
                this.form.SelectGroup = []
                this.processData()
            });

        },
        getFeatureCenter() {
            // 假设 featureCollection 是包含多个要素的 FeatureCollection
            const features = renderdata.features;

            // 收集所有几何顶点
            let totalX = 0;
            let totalY = 0;
            let vertexCount = 0;

            features.forEach(feature => {
                const geometry = feature.geometry;

                // 根据几何类型提取顶点
                if (geometry instanceof Point) {
                    // 点：直接记录坐标
                    totalX += geometry.x;
                    totalY += geometry.y;
                    vertexCount++;
                } else if (geometry instanceof Polyline) {
                    // 线：遍历所有路径的顶点
                    geometry.paths.forEach(path => {
                        path.forEach(vertex => {
                            totalX += vertex[0];
                            totalY += vertex[1];
                            vertexCount++;
                        });
                    });
                } else if (geometry instanceof Polygon) {
                    // 多边形：遍历所有环的顶点（忽略闭合环的最后一个重复点）
                    geometry.rings.forEach(ring => {
                        const vertices = ring.slice(0, -1); // 移除最后一个重复顶点
                        vertices.forEach(vertex => {
                            totalX += vertex[0];
                            totalY += vertex[1];
                            vertexCount++;
                        });
                    });
                }
            });

            // 计算全局顶点平均坐标
            const centerX = totalX / vertexCount;
            const centerY = totalY / vertexCount;
            let point = {
                type: "point", // autocasts as /Point
                x: centerX,
                y: centerY,
                spatialReference: SpatialReference.WebMercator
            };
            return webMercatorUtils.webMercatorToGeographic(point)

        },
        processData(params1 = 0, params2 = 0) {
            let sum = 0;
            let len = 0;
            let footRoad = 0;
            const regex = /高速/;
            for (var i = 0; i < renderdata.features.length; i++) {
                len += renderdata.features[i].attributes.shape_le
                sum += renderdata.features[i].attributes.shape_le * renderdata.features[i].attributes.width * (renderdata.features[i].attributes.snowcover * 0.001)
                if (regex.test(renderdata.features[i].attributes.name)) {
                    continue
                } else {
                    var footwidth = testGrade(renderdata.features[i].attributes.width)
                    footRoad += footwidth * renderdata.features[i].attributes.shape_le * (renderdata.features[i].attributes.snowcover * 0.001)
                }

            }
            var data = {
                sum: (Math.round(sum * 100) / 100.).toFixed(2) - params1 - params2 >= 0 ? (Math.round(sum * 100) / 100.).toFixed(2) - params1 - params2 : 0,
                len: (Math.round(len * 100) / 100.).toFixed(2),
                footRoad: (Math.round(footRoad * 100) / 100.).toFixed(2) - params1 >= 0 ? (Math.round(footRoad * 100) / 100.).toFixed(2) - params1 : 0,
            }

            if (!chart) {
                chart = echarts.init(document.getElementById('chart'));
            }
            // 数据
            const echartdata = [
                { name: '路边积雪预测(m3)', value: data.footRoad }, // 右边
                { name: '道路长度(m)', value: data.len },  // 左边
                { name: '积雪总预测(m3)', value: data.sum }, // 中间最高
            ];
            // 配置项
            const option = {
                title: {
                    text: '积雪清理预测数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: echartdata.map(item => item.name),
                    axisTick: {
                        show: false // 隐藏刻度线
                    }
                },
                yAxis: {
                    type: 'value',
                    show: false // 隐藏 Y 轴
                },
                series: [
                    {
                        name: '数据',
                        type: 'bar',
                        data: echartdata.map(item => item.value),
                        barWidth: '40%', // 柱状图宽度
                        itemStyle: {
                            color: function (params) {
                                // 自定义颜色
                                const colors = ['#5470C6', '#91CC75', '#EE6666'];
                                return colors[params.dataIndex];
                            },
                            borderRadius: [10, 10, 0, 0] // 顶部圆角
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}' // 显示数据值
                        }
                    }
                ]
            };

            // 渲染图表
            chart.setOption(option);
        },
        initEcharts() {
            if (this.$store.state.drawer) {
                this.$nextTick(() => {
                    this.processData()
                })

            }

        },
        cancelClick() {
            if (this.Workcontrols == 0) {
                this.$store.state.drawer = false
            } else {
                this.Workcontrols -= 1
            }
        },
        confirmClick() {
            if (this.Workcontrols == 1) {
                this.form.Machinetime = this.time
                //this.$store.state.drawer = false
                var formData = toRaw(this.form)
                var mapData = renderdata.toJSON()
                var pararm = { 
                    Grouptime:processtime(formData.Grouptime),
                    SelectGroup:formData.SelectGroup,
                    Machinetime:processtime(formData.Machinetime),
                    SelectMachine:formData.SelectMachine.map(item=>item.slice(4)),
                    data:mapData,
                }
                axios.post('/api/map/createWork',pararm).then(res=>{
                    this.$message.success('发布任务成功')
                    this.$store.state.drawer = false
                    
                })
                console.log(pararm)


            } else {
                this.form.Grouptime = this.time
                this.Workcontrols += 1
                this.filterMachine(this.time)
            }

        },
        initmap() {
            esriConfig.apiKey =
                "AAPK6c9f304833a84bf387317cb4eeba7146uZYZz8s72KAn-I9-ZWWXHFpQ4pX9a_zAcmVf9L1R_KAFWYclG9uH9ZV8mdyQa7fD";

            map = new Map({
                basemap: "arcgis-streets-night",
            })
            view = new MapView({
                center: [126.60, 45.72],
                zoom: 12,
                container: "container",
                map: map,
            });

            this.map = map
            view.ui.components = []
        }
    }
}
function testGrade(width) {
    if (0 <= width && width < 20) {
        return 4
    } else if (20 <= width && width < 30) {
        return 6
    } else if (30 <= width && width < 50) {
        return 10
    } else if (50 <= width && width < 100) {
        return 20
    } else if (100 <= width) {
        return 0
    }
}
function processtime(value){
    const StartTime = new Date(value[0]);
    const start = Math.floor(StartTime.getTime() / 1000);

    const EndTime = new Date(value[1]);
    const end = Math.floor(EndTime.getTime() / 1000);//s为单位，而不是毫秒
    return [start,end]
}
export { map, view }
</script>
<script>

</script>
<style scoped>
@import "https://js.arcgis.com/4.29/@arcgis/core/assets/esri/themes/light/main.css";

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
    background-color: red;

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

.content_container {
    width: 100%;
    height: 70%;
}

::v-deep(.el-drawer__header) {
    margin-bottom: 0px;
}

.working_container {
    height: 100%;
    width: 100%;
}

::v-deep(.custom-modal) {
    background-color: transparent;
    pointer-events: none;
}

::v-deep(.custom-modal>div) {
    pointer-events: auto;
}

#container {
    width: 120%;
    height: 100%;
    outline: none;
    border: none;
}

.esri-view .esri-view-surface--inset-outline:focus::after {
    outline: none !important;
}

::v-deep(.esri-view-surface--inset-outline:focus::after) {
    outline: none !important;
}

.map-mask {
    width: 120%;
    height: 100%;
    z-index: 2;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    background-image: linear-gradient(135deg, rgba(37, 54, 76, 0.05)0%, rgba(37, 54, 76, 0.04) 20%, rgba(37, 54, 76, 0) 80%, rgba(37, 54, 76, 0.04) 80%, black 100%),
        linear-gradient(45deg, rgba(37, 54, 76, 0.05) 0%, rgba(37, 54, 76, 0.04) 20%, rgba(37, 54, 76, 0) 80%, rgba(37, 54, 76, 0.04) 80%, black 100%),
        linear-gradient(225deg, black 0%, rgba(37, 54, 76, 0.02) 40%, rgba(37, 54, 76, 0) 80%, rgba(37, 54, 76, 0.04) 80%, black 100%),
        linear-gradient(315deg, black 0%, rgba(37, 54, 76, 0.02) 40%, rgba(37, 54, 76, 0) 80%, rgba(37, 54, 76, 0.04) 80%, black 100%),
        linear-gradient(90deg, rgba(37, 54, 76, 0.05) 0%, rgba(37, 54, 76, 0.02) 30%, rgba(37, 54, 76, 0) 80%, rgba(37, 54, 76, 0.04) 80%, black 100%);


}

::v-deep .esri-ui-bottom-right {
    bottom: 0vh !important;
    right: 15vw !important;
    max-width: 300px;
}

.esri-legend__service {
    border-bottom: none !important;
}
</style>
