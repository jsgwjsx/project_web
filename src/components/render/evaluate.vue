<template>
    <div class="evaluate">
        <div class="header">
            <div class="title">民评民议</div>
        </div>
        <div class="flex flex-wrap items-center selectmachine">
            <el-select v-model="value1" placeholder="全部" style="width: 100px; margin: 0 10px;" size="small"
                @change="filter(value1)">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="value2" placeholder="道路" style="width: 100px; margin:0 10px;" filterable size="small"
                @change="filter(value1)" clearable>
                <el-option v-for="item in names" :key="item" :label="item" :value="item" />
            </el-select>
            <div style="color: white; margin:0px 5px;">
                <el-button type="primary"
                    v-on:click="geolocation" circle class="geolocation">
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
            </div>
        </div>
            <el-scrollbar height="600">
                <div class="content">
                    <div class="content_one" v-for="item in content" :key="item">
                        <el-card class="card" shadow="always">
                              {{ item }}
                        </el-card>
                    </div>
    
                </div>
            </el-scrollbar>


    </div>
</template>
<script>
import { toRaw } from "vue";
import axios from 'axios'
import * as echarts from 'echarts'
import { gcj02towgs84 } from '../../js/transform'
import { map, view } from '../mapbody.vue'
var renderdata
export default {
    data() {
        return {
            content: [],
            activename: '1',
            value1: '',
            value2: '',
            options: [
                {
                    value: '全部',
                    label: '全部',
                },
                {
                    value: '南岗区',
                    label: '南岗区',
                },
                {
                    value: '道里区',
                    label: '道里区',
                },
                {
                    value: '道外区',
                    label: '道外区',
                },
                {
                    value: '香坊区',
                    label: '香坊区',
                },
                {
                    value: '呼兰区',
                    label: '呼兰区',
                },
                {
                    value: '松北区',
                    label: '松北区',
                },
                {
                    value: '阿城区',
                    label: '阿城区',
                },
                {
                    value: '双城区',
                    label: '双城区',
                },
                {
                    value: '平房区',
                    label: '平房区',
                },
            ],
            names: ['']
        }
    },
    mounted() {
        this.filter()
    },

    methods: {
        geolocation(){
            //定位
            if(!this.value2)return;
            var params = {
                key: '275ccc01069ccdb142f46282d65100c3',
                position: `${this.value2}`
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
            })
        },
        filter(value1) {
            axios.post('/api/map/filter', { filter: this.value1 }).then(
                res => {
                    this.names = res.data.data
                }
            )
            axios.post('/api/work/comment', { filter: this.value2 }).then(res => {
                this.content = res.data.data
            })
        }
    },
    unmounted() {
        this.$store.state.evaluate = false
    }
}
</script>
<style scoped>
.card {
    width: 100%;
    height: 100%;
 
}
/* :deep(.el-card){
    background-color:rgba(255, 255, 255,0) !important;
    width: 98% !important;
    height: 80px !important;
    border: 1px solid white;
}
:deep(.el-card__body) {
    width: calc(100%-8px);
    padding: 5px;
 
    background-color: rgba(255,255,255, 0); 
   color: #FFFFFF; 
    cursor: pointer;
    border: none;
    color: white;
} */
:deep(.el-card) {
    margin: 0 auto;
    background: linear-gradient(135deg, rgba(18, 112, 166, 0.2), rgba(18, 112, 166, 0.1)) !important; 
    width: 98% !important;
    height: 80px !important;
    border: 1px solid rgba(18, 112, 166, 0.3); /* 半透明蓝色边框 */
    box-shadow: 0 8px 16px rgba(18, 112, 166, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2); /* 优化阴影 */
    border-radius: 12px; /* 更大的圆角效果 */
    backdrop-filter: blur(8px); /* 背景模糊效果 */
    transition: all 0.3s ease; /* 添加过渡动画 */
}

:deep(.el-card:hover) {
    box-shadow: 0 12px 24px rgba(18, 112, 166, 0.3), 0 8px 16px rgba(0, 0, 0, 0.3); /* 悬停时增强阴影 */
    transform: translateY(-4px); /* 悬停时轻微上移 */
}

:deep(.el-card__body) {
    width: calc(100% - 8px); /* 调整宽度 */
    padding: 5px;
    background-color: rgba(255, 255, 255, 0); /* 透明背景 */
    color: #FFFFFF; /* 白色文字 */
    cursor: pointer;
    border: none; /* 无边框 */
}
.geolocation{
    background-color: rgba(0, 0,0, 0);
}
.geolocation:hover{
    background-color:  orange;;
}

.content_one {
    font-family: '宋体';
    color: white;
    font-size: 18px;
    width: 90%;
    min-height: 80px;
    margin: 5px 10px;
}

.content {
    width: 100%;
    height: 60vh;
    height: auto;
    overflow: auto;
    border-radius: 8px; /* 圆角 */
   
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