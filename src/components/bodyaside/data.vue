<template>
    <div>
        <div class="header">
            <div class="title">清雪进度查询模块</div>
        </div>
        <div class="body">
            <div class='upper'>
                <div class="two_title">
                    <svg t="1711533742535" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2159" width="18" height="18">
                        <path
                            d="M186.181818 651.636364H0V0h651.636364v186.181818h186.181818v186.181818h186.181818v651.636364H372.363636v-186.181818H186.181818v-186.181818z m465.454546-372.363637v372.363637H279.272727v93.090909h465.454546V279.272727h-93.090909z m186.181818 186.181818v372.363637H465.454545v93.090909h465.454546V465.454545h-93.090909zM93.090909 93.090909v465.454546h465.454546V93.090909H93.090909z"
                            fill="#bfbfbf" p-id="2160"></path>
                    </svg>图层控制
                </div>
                <div>
                    <div class="button1" v-on:click="attaindata()">请求数据</div>
                    <div class="button1" v-on:click="loaddata()">加载路网</div>
                    <div class="button1" v-on:click="datasummary()">汇总</div>
                    <div class="button1" v-on:click="deletelayer()">删除图层</div>
                </div>
            </div>
            <div class='low'>
                <div class="two_title">
                    <svg t="1711534421694" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5397" width="18" height="18">
                        <path
                            d="M955.069071 864.311021 740.015134 649.258107c-3.752464-3.751441-8.841366-5.860475-14.149255-5.860475-5.306866 0-10.395768 2.108011-14.149255 5.860475l-16.692171 16.692171-38.34226-38.34226c53.03796-59.810201 85.298711-138.442072 85.298711-224.478588 0-186.774871-151.952784-338.727655-338.727655-338.727655S64.527642 216.35456 64.527642 403.12943c0 186.775894 151.952784 338.728678 338.727655 338.728678 86.36909 0 165.276231-32.510438 225.170343-85.913718l38.303374 38.303374-17.34504 17.34504c-7.812943 7.813966-7.812943 20.48352 0 28.297486l215.051891 215.052914c3.753487 3.751441 8.841366 5.860475 14.149255 5.860475 5.306866 0 10.395768-2.108011 14.149255-5.860475l62.334697-62.334697C962.883037 884.794541 962.883037 872.124987 955.069071 864.311021zM104.546078 403.12943c0-164.709319 133.9999-298.709219 298.709219-298.709219s298.709219 133.9999 298.709219 298.709219S567.964616 701.839673 403.255297 701.839673 104.546078 567.838749 104.546078 403.12943zM878.585119 912.496463 691.829691 725.741036l34.036187-34.036187 186.755428 186.755428L878.585119 912.496463z"
                            fill="#bfbfbf" p-id="5398"></path>
                    </svg>筛选
                </div>
                <div class="filtercontent">
                    <el-checkbox v-model="check.checked1" label="一级" size="large" class="black" />
                    <el-checkbox v-model="check.checked2" label="二级" size="large" class="black" />
                    <el-checkbox v-model="check.checked3" label="三级" size="large" class="black" />
                    <el-checkbox v-model="check.checked4" label="四级" size="large" class="black" />
                    <el-checkbox v-model="check.checkhighway" label="高速" size="large" class="black" />
                </div>
                <el-button type="primary" style="margin-left: 120px;" v-on:click="filters()"
                    :disabled="this.disabled">筛选</el-button>
            </div>
            <div class="toggle">当前模式:&emsp;<i style="font-size: 12px;"
                    :class='toggle ? "blue" : "grey"'>{{ togglename }}</i><el-switch v-model="toggle" style="margin: 10px;"
                    v-on:click="togglelayer(toggle)" :disabled="this.disabled" /></div>
        </div>
    </div>
</template>
<script>
import Legend from "@arcgis/core/widgets/Legend.js";
import { bodyrender,statesLabelClass  } from '../../js/render'
import Query from "@arcgis/core/rest/support/Query.js";
import { render, toRaw } from "vue";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import axios from 'axios';
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Graphic from '@arcgis/core/Graphic';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import FeatureFilter from "@arcgis/core/webdoc/geotriggersInfo/FeatureFilter.js";
import { map, view } from '../mapbody.vue'
var features;
var legend;
export default {
    data() {
        return {
            togglename: '正常',
            toggle: true,
            disabled: true,
            params: [],
            check: {
                checked1: true,
                checked2: true,
                checked3: true,
                checked4: true,
                checkhighway: true,
            },
            filter: { checked1: " or highway='一级'", checked2: " or highway='二级'", checked3: " or highway='三级' ", checked4: " or highway = '四级'", checkhighway: " or highway = '高速'" }
        }
    },
    methods: {
        datasummary() {
            this.$store.state.datasummary = !this.$store.state.datasummary
        },
        attaindata() {
            features = new FeatureLayer({
                url: 'https://localhost:6443/arcgis/rest/services/project1/route/FeatureServer/0',
                id:'lineLayer',
                renderer: bodyrender,
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
                outFields: ['*'],
                popupTemplate: {  // 开启 popup
                    title: "{NAME}",
                    content: "{highway}"
                },
                labelingInfo:[statesLabelClass],
                spatialReference: new SpatialReference(102100)
            })
        },
        async loaddata() {
            map.add(features)
            this.disabled = false
            legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: features,
                    title: 'Legend'
                }],
                respectLayerVisibility:false,
            });

            view.ui.add(legend, 'bottom-right');


        },
        deletelayer() {
            map.remove(features)
            view.ui.remove(legend)
            this.disabled = true
            this.togglename = '正常'
            this.toggle = true
            this.check.checked1 = true
            this.check.checked2 = true
            this.check.checked3 = true
            this.check.checked4 = true
            this.check.checkhighway = true

        },
        filters() {
            var arr = "highway=''";
            for (var i in this.check) {
                if (this.check[i]) {
                    arr = arr.concat(this.filter[i])
                }
            }

            filterquery(arr)
        },
        togglelayer(data) {
            if (data === false) {
                this.togglename = '未清理'
                filterquery('isclean=0 ')
            } else {
                this.togglename = '已清理'
                filterquery('isclean=1 or isclean=2')
            }

        }
    },
    mounted() {

    }
}

function filterquery(arr, grade) {

    view.whenLayerView(features).then((res) => {
        res.filter = {
            where: `${arr}`,
        }
    })

}
</script>
<style scoped>
.grey {
    color: wheat;
}

.blue {
    color: #00CCFF;
    ;
}

.toggle {
    color: white;
    margin: 20px;
}

.black {
    color: white;
}

.filtercontent {
    margin: 10px 40px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.three_title {
    display: flex;
    flex-direction: row;
    color: antiquewhite;


}

.two_title {
    color: white;
    height: 30px;
    line-height: 30px;
    ;
}

.button1 {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    color: white;
    border: none;
    width: 100px;
    height: 36px;
    background-color: black;
    font-weight: 800;
    margin: 10px;
    border: 0px solid white;
    border-radius: 5px;
    line-height: 36px;

}

.button1:hover {
    background-color: #dd5a06;
    cursor: pointer;
    opacity: 1;

}

.title {
    display: inline-block;
    position: relative;
    color: white;

}

.header {
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-family: '宋体';
    display: inline-block;
    line-height: 36px;

}</style>