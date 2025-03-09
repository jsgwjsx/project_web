<template>
    <div class="outer-container">
        <div class="edit_screen" :class="this.$store.state.editscreen !== null ? 'actives' : ''">
            <superuser v-if="this.$store.state.editscreen == 'superuser'" class="superuser">1</superuser>
            <assemble v-if="this.$store.state.editscreen == 'assemble'" class="assemble">3</assemble>
            <snowarea v-if="this.$store.state.editscreen == 'snowarea'" class="snowarea">4</snowarea>
            <pop v-if="this.$store.state.editscreen == 'pop'" class="pop">5</pop>
            <machine v-if="this.$store.state.editscreen == 'machine'" class="machine">6</machine>
        </div>
        <div class="left">
            <div class="left_top">
                清雪资源汇总 <div class="editor" v-on:click="screen(this.editdata)">编辑</div>
                <div class="clear" v-on:click="this.editdata = null">清空</div>
                <div class="left_top_content">
                    <div v-on:click="edit_data('assemble')" :class="editdata == 'assemble' ? 'active' : ''">
                        <div style="margin: 5px;"><svg t="1716640494773" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4393" width="20" height="20">
                                <path
                                    d="M614.4 966.4c-89.6 0-172.8-32-243.2-89.6C243.2 768 192 582.4 192 512c0-76.8 38.4-243.2 140.8-352 64-64 140.8-102.4 224-102.4 83.2 0 140.8 19.2 179.2 64 57.6 70.4 38.4 172.8 19.2 268.8-6.4 38.4-19.2 83.2-19.2 121.6 0 32 19.2 76.8 38.4 121.6 38.4 83.2 76.8 172.8 38.4 243.2-25.6 44.8-70.4 70.4-134.4 83.2-19.2 6.4-38.4 6.4-64 6.4zM556.8 185.6c-51.2 0-96 25.6-134.4 64C345.6 332.8 320 467.2 320 505.6c0 44.8 38.4 192 134.4 275.2 57.6 51.2 128 64 204.8 51.2 25.6-6.4 38.4-12.8 38.4-19.2 12.8-19.2-19.2-89.6-38.4-134.4-19.2-51.2-51.2-115.2-44.8-172.8 0-44.8 12.8-96 19.2-140.8 12.8-64 25.6-140.8 6.4-166.4-12.8-6.4-38.4-12.8-83.2-12.8z"
                                    p-id="4394" fill="#ffffff"></path>
                            </svg></div>聚集点
                    </div>
                    <div v-on:click="edit_data('snowarea')" :class="editdata == 'snowarea' ? 'active' : ''">
                        <div style="margin: 5px;"><svg t="1716640719304" class="icon" viewBox="0 0 1028 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4653" width="20" height="20">
                                <path
                                    d="M302.933333 727.893333a1995.093333 1995.093333 0 0 0 184.32 175.786667 23.04 23.04 0 0 0 30.72 0 2110.293333 2110.293333 0 0 0 184.32-175.786667h29.013334L1024 1024H0l267.946667-296.106667h34.986666zM170.666667 315.733333a331.093333 331.093333 0 0 1 661.333333 0c0 136.533333-104.106667 294.4-314.026667 473.6a23.04 23.04 0 0 1-31.573333 0C277.333333 610.133333 170.666667 452.266667 170.666667 315.733333z m170.666666-14.506666a155.306667 155.306667 0 1 0 45.226667-111.786667A153.6 153.6 0 0 0 341.333333 301.226667z"
                                    fill="#fff" p-id="4654"></path>
                            </svg></div>堆雪区域
                    </div>
                    <div v-on:click="edit_data('pop')" :class="editdata == 'pop' ? 'active' : ''">
                        <div style="margin: 5px;"><svg t="1716641109699" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5761" width="20" height="20">
                                <path
                                    d="M512 533.333333a192 192 0 1 1 0-384 192 192 0 0 1 0 384z m0-42.666666a149.333333 149.333333 0 1 0 0-298.666667 149.333333 149.333333 0 0 0 0 298.666667z"
                                    fill="#ffffff" p-id="5762"></path>
                                <path
                                    d="M512 490.666667a21.333333 21.333333 0 1 1 0 42.666666A277.333333 277.333333 0 0 0 234.666667 810.666667v42.666666a21.333333 21.333333 0 1 1-42.666667 0v-42.666666a320 320 0 0 1 320-320z"
                                    fill="#ffffff" p-id="5763"></path>
                                <path d="M597.333333 810.666667l213.333334 0 0 42.666666-213.333334 0 0-42.666666Z"
                                    fill="#ffffff" p-id="5764"></path>
                                <path d="M597.333333 682.666667l213.333334 0 0 42.666666-213.333334 0 0-42.666666Z"
                                    fill="#ffffff" p-id="5765"></path>
                            </svg></div>员工
                    </div>
                    <div v-on:click="edit_data('machine')" :class="editdata == 'machine' ? 'active' : ''">
                        <div style="margin: 5px;"><svg t="1716641198362" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8268" width="20" height="20">
                                <path
                                    d="M964.6592 363.9808l-128.7168-130.9184a31.488 31.488 0 0 0-23.2448-10.24H383.0784A33.1776 33.1776 0 0 0 350.1056 256v74.5984h-111.104a47.7184 47.7184 0 0 0-32.9728 12.6976l-140.544 130.048a47.9744 47.9744 0 0 0-15.8208 35.84v139.6736a48.7424 48.7424 0 0 0 48.3328 48.3328H179.2a118.8864 118.8864 0 0 0 235.8784 0.4608h236.3392a118.9376 118.9376 0 0 0 235.8784 0h11.008a33.9968 33.9968 0 0 0 29.8496-19.3536l42.5984-89.6a31.6928 31.6928 0 0 0 3.5328-14.08V386.816a32.6656 32.6656 0 0 0-9.6256-22.8352zM115.5584 516.8128L245.76 396.4928h104.3456v235.008H115.5584z m792.8832 50.0736l-30.72 64.6144H416V289.28H798.72l109.824 111.5648z"
                                    fill="#ffffff" p-id="8269"></path>
                            </svg></div>机器
                    </div>
                </div>
            </div>
            <div class="left_bottom">
                最近任务审阅情况
                <el-scrollbar>
                    <div class="left_bottom_content">
                        <el-timeline>
                            <el-timeline-item placement="top" v-for="activity, index in worklist" :key="index"
                                :icon="activity.icon" :type="activity.type" :color="activity.color"
                                :size="activity.size" :hollow="activity.hollow" :timestamp="activity.timestamp">
                                <el-card>
                                    <h4>{{ activity.content }}</h4>
                                    <p v-if="activity.timesloat">{{ activity.timesloat }}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="center">
            <div class="group_list">
                <div class="echartsshow">
                    <div class="groupEcharts" id="groupEcharts">

                    </div>
                    <div class="cityEcharts" id="cityEcharts">

                    </div>
                </div>
                <el-table :data="tableData" height="200px" style="width: 100%; flex:2" @row-click="changeSelect">
                    <el-table-column prop="groupid" label="组号" width="180" />
                    <el-table-column prop="groupername" label="组长姓名" width="180" />
                    <el-table-column prop="accumulation" label="聚集地" />
                </el-table>
            </div>
        </div>
        <div class="right">
            <div class="right_top">
                <div class="right_top_content" id="right_top_content">
                </div>
            </div>
            <div class="right_bottom">
                <div v-on:click="screen('superuser')">
                    <div class="icons"><svg t="1716709990667" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="11909" width="50" height="50">
                            <path
                                d="M768.111993 295.341541a295.021561 295.021561 0 0 0-83.130804-206.835073 277.998625 277.998625 0 0 0-401.382914-0.063996 295.277545 295.277545 0 0 0-83.130804 206.899069c0 60.604212 17.726892 118.648584 51.51678 168.053497 9.343416 13.823136 28.030248 17.27892 41.405412 7.487532a31.35804 31.35804 0 0 0 7.295544-42.685332 234.609337 234.609337 0 0 1-40.701456-132.855697c0-127.480032 100.601712-231.217549 224.369977-231.217549 123.704268 0 224.305981 103.737516 224.305981 231.217549S607.994 526.55909 484.289732 526.55909c-61.180176 0-120.440472 12.351228-176.308981 36.733704-53.948628 23.422536-102.3936 57.148428-143.991 100.025749a465.954878 465.954878 0 0 0-97.081933 148.214736 476.770202 476.770202 0 0 0-35.581776 181.748641c0 16.95894 13.311168 30.654084 29.822136 30.654084a30.07812 30.07812 0 0 0 29.630148-30.654084c0-223.410037 176.500969-405.28667 393.44741-405.28667a278.318605 278.318605 0 0 0 200.691457-85.75464 295.149553 295.149553 0 0 0 83.1948-206.899069z m-230.385601 382.760078c0 16.766952 13.311168 30.590088 29.75814 30.590088h395.239298a30.334104 30.334104 0 0 0 29.886132-30.590088 30.334104 30.334104 0 0 0-29.886132-30.846072H567.484532a30.206112 30.206112 0 0 0-29.75814 30.846072z m424.997438 125.304168H567.484532a30.270108 30.270108 0 0 0-29.75814 30.654084c0 16.95894 13.311168 30.71808 29.75814 30.71808h395.239298a30.334104 30.334104 0 0 0 29.886132-30.71808 30.334104 30.334104 0 0 0-29.886132-30.654084z m0 156.150241H567.484532c-16.446972 0-29.75814 13.75914-29.75814 30.654084s13.311168 30.590088 29.75814 30.590088h395.239298c16.510968 0 29.886132-13.631148 29.886132-30.590088s-13.375164-30.654084-29.886132-30.654084z"
                                p-id="11910" fill="#ffffff"></path>
                        </svg></div>个人信息
                </div>

                <div v-on:click="loginout()">
                    <div class="icons"><svg t="1716709348453" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9658" width="50" height="50">
                            <path
                                d="M761.607758 636.772848c-12.815515 32.023273-35.219394 60.819394-57.623273 86.388364a256 256 0 0 1-86.388364 57.654303c-31.992242 12.784485-67.180606 22.372848-105.596121 22.372849s-73.572848-6.392242-105.596121-22.372849a406.590061 406.590061 0 0 1-86.388364-57.654303 255.720727 255.720727 0 0 1-57.592242-86.388364c-12.846545-31.961212-22.434909-67.211636-22.434909-105.596121 0-22.341818 3.227152-44.776727 6.423272-63.984485 6.361212-22.341818 12.784485-41.580606 22.372849-60.819394 9.619394-19.145697 22.403879-35.157333 35.219394-54.396121A215.350303 215.350303 0 0 1 352.007758 307.2c9.619394-6.423273 19.207758-9.588364 28.796121-6.423273 9.619394 3.258182 19.207758 6.423273 25.6 16.011637 6.423273 9.588364 9.619394 19.238788 6.423273 28.796121-3.227152 9.619394-6.423273 19.176727-16.042667 25.6-25.6 19.207758-47.972848 41.611636-60.788364 70.376727-12.784485 28.858182-22.434909 57.623273-22.434909 89.615515 0 25.6 6.423273 51.2 16.011636 76.8 9.619394 25.6 25.6 44.838788 41.611637 60.819394a187.578182 187.578182 0 0 0 60.819394 41.580606c24.203636 10.550303 50.362182 15.980606 76.768969 16.011637 25.6 0 51.2-6.392242 76.831031-16.011637 25.6-9.588364 44.807758-25.6 60.788363-41.580606a187.578182 187.578182 0 0 0 41.580606-60.819394c10.550303-24.234667 15.980606-50.362182 16.042667-76.8 0-31.961212-6.392242-60.788364-19.176727-86.388363-12.815515-25.6-32.023273-51.2-57.654303-67.211637-9.557333-6.361212-12.784485-15.949576-15.980606-25.6-3.227152-9.588364 0-19.176727 6.423273-28.765091 6.361212-9.619394 15.980606-12.784485 25.6-16.011636 9.588364-3.196121 19.145697 0 28.76509 6.361212A297.890909 297.890909 0 0 1 716.8 358.4c12.784485 16.011636 25.6 35.188364 35.188364 51.2 9.619394 19.176727 16.011636 38.415515 22.434909 57.592242 6.392242 19.207758 6.392242 41.580606 6.392242 63.984485 3.196121 38.415515-3.227152 73.634909-19.207757 105.658182v-0.062061zM473.584485 265.619394c0-9.588364 3.227152-19.176727 12.815515-28.827152 7.478303-7.974788 17.873455-12.567273 28.796121-12.784484 9.619394 0 19.176727 3.258182 25.6 12.784484 8.005818 7.509333 12.629333 17.904485 12.815515 28.858182v230.4c0 9.557333-3.227152 19.207758-12.815515 25.631031-6.423273 6.361212-15.980606 12.722424-25.6 12.722424-9.619394 0-19.207758-3.196121-28.796121-12.784485-6.392242-6.392242-12.815515-16.011636-12.815515-25.6V265.588364zM512 0C230.4 0 0 230.4 0 512S230.4 1024 512 1024 1024 793.6 1024 512 793.6 0 512 0z"
                                fill="#fff" p-id="9659"></path>
                        </svg></div>退出登录
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import axios from 'axios';
import { MoreFilled, SuccessFilled } from '@element-plus/icons-vue'
import superuser from '../components/datamanager/superuser.vue'
import assemble from '../components/datamanager/assemble.vue'
import snowarea from '../components/datamanager/snowarea.vue'
import pop from '../components/datamanager/pop.vue'
import machine from '../components/datamanager/machine.vue'
import { shallowRef, toRaw } from 'vue';

