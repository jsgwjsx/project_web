<template>
    <div class="assemble_container">
        <div class="select_pages" v-if="select_pages">
            <div class="tool_title" style="font-size: 20px; margin: 5px;">
                请选择一人作为组长
            </div>
            <div class="group_list" style="height: 75%;width: 95%;margin: 10px;">
                <el-scrollbar>
                    <el-collapse v-model="activeNames" accordion>
                        <el-collapse-item :name="index" v-for="(item, index) in select_list" :key="item">
                            <template #title>
                                {{ index + 1 }}-{{ item }}-{{ select_list4[index] }}{{}}
                            </template>
                            <img :src="select_list1[index]" alt="" style="width: 100px; height: 120px;">
                            <div><b>姓名</b>: {{ select_list[index] }}</div>
                            <div><b>电话</b>: {{ select_list2[index] }}</div>
                            <div><b>家庭住址</b>: {{ select_list3[index] }}</div>
                            <el-button type="primary" style="position: relative; left: 70%;"
                                v-on:click="middle_employee(index)">确定</el-button>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </div>

            <el-button type="primary" style="position: relative;top: -3%; left:60%;margin: 10px;"
                v-on:click="close2()">取消</el-button>
            <el-button type="primary" style="position: relative;top: -3%; left:60%;margin: 10px;"
                v-on:click="close1()">保存</el-button>
        </div>
        <div class="select_pages" v-if="select_pages1">
            <div class="tool_title" style="font-size: 20px; margin: 5px;">
                请选择人员作为组员
            </div>
            <div class="group_list" style="height: 75%;width: 95%;margin: 10px;">
                <el-scrollbar>
                    <el-collapse v-model="activeNames" accordion>
                        <el-checkbox-group v-model="select_employee_list">
                            <el-collapse-item :name="index" v-for="(item, index) in select_list" :key="item">
                                <template #title>
                                    {{ index + 1 }}-{{ item }}-{{ select_list4[index] }}{{ select_type ? '米' : '组' }}
                                </template>
                                <img :src="select_list1[index]" alt="" style="width: 100px; height: 120px;">
                                <div><b>姓名</b>: {{ select_list[index] }}</div>
                                <div><b>电话</b>: {{ select_list2[index] }}</div>
                                <div><b>家庭住址</b>: {{ select_list3[index] }}</div>
                                <el-checkbox label="选择" :value="index" style="position: relative;left: 80%;" />
                            </el-collapse-item>
                        </el-checkbox-group>
                    </el-collapse>
                </el-scrollbar>
            </div>

            <el-button type="primary" style="position: relative;top: -3%; left:60%;margin: 10px;"
                v-on:click="close3()">取消</el-button>
            <el-button type="primary" style="position: relative;top: -3%; left:60%;margin: 10px;"
                v-on:click="close4()">保存</el-button>
        </div>
        <div class="mapsite" id="mapsite">

        </div>
        <div class="assemblecontrols">
            <div class="sidebar">
                <el-radio-group v-model="pattern" size="small" text-color="#000" fill="#fff" default="control_tool"
                    style="margin: 5px 10px;border: 0.1px grey solid ;border-radius: 6px">
                    <el-radio-button label="组别管理" value="control_tool" />
                    <el-radio-button label="人员管理" value="control_list" />
                </el-radio-group>
            </div>
            <div class="content">
                <div class="control_tool" v-if="pattern === 'control_tool'">
                    <div><span class="tool_title" style='font-size: 20px;'>图层管理</span></div>
                    <div class="layercontrol">
                        <el-checkbox v-model="assemble" label="聚集点" size="large" />
                        <el-checkbox v-model="pop" label="员工" size="large" />
                    </div>
                    <div><span class="tool_title" style='font-size: 20px;'>组别管理</span><span
                            style='font-size: 12px; font-weight: 700;'>(组号-组长编号-组长名称)</span></div>
                    <div class="group" style="height: 100%;">
                        <div class="group_control">
                            <div class="control_item" v-on:click="tools('select')"
                                :class="this.toolstoggle == 'select' ? 'visited' : ''">
                                <svg t="1717847459445" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5985" width="20" height="20">
                                    <path
                                        d="M504.448 519.552m-151.189333 0a151.189333 151.189333 0 1 0 302.378666 0 151.189333 151.189333 0 1 0-302.378666 0Z"
                                        fill="#111111" p-id="5986"></path>
                                    <path
                                        d="M504.448 124.714667c-218.069333 0-394.858667 176.768-394.858667 394.837333s176.789333 394.858667 394.858667 394.858667 394.837333-176.789333 394.837333-394.858667S722.517333 124.714667 504.448 124.714667z m0 64c182.72 0 330.837333 148.117333 330.837333 330.837333s-148.117333 330.858667-330.837333 330.858667S173.589333 702.272 173.589333 519.552c0-182.72 148.138667-330.837333 330.858667-330.837333z"
                                        fill="#111111" p-id="5987"></path>
                                    <path
                                        d="M519.552 10.666667a32 32 0 0 1 32 32v98.922666a32 32 0 1 1-64 0V42.666667a32 32 0 0 1 32-32zM519.552 850.410667a32 32 0 0 1 32 32V981.333333a32 32 0 0 1-64 0v-98.922666a32 32 0 0 1 32-32z"
                                        fill="#111111" p-id="5988"></path>
                                    <path
                                        d="M10.666667 519.552a32 32 0 0 1 32-32h98.922666a32 32 0 1 1 0 64H42.666667a32 32 0 0 1-32-32zM850.410667 519.552a32 32 0 0 1 32-32H981.333333a32 32 0 0 1 0 64h-98.922666a32 32 0 0 1-32-32z"
                                        fill="#111111" p-id="5989"></path>
                                </svg>
                            </div>
                            <div class="control_item" v-on:click="tools('add')"
                                :class="this.toolstoggle == 'add' ? 'visited' : ''">
                                <svg t="1717847507199" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="7003" width="20" height="20">
                                    <path
                                        d="M1024 972.8c0 28.275-22.925 51.2-51.2 51.2H51.2C22.922 1024 0 1001.075 0 972.8V51.2C0 22.922 22.922 0 51.2 0h921.6c28.275 0 51.2 22.922 51.2 51.2v921.6z m-51.2-870.4c0-28.277-22.925-51.2-51.2-51.2H102.4c-28.275 0-51.2 22.923-51.2 51.2v819.2c0 28.275 22.925 51.2 51.2 51.2h819.2c28.275 0 51.2-22.925 51.2-51.2V102.4z"
                                        p-id="7004"></path>
                                    <path
                                        d="M768 512c0 14.14-11.46 25.6-25.6 25.6H537.6v209.176c0 11.72-11.46 21.225-25.6 21.225s-25.6-9.505-25.6-21.225V537.6H281.6c-14.14 0-25.6-11.46-25.6-25.6s11.46-25.6 25.6-25.6h204.8V277.225C486.4 265.5 497.86 256 512 256s25.6 9.5 25.6 21.225V486.4h204.8c14.14 0 25.6 11.46 25.6 25.6z"
                                        p-id="7005"></path>
                                </svg>
                            </div>
                            <div class="control_item" v-on:click="tools('update')"
                                :class="this.toolstoggle == 'update' ? 'visited' : ''">
                                <svg t="1717847546108" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="8085" width="20" height="20">
                                    <path
                                        d="M536.896 64l0 248.896-448 0 0 149.312 846.272 0L536.896 64zM487.104 960l0-248.896 448 0L935.104 561.792 88.896 561.792 487.104 960z"
                                        p-id="8086"></path>
                                </svg>
                            </div>
                            <!-- <div class="control_item" v-on:click="tools('delete')"
                                :class="this.toolstoggle == 'delete' ? 'visited' : ''">
                                <svg t="1717847577121" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="9102" wideletedth="20" height="20">
                                    <path
                                        d="M789.8 282.3l-13.9-13.9c-3.8-3.9-8.8-5.8-13.9-5.8-5 0-10.1 1.9-13.9 5.8L511.3 505.1 274.6 268.4c-3.8-3.9-8.9-5.8-13.9-5.8s-10.1 1.9-13.9 5.8l-13.9 13.9c-7.6 7.7-7.6 20.2 0 27.9l236.7 236.7-222.9 222.7c-7.7 7.7-7.7 20.2 0 27.9l13.9 13.9c3.9 3.9 8.9 5.8 13.9 5.8s10.1-1.9 13.9-5.8l222.8-222.8L734 811.4c3.8 3.9 8.9 5.8 13.9 5.8 5.1 0 10.1-1.9 13.9-5.8l13.9-13.9c7.7-7.7 7.7-20.2 0-27.9L553.1 546.8l236.7-236.7c7.7-7.7 7.7-20.2 0-27.8z"
                                        fill="#666666" p-id="9103"></path>
                                </svg>
                            </div> -->
                        </div>
                        <div class="group_list">
                            <el-scrollbar>
                                <div v-for="i in group_render" :key="i" class="list_item"
                                    v-on:click="i == '这个聚集点为空，没有小组' ? '' : select_item(i)"
                                    :class="this.select_group == i ? 'visited' : ''">{{ i }}</div>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
                <div class="control_list" v-if="pattern === 'control_list'">
                    <div><span class="tool_title" style='font-size: 20px;'>成员管理:</span><span
                            style='font-size: 12px; font-weight: 700;'>(当前小组:{{ this.select_group }})</span></div>
                    <div class="group_container">
                        <div class="group">
                            <div class="group_control">
                                <div class="control_item" v-on:click="tools1('selectemployee')"
                                    :class="this.toolstoggle == 'selectemployee' ? 'visited' : ''">
                                    <svg t="1717847459445" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5985" width="20" height="20">
                                        <path
                                            d="M504.448 519.552m-151.189333 0a151.189333 151.189333 0 1 0 302.378666 0 151.189333 151.189333 0 1 0-302.378666 0Z"
                                            fill="#111111" p-id="5986"></path>
                                        <path
                                            d="M504.448 124.714667c-218.069333 0-394.858667 176.768-394.858667 394.837333s176.789333 394.858667 394.858667 394.858667 394.837333-176.789333 394.837333-394.858667S722.517333 124.714667 504.448 124.714667z m0 64c182.72 0 330.837333 148.117333 330.837333 330.837333s-148.117333 330.858667-330.837333 330.858667S173.589333 702.272 173.589333 519.552c0-182.72 148.138667-330.837333 330.858667-330.837333z"
                                            fill="#111111" p-id="5987"></path>
                                        <path
                                            d="M519.552 10.666667a32 32 0 0 1 32 32v98.922666a32 32 0 1 1-64 0V42.666667a32 32 0 0 1 32-32zM519.552 850.410667a32 32 0 0 1 32 32V981.333333a32 32 0 0 1-64 0v-98.922666a32 32 0 0 1 32-32z"
                                            fill="#111111" p-id="5988"></path>
                                        <path
                                            d="M10.666667 519.552a32 32 0 0 1 32-32h98.922666a32 32 0 1 1 0 64H42.666667a32 32 0 0 1-32-32zM850.410667 519.552a32 32 0 0 1 32-32H981.333333a32 32 0 0 1 0 64h-98.922666a32 32 0 0 1-32-32z"
                                            fill="#111111" p-id="5989"></path>
                                    </svg>
                                </div>
                                <div class="control_item" v-on:click="tools1('addemployee')"
                                    :class="this.toolstoggle == 'addemployee' ? 'visited' : ''">
                                    <svg t="1717847507199" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="7003" width="20" height="20">
                                        <path
                                            d="M1024 972.8c0 28.275-22.925 51.2-51.2 51.2H51.2C22.922 1024 0 1001.075 0 972.8V51.2C0 22.922 22.922 0 51.2 0h921.6c28.275 0 51.2 22.922 51.2 51.2v921.6z m-51.2-870.4c0-28.277-22.925-51.2-51.2-51.2H102.4c-28.275 0-51.2 22.923-51.2 51.2v819.2c0 28.275 22.925 51.2 51.2 51.2h819.2c28.275 0 51.2-22.925 51.2-51.2V102.4z"
                                            p-id="7004"></path>
                                        <path
                                            d="M768 512c0 14.14-11.46 25.6-25.6 25.6H537.6v209.176c0 11.72-11.46 21.225-25.6 21.225s-25.6-9.505-25.6-21.225V537.6H281.6c-14.14 0-25.6-11.46-25.6-25.6s11.46-25.6 25.6-25.6h204.8V277.225C486.4 265.5 497.86 256 512 256s25.6 9.5 25.6 21.225V486.4h204.8c14.14 0 25.6 11.46 25.6 25.6z"
                                            p-id="7005"></path>
                                    </svg>
                                </div>
                                <div class="control_item" v-on:click="tools1('removeemployee')"
                                    :class="this.toolstoggle == 'removeemployee' ? 'visited' : ''">
                                    <svg t="1717847577121" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="9102" width="20" height="20">
                                        <path
                                            d="M789.8 282.3l-13.9-13.9c-3.8-3.9-8.8-5.8-13.9-5.8-5 0-10.1 1.9-13.9 5.8L511.3 505.1 274.6 268.4c-3.8-3.9-8.9-5.8-13.9-5.8s-10.1 1.9-13.9 5.8l-13.9 13.9c-7.6 7.7-7.6 20.2 0 27.9l236.7 236.7-222.9 222.7c-7.7 7.7-7.7 20.2 0 27.9l13.9 13.9c3.9 3.9 8.9 5.8 13.9 5.8s10.1-1.9 13.9-5.8l222.8-222.8L734 811.4c3.8 3.9 8.9 5.8 13.9 5.8 5.1 0 10.1-1.9 13.9-5.8l13.9-13.9c7.7-7.7 7.7-20.2 0-27.9L553.1 546.8l236.7-236.7c7.7-7.7 7.7-20.2 0-27.8z"
                                            fill="#666666" p-id="9103"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="group_list" style="height: 90%;">
                                <el-scrollbar>
                                    <div v-for="i in employee_render" :key="i" class="list_item"
                                        v-on:click="i == '该小组暂无组员' ? '' : select_item1(i)"
                                        :class="this.select_employee1 == i ? 'visited' : ''">{{ i }}
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div><span class="tool_title" style='font-size: 20px;'>辅助功能:<span
                                    style='font-size: 12px; font-weight: 700;'>(快速匹配)</span></span></div>
                        <div style='font-size: 14px; font-weight: 600;margin: 10px 20px 10px 10px;'>查找策略:
                            <el-select v-model="tactics" placeholder="option"
                                style="width: 180px;margin-left: 20px;background-color: white;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div style='font-size: 14px; font-weight: 600;margin: 10px 20px 10px 10px;'>查找人数:
                            <el-select v-model="employee" placeholder="option"
                                style="width: 180px;margin-left: 20px;background-color: white;">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <el-button type="primary" style="width: 60px; position: relative; left: 70%;top: 5%;"
                            v-on:click="searchs()">搜索</el-button>
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
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Query from "@arcgis/core/rest/support/Query.js";
import Point from "@arcgis/core/geometry/Point.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import * as geometryService from "@arcgis/core/rest/geometryService.js";
import BufferParameters from "@arcgis/core/rest/support/BufferParameters.js";
import Geometry from "@arcgis/core/geometry/Geometry.js";
import { toRaw } from "vue";
import { ElMessageBox } from 'element-plus'
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
var map;
var view;
var assemble_layer;
var pop_layer;
var middle_employee;
var select_list = [];
var middle;
var res_data;
var draw;
export default {
    data() {
        return {
            select_type: 0,
            tactics: '',
            employee: '',
            toolstoggle: '',
            pattern: 'control_tool',
            assemble: false,
            pop: false,
            hitselect: null,
            mapselect: null,
            select_data: null,
            group_render: [],
            employee_render: [],
            select_pages: false,
            select_pages1: false,
            isSearchpop: false,
            select_list: [],
            select_list1: [],
            select_list2: [],
            select_list3: [],
            select_list4: [],
            activeNames: '',
            select_group: '',
            select_employee: '',
            select_employee1: '',
            select_employee_list: [],
            options: [
                {
                    value: 'areasearch',
                    label: '同区搜索',
                },
                {
                    value: 'distancesearch',
                    label: '临近搜索',
                },
            ],
            options1: [
                {
                    value: '5',
                    label: '<5',
                },
                {
                    value: '10',
                    label: '<10',
                },
                {
                    value: '20',
                    label: '<20',
                },
                {
                    value: '50',
                    label: '<50',
                },
                {
                    value: 'all',
                    label: '全部',
                },
            ],

        }
    },
    watch: {

        select_employee(newvalue) {
            if (newvalue) {
                if (this.toolstoggle == 'add') {
                    this.delete_status()
                    var res = toRaw(newvalue).graphic
                    var data = {
                        gid: res.attributes.gid,
                        longitude: toRaw(this.select_data).mapPoint.longitude,
                        latitude: toRaw(this.select_data).mapPoint.latitude
                    }
                    axios.post('/api/map/addgroup', data).then((res) => {
                        if (res.data == 'ok') {
                            view.popupEnabled = true
                            map.remove(pop_layer)
                            this.popAttain()
                        }
                    })
                } else if (this.toolstoggle == 'update') {
                    this.delete_status()
                    var selectparams = this.select_group.split('-')
                    var data = {
                        type: 1,//表示是改变组长
                        oldpid: selectparams[1],
                        groupid: selectparams[0],
                        newpid: toRaw(newvalue).graphic.attributes.gid
                    }
                    axios.post('/api/map/updategroup', data).then((res) => {
                        console.log(res.data)
                        map.remove(pop_layer)
                        this.popAttain()
                    })
                }
            }
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
                this.popAttain()
            } else {
                map.remove(pop_layer)
                pop_layer = null
            }
        },
        select_data(newvalue) {
            if (this.toolstoggle == 'select') {
                var data = {
                    latitude: toRaw(newvalue).mapPoint.latitude,
                    longitude: toRaw(newvalue).mapPoint.longitude,
                }
                this.delete_status()
                axios.post('/api/map/searchgroup', data).then(res => {
                    if (this.group_render) {
                        this.group_render = []
                    }
                    if (res.data == '这个聚集点暂时为空，没有小组来') {
                        this.group_render.push('这个聚集点为空，没有小组')
                        return
                    } else {
                        for (var i = 0; i < res.data.gid.length; i++) {
                            this.group_render.push(`${res.data.groupid[i]}-${res.data.gid[i]}-${res.data.name[i]}`)
                        }
                    }

                })
            } else if (this.toolstoggle == 'update') {
                var selectparams = this.select_group.split('-')
                var data = {
                    type: 0,//表示是改变组聚集点
                    latitude: toRaw(newvalue).mapPoint.latitude,
                    longitude: toRaw(newvalue).mapPoint.longitude,
                    groupid: selectparams[0],
                    pid: selectparams[1]
                }
                axios.post('/api/map/updategroup', data).then(res => {
                    this.select_group = '',
                        this.delete_status()
                    this.$message.success('聚集点更改成功')
                })
            }
        },

    },
    mounted() {
        this.initmap()
    },
    updated() {

        if (this.pattern === 'control_tool') {

        }
        else if (this.pattern === 'control_list') {
            if (this.select_group) {
                this.attaindata()
            } else {
                this.pattern = 'control_tool'
                this.$message.error('请先选择一个小组')
            }
        }
    },
    methods: {
        popAttain() {
            pop_layer = new GeoJSONLayer({
                url: '/api/map/attainpop',
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
                renderer: employeerender

            });
            map.add(pop_layer);
        },
        searchs() {

            axios.post('/api/map/autosearch', { type: this.tactics, numpeople: this.employee, longitude: toRaw(this.select_data).mapPoint.longitude, latitude: toRaw(this.select_data).mapPoint.latitude }).then(res => {
                console.log(res.data)
                this.delete_select_list()
                this.select_list = res.data.name
                for (var i = 0; i < res.data.avator.length; i++) {
                    this.select_list1.push('http://127.0.0.1:8000/static' + res.data.avator[i])
                }
                this.$message.success('获取人员成功')
                this.select_list2 = res.data.tele
                this.select_list3 = res.data.home
                this.select_list4 = res.data.distance
                this.select_type = 1
                this.isSearchpop = true
            })
        },
        removeemployee() {
            console.log(this.select_employee1)
            axios.post('/api/map/removeemployee', { gid: this.select_employee1.split('-')[0] }).then(res => {
                if (res.data == 'ok') {
                    this.delete_status()
                    this.attaindata()
                    map.remove(pop_layer)
                    this.popAttain()
                }
            })
        },
        delete_select_list() {
            this.select_list = []
            this.select_list1 = []
            this.select_list2 = []
            this.select_list3 = []
            this.select_list4 = []
        },
        addemployee() {
            console.log(this.select_list)
            this.select_pages1 = true

        },
        selectemployee() {
            draw = new Draw({
                view: view
            });
            var re = this
            let action = draw.create(`polygon`, { mode: "click" });
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
        },
        attaindata() {
            var selectparams = this.select_group.split('-')
            var data = {
                groupid: selectparams[0],
                gid: selectparams[1]
            }
            axios.post('/api/map/searchemployee', {
                data
            }).then(res => {
                if (this.employee_render) {
                    this.employee_render = []
                }
                if (res.data.gid.length == 0) {
                    this.employee_render.push('这个小组暂无组员')
                    return
                } else {
                    for (var i = 0; i < res.data.gid.length; i++) {
                        this.employee_render.push(`${res.data.gid[i]}-${res.data.name[i]}`)
                    }
                }

            })


        },
        tools1(type) {
            if (draw) {
                draw.reset()
            }
            this.toolstoggle = type
            switch (this.toolstoggle) {
                case 'selectemployee':
                    if (this.pop) {
                        this.selectemployee()
                    } else {
                        this.$message.error('请先加载员工图层')
                        this.toolstoggle = ''
                    }

                    break;
                case 'addemployee':
                    if (select_list) {
                        this.addemployee()
                    } else {
                        this.$message.error('请先框选人员')
                        this.toolstoggle = ''
                    }
                    break;
                case 'removeemployee':
                    //更换聚集点
                    if (this.select_employee1) {
                        this.removeemployee()
                    } else {
                        ElMessage('请选择需要一个组员')
                        this.toolstoggle = ''
                        return
                    }

                    break
            }
        },
        select_item1(value) {
            this.select_employee1 = value
            var re = this
            this.select_employee1 = value
            var gid = value.split('-')[0]
            searchemployee1(gid, re)
        },
        select_item(value) {
            if (this.pop) {
                var re = this
                this.select_group = value
                var gid = value.split('-')[1]
                searchemployee1(gid, re)
            } else {
                this.$message.error('请打开员工图层')
            }

        },
        delete_status() {
            toRaw(this.mapselect).remove();
            this.hitselect = null
            this.toolstoggle = ''
        },
        middle_employee(index) {
            middle_employee = select_list[index]
            this.$message.success('小组长已经选定')
        },
        close4() {
            //将挑选的组员的gid与组的groupid传给后端
            var gid = []
            var groupid = this.select_group.split('-')[0]
            if (this.isSearchpop) {
                for (var i = 0; i < this.select_employee_list.length; i++) {
                    gid.push(this.select_list2[this.select_employee_list[i]])
                }
                this.isSearchpop = false
            } else {
                for (var i = 0; i < this.select_employee_list.length; i++) {
                    if (select_list[this.select_employee_list[i]].attributes.groupid == '0') {
                        gid.push(select_list[this.select_employee_list[i]].attributes.telephone)
                    } else {
                        this.$message.error('想要添加的人员中有其他组的人，添加失败')
                        return
                    }
                }
            }
            var params = {
                username: gid,
                groupid
            }

            axios.post('/api/map/addemployee', params).then(res => {
                if (res.data == 'ok') {
                    this.close3()
                    map.remove(pop_layer)
                    this.popAttain()
                }
            })
        },
        close3() {
            this.select_pages1 = false
            this.delete_status()
            this.delete_select_list()
            view.graphics.remove(res_data)
            view.popupEnabled = true
        },
        close2() {
            this.select_pages = false
            this.delete_status()
            view.popupEnabled = true
        },
        close1() {
            this.select_pages = false
            this.select_employee = middle_employee;
            this.select_list = []
            this.select_list1 = []
            this.select_list2 = []
            this.select_list3 = []
            middle_employee = undefined
        },
        async add() {
            var re = this
            view.popupEnabled = false
            re.mapselect = await view.on('click', async (e) => {
                re.hitselect = view.hitTest(e).then(function (response) {
                    if (response.results.length) {
                        var graphic = response.results.filter(function (result) {
                            return result.graphic.layer === pop_layer
                        });

                        if (graphic.length) {
                            select_list = graphic
                            re.select_pages = true
                            re.select_list = []
                            re.select_list1 = []
                            re.select_list2 = []
                            re.select_list3 = []
                            re.select_list4 = []
                            for (var i = 0; i < graphic.length; i++) {
                                re.select_list.push(graphic[i].graphic.attributes.name)
                                re.select_list1.push('http://127.0.0.1:8000/static' + graphic[i].graphic.attributes.avator)
                                re.select_list2.push(graphic[i].graphic.attributes.telephone)
                                re.select_list3.push(graphic[i].graphic.attributes.home)
                                if (graphic[i].graphic.attributes.groupid == 0) {
                                    re.select_list4.push("无")
                                } else {
                                    re.select_list4.push(graphic[i].graphic.attributes.groupid)
                                }

                            }
                        } else {
                            re.$message.error('没有找到小组长')
                        }
                    }
                });
            })
        },
        async selectdata() {
            var re = this
            re.mapselect = await view.on('click', async (e) => {
                re.hitselect = view.hitTest(e).then(function (response) {
                    if (response.results.length) {
                        var graphic = response.results.filter(function (result) {
                            return result.graphic.layer === assemble_layer
                        });

                        if (graphic.length) {
                            re.select_data = graphic[0]
                        } else {
                            re.$message.error('没有找到聚集点')
                        }
                    }
                });
            })

        },
        tools(type) {
            if (this.mapselect) {
                this.delete_status()
            }
            this.toolstoggle = type
            switch (this.toolstoggle) {
                case 'select':
                    if (this.assemble) {
                        this.selectdata()
                    } else {
                        this.$message.error('请先加载聚集点图层')
                        this.toolstoggle = ''
                    }

                    break;
                case 'add':
                    if (this.select_data) {
                        if (this.pop) {
                            this.add()
                            this.$message.success('请选择小组组长')
                        } else {
                            this.$message.error('请加载员工图层')
                            this.toolstoggle = ''
                        }
                    } else {
                        this.$message.error('请先选择聚集点')
                        this.toolstoggle = ''
                    }
                    break;
                case 'update':
                    if (this.pop && this.assemble) {
                        ElMessage('请关闭一个图层,如果要更换组的集聚点,请关闭员工图层，如果要更换组长，请关闭聚集点图层')
                        this.toolstoggle = ''
                        return
                    }
                    if (this.pop == false && this.assemble == false) {
                        ElMessage('请打开一个图层,如果要更换组的集聚点,请打开集聚点图层，如果要更换组长，请打开员工图层')
                        this.toolstoggle = ''
                        return
                    }
                    if (this.pop == false && this.assemble == true) {
                        //更换聚集点
                        if (this.select_group) {
                            this.selectdata()
                            this.$message.success('请选择集聚地')
                        } else {
                            ElMessage('请选择需要更新的组')
                            this.toolstoggle = ''
                            return
                        }

                    } else {
                        //更换组长
                        if (this.select_group) {
                            this.add()
                            this.$message.success('请选择小组组长')
                        } else {
                            ElMessage('请选择需要更新的组')
                            this.toolstoggle = ''
                            return
                        }
                    }
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

        }
    }
}
function completePolygon(events, re) {
    //获取所有顶点
    var vertices = events;
    //清除之前绘制
    view.graphics.remove(middle);

    // 生成绘制的图形
    res_data = new Graphic({
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
    searchemployee(res_data, re)

}
function searchemployee1(gid, re) {
    let query = new Query();
    query.where = `gid=${gid}`
    query.returnGeometry = true
    query.outFields = ['*'];
    pop_layer.queryFeatures(query).then(function (res) {
        view.goTo({
            center: [res.features[0].geometry.longitude, res.features[0].geometry.latitude,],
            zoom: 14,
        },
            {
                duration: 2000
            })
    })
}
function searchemployee(geometry, re) {
    let query = new Query();
    query.geometry = geometry.geometry;
    query.spatialRelationship = 'contains'
    query.returnGeometry = true
    query.outFields = ['*'];
    pop_layer.queryFeatures(query).then(function (res) {

        if (res.features.length == 0) {
            re.$message.error('搜索范围内没有人员，请重新搜索')
            view.graphics.remove(res_data)
        } else {
            select_list = res.features
            re.delete_select_list()
            for (var i = 0; i < select_list.length; i++) {
                re.select_list.push(select_list[i].attributes.name)
                re.select_list1.push('http://127.0.0.1:8000/static' + select_list[i].attributes.avator)
                re.select_list2.push(select_list[i].attributes.telephone)
                re.select_list3.push(select_list[i].attributes.home)
                if (select_list[i].attributes.groupid == 0) {
                    re.select_list4.push("无")
                } else {
                    re.select_list4.push(select_list[i].attributes.groupid)
                }

            }
            re.$message.success('已选中人员')
        }
        re.select_type = 0
        re.toolstoggle = ''
    })
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