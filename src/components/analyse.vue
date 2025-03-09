<template>
    <div class="asidebar">
        <button class="btn" v-for="(data, index) in navbars" :key="index" v-on:mouseover="colors(index)" v-on:mouseout="outcolors(index)">
            <svg id="details" :t="data.t" :class="[data.class, data.background_color]" :viewBox="data.viewBox"
                :version="data.version" :xmlns="data.xmlns" :p-id="data.p_id" v-on:click="drawer(index,data.name)" >
                <path :d="data.d" :fill="data.fill" :p-id="data.p_uid"></path>
            </svg>
        </button>
        <div class="style_border" :class="[isactive == 0 ? 'one' : '', isactive == 1 ? 'two' : '', isactive == 2 ? 'three' : '']"></div>
        <div class="content" :class="{'is-active':ifslide}">
            <pop v-if="controls.pop"></pop>
            <synthesis v-if="controls.synthesis"></synthesis>
        </div>
    </div>
</template>

<script>
import pop from '../components/analyseside/pop.vue'
import synthesis from '../components/analyseside/synthesis.vue'
var status;
export default {
    data() {
        return {
            isactive:null,
            ifslide:false,
            controls: {
                pop: false,
                synthesis: false,
            },

            navbars: [
                {name:'pop', navbars: this.data, t: "1710844023253", class: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", p_id: "3571", d: "M140.7 843.6c0 21.2-17.2 38.3-38.3 38.3S64 864.8 64 843.6c0-129.1 86.7-239.8 209.6-286.2-59.9-41-99.3-109.9-99.3-187.8 0-125.5 102.1-227.5 227.5-227.5 23.4 0 45.8 4.1 67.1 10.7-25.5 18.1-47.7 40.4-65.4 66.1-0.6 0-1.1-0.2-1.7-0.2-83.2 0-150.8 67.7-150.8 150.8 0 83.2 67.6 150.8 150.8 150.8 0.7 0 1.3-0.2 1.9-0.2 6.6 9.5 13.5 18.7 21.3 27.3-33.9 19.3-63.3 43.6-88.6 70.9C224 644.5 140.7 735.4 140.7 843.6z m784.6 38v0.2h-1.6c-0.7 0-1.3 0.2-2 0.2s-1.3-0.2-2-0.2H324.8c-0.7 0-1.3 0.2-2 0.2s-1.3-0.2-2-0.2h-0.3c-20.1-1.2-36-17.7-36-38.1 0-129.1 86.7-239.8 209.6-286.2-59.9-41-99.3-109.9-99.3-187.8 0-125.5 102.1-227.5 227.5-227.5 125.5 0 227.5 102.1 227.5 227.5 0 77.9-39.4 146.8-99.3 187.8C873.2 603.8 960 714.5 960 843.6c0 19.9-15.3 36.1-34.7 38z", p_uid: "3572", fill: "#bfbfbf" },
                {name:'synthesis', navbars: this.application, t:"1710844411156", class: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", p_id: "7034", d:"M512 736H416.896l-60.16-88.576a31.872 31.872 0 0 0-34.24-7.104 30.592 30.592 0 0 0-23.488 8.832l-54.144 133.12-48.128-70.784a32.128 32.128 0 0 0-34.688-7.04C161.344 704.384 160.704 704 160 704H64a32 32 0 0 0 0 64h95.104l60.16 88.576a31.872 31.872 0 0 0 34.24 7.104 30.592 30.592 0 0 0 23.488-8.832l54.144-133.12 48.128 70.784a32.128 32.128 0 0 0 34.688 7.04c0.704 0 1.344 0.384 2.048 0.384H512a32 32 0 0 0 0-63.936z m-288-576h64v320h64v-320a64 64 0 0 0-64-64h-64a64 64 0 0 0-64 64v320h64v-320z m384 32h-64a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h64a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z m0 544a32 32 0 1 0 0.128 64.128A32 32 0 0 0 608 736z m320-256h-64a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h64a64 64 0 0 0 64-64v-320a64 64 0 0 0-64-64z m0 384h-64v-320h64v320z", fill: "#bfbfbf", p_uid:"7035"},

            ]
        }

    },
    components: {
        pop,
        synthesis
    },
    methods: {
        outcolors(){
            for(var i=0;i<this.navbars.length;i++){
                this.navbars[i].fill='#bfbfbf'
            }
        },
        colors(index) {
            for(var i=0;i<this.navbars.length;i++){
                this.navbars[i].fill='#bfbfbf'
            }
           this.navbars[index].fill = '#2075AC'
        },
        drawer(index,name) {
            this.isactive = index
        if (status ===  name){
            this.ifslide=false
            status=undefined
        }else{
            this.ifslide=true
            status = name
        }
       this.controls.pop = false
       this.controls.synthesis = false

       this.controls[name] = true
    
        }
    }
}
</script>

<!-- <script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
</script> -->
<style scoped>
.is-active{
    transform: translate(355px,0px);
}
.content {
    padding: 10px;
    background-image: url(/8.png);
    background-size: 110% 100%;
    background-position: 50% 50%; 
    background-repeat: no-repeat;
    z-index: 0;
    height: 100%;
    position: absolute;
    top: 0;
    left: -280px;
    width: 250px;
    transition: 0.3s all; 
}
.style_border {
    width: 10px;
    height: 25px;
    background-image: url(/13.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    transition: 0.5s;
    position: absolute;
    top: 25px;
    left: 62px;
    
 
}
/* 样式按钮 */
.btn {
    /* background: linear-gradient(to left, #333,black); */
    margin: 10px 8px;
    background: url(/7.png) no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;
    /* 蓝色背景 */
    border: none;
    /* 移除边框 */
    color: white;
    /* 白色文本 */
    font-size: 16px;
    /* 设置字体大小 */
    cursor: pointer;
    /* 鼠标悬停 */

}
.one {
    top: 25px;
}

.two {
    top: 95px;
}

.three {
    top: 165px;
}
/* 鼠标悬停时背景变暗 */
.btn:hover {
    background: url(/6.png) no-repeat;
    background-size: 115% 115%;
    background-position: 50% 50%;
}

.asidebar {
    display: flex;
    flex-direction: column;
    align-items: start;

    border: 0px;
    
}



#details {
    margin: 10px;
    height: 30px;
    width: 30px;
}
</style>