var cityEcharts
var groupEcharts;
export default {
    data() {
        return {
            worklist: '',
            editdata: null,
            tableData: [

            ],
            avargeData: {
                workCount: '',
                workCompCount: '',
                submitCount: '',
                timelyCount: '',
                popnum: ''
            },
            citywork: 0

        }
    },
    components: {
        superuser,
        assemble,
        pop,
        machine,
        snowarea,
    },
    mounted() {
        this.init()
        this.workDataAttain()
        this.tableDataAttain()
    },
    unmounted() {
        cityEcharts = null
        groupEcharts = null;
    },
    methods: {
        changeSelect(value) {
            var data = toRaw(value)
            this.initGroup(data, this.avargeData, { groupwork: data.workCompCount, citywork: this.citywork })
        },
        tableDataAttain() {
            axios.get('/api/map/databaseGroup').then(res => {
                this.tableData = res.data.data
                var obj = {
                    workCount: 0,
                    workCompCount: 0,
                    submitCount: 0,
                    timelyCount: 0,
                    popnum: 0
                }
                for (var i = 0; i < res.data.data.length; i++) {
                    obj.workCount += res.data.data[i].workCount
                    obj.workCompCount += res.data.data[i].workCompCount
                    obj.popnum += res.data.data[i].popnum
                    obj.submitCount += res.data.data[i].submitCount
                    obj.timelyCount += res.data.data[i].timelyCount
                }
                var avargeData = {
                    workCount: parseFloat(parseFloat(obj.workCount / res.data.data.length).toFixed(1)),
                    workCompCount: parseFloat(parseFloat(obj.workCompCount / res.data.data.length).toFixed(1)),
                    submitCount: parseFloat(parseFloat(obj.submitCount / res.data.data.length).toFixed(1)),
                    timelyCount: parseFloat(parseFloat(obj.timelyCount / res.data.data.length).toFixed(1)),
                    popnum: parseFloat(parseFloat(obj.popnum / res.data.data.length).toFixed(1)),
                }
                console.log(avargeData.workCompCount,avargeData.workCount)
                this.avargeData = avargeData
                this.citywork = obj.workCompCount
                this.initGroup(this.tableData[0], this.avargeData, { groupwork: this.tableData[0].workCompCount, citywork: this.citywork })
            })
        },
        closescreen() {
            this.$store.state.editscreen = null
        },
        loginout() {
            axios.get('/api/work/loginout').then(res => {
                location.href = 'login'
            })
        },
        screen(data) {
            this.$store.state.editscreen = data
        },
        workDataAttain() {
            var computedtime = []
            axios.get('/api/map/attainallwork').then(res => {
                this.worklist = processData(res.data.data)

            })
        },
        initGroup(groupdata, avargeData, work) {
            console.log(groupdata,avargeData)
            var max = Math.max(groupdata.workCount,groupdata.popnum)
            max = Math.max(avargeData.popnum,max)
            max = Math.max(avargeData.workCount,max)
            console.log(work)
            if (!groupEcharts) {
                // 基于准备好的dom，初始化echarts实例
                groupEcharts = echarts.init(document.getElementById('groupEcharts'));
            }
            // 指定图表的配置项和数据
            var groupoption = {
                title: {
                    text: '小组评分',
                    textStyle: {
                        color: "#fff"
                    },
                },
                tooltip: {},
                legend: {
                    data: ['小组水平', '平均水平'],
                    textStyle: {
                        color: "#fff"
                    },
                },
                radar: {
                    // 设置雷达图的指示器，指定各个维度的名称和最大值
                    indicator: [
                        { name: '任务准时完成率', max: 100 },
                        { name: '完成率', max: 100 },
                        { name: '任务次数', max: max },
                        { name: '工作优质率', max: 100 },
                        { name: '任务人数', max: max },
                    ]
                },
                series: [{
                    name: '预算 vs 开销',
                    type: 'radar',
                    // 设置数据系列
                    data: [
                        {
                            value: [((groupdata.timelyCount / groupdata.workCompCount).toFixed(3)*100), ((groupdata.workCompCount / groupdata.workCount).toFixed(3)*100), groupdata.workCount, ((groupdata.workCompCount / groupdata.submitCount).toFixed(3)*100), groupdata.popnum],
                            name: '小组水平'
                        },
                        {
                            value: [((avargeData.timelyCount / avargeData.workCompCount).toFixed(3)*100), ((avargeData.workCompCount / avargeData.workCount).toFixed(3)*100), avargeData.workCount, ((avargeData.workCompCount / avargeData.submitCount).toFixed(3)*100), avargeData.popnum],
                            name: '平均水平'
                        }
                    ]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            groupEcharts.setOption(groupoption);

            if (!cityEcharts) {
                // 基于准备好的dom，初始化echarts实例
                cityEcharts = echarts.init(document.getElementById('cityEcharts'));
            }

            var cityoption = {
                title: {
                    text: '已完成清雪任务占比',
                    textStyle: {
                        color: "#fff"
                    },
                },
                legend: {
                    top: '5%',
                    left: 'center',
                    textStyle: {//图例文字的样式
                        color: '#fff',
                        fontSize: 12
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 1,

                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: work.groupwork, name: '小组清雪任务' },
                            { value: work.citywork, name: '其他清雪任务' },
                        ]
                    }
                ]
            };
            cityEcharts.setOption(cityoption);
        },
        init() {
            this.initContent()
            // this.initGroup()
        },
        edit_data(data) {
            this.editdata = data
        },
        initContent() {
            axios.get('/api/map/databaseArea').then(res => {
                var content = echarts.init(document.getElementById('right_top_content'))
                var option = {
                    title: {
                        text: '各区域清雪资源一览',
                        textStyle: {
                            color: "#fff"
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['人员数量', '机器数量'],
                        show: true,
                        top: '20px',
                        textStyle: {
                            color: "#fff"
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    dataset: [
                        {
                            dimensions: ['area', '机器数量', '人员数量',],
                            source: [
                                ['香坊区', res.data['香坊区'][1], res.data['香坊区'][0]],
                                ['南岗区', res.data['南岗区'][1], res.data['南岗区'][0]],
                                ['道里区', res.data['道里区'][1], res.data['道里区'][0]],
                                ['阿城区', res.data['阿城区'][1], res.data['阿城区'][0]],
                                ['平房区', res.data['平房区'][1], res.data['平房区'][0]],
                                ['呼兰区', res.data['呼兰区'][1], res.data['呼兰区'][0]],
                                ['道外区', res.data['道外区'][1], res.data['道外区'][0]],
                                ['松北区', res.data['松北区'][1], res.data['松北区'][0]],
                                ['双城区', res.data['双城区'][1], res.data['双城区'][0]]
                            ]
                        },
                        {
                            transform: {
                                type: 'sort',
                                config: { dimension: '人员数量', order: 'asc' }
                            }
                        }
                    ],
                    xAxis: {

                        type: 'value',
                        splitArea: { show: false },
                        splitLine: {//去除网格线
                            show: false
                        },
                        show: false,
                    },
                    yAxis: {
                        type: 'category',
                        axisLabel: {//修改坐标系字体颜色
                            show: true,
                            color: "#fff",
                            fontSize: '12px',
                        },

                        splitArea: { show: false },
                        splitLine: {//去除网格线
                            show: false
                        },
                    },
                    series: [{
                        type: 'bar',
                        name: '人员数量',
                        encode: { x: '人员数量', y: 'area' },
                        datasetIndex: 1
                    },
                    {
                        type: 'bar',
                        name: '机器数量',
                        encode: { x: '机器数量', y: 'area' },
                        datasetIndex: 1
                    },
                    ]
                };
                content.setOption(option)
            })

        }

    }

}
function processData(data) {
    //三种对列，一种是，xxx时间，已经发布任务,submittime
    //一种是,xxx时间，已经完成任务，请尽快批阅,computedtime
    //一种是，xxx时间批阅完成,readtime
    var submitask = []
    var computetask = []
    var readtask = []
    data.map(item => {
        if (item.computedtime) {
            var obj = {
                arrtype: 'computed',
                timestamp: parseInt(item.computedtime),
                ...item
            }
            submitask.push(obj)
        }
        if (item.submittime) {
            var obj = {
                arrtype: 'submit',
                timestamp: parseInt(item.submittime),
                ...item
            }
            submitask.push(obj)
        }
        if (item.readtime) {
            var obj = {
                arrtype: 'read',
                timestamp: parseInt(item.readtime),
                ...item
            }
            submitask.push(obj)
        }
    })
    // 获取当前日期
    const currentDate = parseInt(Date.parse(new Date()) / 1000);
    var combinedArray = [...submitask, ...computetask, ...readtask]
    // 过滤掉未来的日期，并按日期从近到远排序
    const sortedArray = combinedArray
        .filter(item => item.timestamp <= currentDate) // 过滤掉未来的日期
        .sort((a, b) => b.timestamp - a.timestamp); // 按日期从近到远排序
    // 取前五个日期
    const closestDates = sortedArray.slice(0, 5);
    var datalist = []
    for (var i = 0; i < closestDates.length; i++) {
        if (closestDates[i].arrtype == 'submit') {
            if (closestDates[i].type == 'workmachine') {
                var obj = {
                    content: `任务已经发布给了车牌号为${closestDates[i].groupid},请让其尽快完成`,
                    timestamp: processtime(closestDates[i].timestamp * 1000),
                    size: 'large',
                    type: 'primary',
                    color: '#0bbd87',
                    timesloat: `任务时间:${processtime(closestDates[i].starttime * 1000)}-${processtime(closestDates[i].endtime * 1000)}`
                }
                datalist.push(obj)
            } else {
                var obj = {
                    content: `任务已经发布给了第${closestDates[i].groupid}小组,请让其尽快完成`,
                    timestamp: processtime(closestDates[i].timestamp * 1000),
                    size: 'large',
                    type: 'primary',
                    color: '#0bbd87',
                    timesloat: `任务时间:${processtime(closestDates[i].starttime * 1000)}-${processtime(closestDates[i].endtime * 1000)}`
                }
                datalist.push(obj)
            }
        }
        if (closestDates[i].arrtype == 'computed') {
            if (closestDates[i].type == 'workmachine') {
                var obj = {
                    content: `车牌号为${closestDates[i].groupid}的任务已经提交,请尽快审阅`,
                    timestamp: processtime(closestDates[i].timestamp * 1000),
                    color: '#green',
                    size: 'large',
                    type: 'primary',
                    icon: shallowRef(MoreFilled),
                    timesloat: `任务时间:${processtime(closestDates[i].starttime * 1000)}-${processtime(closestDates[i].endtime * 1000)}`
                }
                datalist.push(obj)
            } else {
                var obj = {
                    content: `小组号为${closestDates[i].groupid}的任务已经提交,请尽快审阅`,
                    timestamp: processtime(closestDates[i].timestamp * 1000),
                    color: '#green',
                    size: 'large',
                    type: 'primary',
                    icon: shallowRef(MoreFilled),
                    timesloat: `任务时间:${processtime(closestDates[i].starttime * 1000)}-${processtime(closestDates[i].endtime * 1000)}`
                }
                datalist.push(obj)
            }
        }
        if (closestDates[i].arrtype == 'read') {
            if (closestDates[i].type == 'workmachine') {
                var obj = {
                    content: `车牌号为${closestDates[i].groupid}的任务已经通过审阅`,
                    timestamp: processtime(closestDates[i].timestamp * 1000),
                    color: '#green',
                    size: 'large',
                    type: 'primary',
                    icon: shallowRef(SuccessFilled),
                }
                datalist.push(obj)
            } else {
                var obj = {
                    content: `小组号为${closestDates[i].groupid}的任务已经通过审阅`,
                    timestamp: processtime(closestDates[i].timestamp * 1000),
                    size: 'large',
                    type: 'primary',
                    icon: shallowRef(SuccessFilled),
                }
                datalist.push(obj)
            }
        }
    }
    return datalist

}
function processtime(timestamp) {
    const date = new Date(timestamp);
    // 转换为本地时间字符串
    const localTimeString = date.toLocaleString();
    return localTimeString
}



</script>
<style scoped>
.groupEcharts {
    flex: 1;
}

.cityEcharts {
    flex: 1;
}

.echartsshow {
    flex: 3;
    display: flex;
    flex-direction: row;
}

.machine {
    width: 80%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFAFA;
    z-index: 5;
    display: flex;
    flex-direction: row;
}

.pop {
    width: 80%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFAFA;
    z-index: 5;
    display: flex;
    flex-direction: row;
}

.snowarea {
    width: 80%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFAFA;
    z-index: 5;
    display: flex;
    flex-direction: row;
}

.assemble {
    width: 80%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFAFA;
    z-index: 5;
    display: flex;
    flex-direction: row;
}

.comment {
    width: 30%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFAFA;
    z-index: 5;
}

.superuser {
    width: 30%;
    height: 60%;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFAFA;
    z-index: 5;
}

.edit_screen {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    color: black;
}

.actives {
    display: block;
}


.icons {
    width: 100%;
    height: 50px;
    opacity: 0.8;
}

.active {
    background-color: #dd5a06;
}

.editor:hover {
    color: #dd5a06;
    cursor: pointer;
}

.editor {
    float: right;
    margin: 5px 10px 0px 0px;
    font-size: 12px;
    color: #1A4B77;
}

.clear:hover {
    color: white;
    cursor: pointer;
}

.clear {
    float: right;
    margin: 5px 10px 0px 0px;
    font-size: 12px;
    color: #1A4B77;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.outer-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    display: absolute;
    left: 0;
    display: flex;
    overflow: hidden;
    color: white;
}

.left {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px 5px;
    box-sizing: border-box;
    background-image: url(/8.png);
    background-size: 110% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    margin: 5px;
}

.left_top {
    width: 100%;
    flex: 1;
    height: 100%;
    font-weight: 700;
    font-size: 16px;
    padding: 2px;
    box-sizing: border-box;
}

.left_top_content {
    height: 80%;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.left_top_content>div {
    width: 50%;
    height: 50%;
    padding: 10px 5px;
    box-sizing: border-box;
    text-align: center;
    font-size: 12px;
    line-height: 50%;
}

.left_top_content>div:hover {
    background-color: #dd5a06;
    cursor: pointer;
}

.left_bottom {
    overflow: auto;
    width: 100%;
    flex: 3;
    height: 100%;
    font-weight: 700;
    font-size: 16px;
    padding: 2px;
    box-sizing: border-box;
    overflow: hidden;
}

.left_bottom_content {
    padding: 2vh 2vw;
    height: 93%;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: hidden;
}

.center {
    background-image: url(/8.png);
    background-size: 110% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    flex: 2;
    width: 100%;
    height: 100%;
    padding: 10px 5px;
    box-sizing: border-box;
    margin: 5px;
    font-weight: 700;
    font-size: 16px;
}

.center_content {
    width: 100%;
    height: 95%;
}

.group_list {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.right {
    background-image: url(/8.png);
    background-size: 110% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    margin: 5px;
    flex: 1;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 10px 5px;
    box-sizing: border-box;
}

.right_top {
    width: 100%;
    flex: 3;
    height: 100%;
    font-weight: 700;
    font-size: 16px;
    padding: 2px;
}

.right_top_content {
    width: 100%;
    height: 100%;
}

.right_bottom {
    width: 100%;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    align-items: center;
}

.right_bottom>div {
    width: 80px;
    height: 80px;
    font-size: 14px;
    font-weight: 700;
    margin-top: 3px;
    padding: 3px;
}

.right_bottom>div:hover {
    background-color: #077EBF;
    cursor: pointer;
}
</style>
