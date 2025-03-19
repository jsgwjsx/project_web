<template>
  <div id="navbar">
    <div class="top_side">
      <div class="left_side" v-for="(data, index) in navbar1" :key="index" v-on:click="go(data.name, data.is_needmap)">
        <svg id="detail1" :t="data.t" :class="[data.class]" :viewBox="data.viewBox" :version="data.version"
          :xmlns="data.xmlns" :p-id="data.p_id" >
          <path :d="data.d" :fill="data.fill" :p-id="data.p_uid"></path>
        </svg>
        <div class="titles">{{ data.describ }}</div>
      </div>
      <div class="not_body"></div>
      <div class="not_body"></div>
      <div class="right_side" v-for="(data, index) in navbar2" :key="index" v-on:click="go(data.name, data.is_needmap)">
          <svg id="detail2" :t="data.t" :class="[data.class]" :viewBox="data.viewBox" :version="data.version"
          :xmlns="data.xmlns" :p-id="data.p_id" >
          <path :d="data.d" :fill="data.fill" :p-id="data.p_uid"></path>
        </svg>
        <div class="titles">{{data.describ}}</div>
        </div>
    </div>
  </div>
  <el-container class="container">
    <el-aside class="aside" v-if="!control.aggregateActive">
      <bodyshow v-if="control.bodyshowActive" class="sidbar"></bodyshow>
      <analyse v-if="control.analyseActive" class="analyse"></analyse>
      <work v-if="control.workActive" class="work"></work>
    </el-aside>
    <el-main class="mapcontainer" style="padding: 0;">
      <mapbody v-if="mapActive" class="mapbody"></mapbody>
      <aggregate v-if="control.aggregateActive"></aggregate>
    </el-main>
    <summarydata v-if="this.$store.state.datasummary"></summarydata>
    <sumpeople v-if="this.$store.state.sumpeople"></sumpeople>
    <evaluate v-if="this.$store.state.evaluate"></evaluate>
    <prediction v-if="this.$store.state.prediction"></prediction>
    <weatherdate v-if="this.$store.state.weatherdata"></weatherdate>
    <analysesgrade v-if="this.$store.state.analysesgrade"></analysesgrade>
    <workconfirm v-if="this.$store.state.workconfirm"></workconfirm>
  </el-container>
</template>
<script>
import workconfirm from './components/render/workconfirm.vue'
import weatherdate from './components/render/weatherdata.vue'
import prediction from './components/render/prediction.vue'
import evaluate from './components/render/evaluate.vue'
import sumpeople from './components/render/sumpeople.vue'
import summarydata from './components/render/summarydata.vue'
import analysesgrade from './components/render/analysegrade.vue'
import bodyshow from './components/bodyshow.vue'
import mapbody from './components/mapbody.vue'
import analyse from './components/analyse.vue'
import work from './components/work.vue'
import aggregate from './components/aggregate.vue'

export default {
  data() {
    return {

      datasummary: false,
      aggregateActive: true,
      mapActive: true,
      control: {
        analyseActive: false,
        workActive: false,
        bodyshowActive: true,
        feedbackActive: false,
        aggregateActive: false
      },
      navbar1: [
        { describ: '数据展示', name: 'bodyshowActive', is_needmap: true, t: "1710815503079", class: "icon", viewBox: "0 0 1029 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", p_id: '2236', d: "M661.333333 128a128 128 0 0 1 82.773334 225.621333l56.832 117.482667a117.333333 117.333333 0 1 1-57.578667 27.882667l-56.832-117.461334a128.618667 128.618667 0 0 1-43.52 1.173334l-133.546667 266.368a128 128 0 1 1-182.186666 16.938666l-103.445334-137.514666a106.666667 106.666667 0 1 1 52.48-36.48l102.293334 135.978666a128.597333 128.597333 0 0 1 73.578666-6.784l131.861334-263.168A128 128 0 0 1 661.333333 128zM426.666667 688.490667a58.176 58.176 0 1 0 0 116.352 58.176 58.176 0 0 0 0-116.352zM821.333333 533.333333a53.333333 53.333333 0 1 0 0 106.666667 53.333333 53.333333 0 0 0 0-106.666667zM192 378.176a48.490667 48.490667 0 1 0 0 96.981333 48.490667 48.490667 0 0 0 0-96.981333z m469.333333-180.352a58.176 58.176 0 1 0 0 116.352 58.176 58.176 0 0 0 0-116.352z", p_uid: "2237", fill: "#bfbfbf" },
        { describ: '路段评价分析', name: 'analyseActive', is_needmap: true, t: "1709793645529", class: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", p_id: "2178", d: "M918.022666 721.943817l-172.37701-99.522787 131.539771-35.249053a22.378321 22.378321 0 0 0-11.58238-43.231719l-174.774687 46.831432-131.670844-76.019157 149.503169-86.316381 174.774687 46.831433a22.327171 22.327171 0 0 0 5.802379 0.770453 22.378321 22.378321 0 0 0 5.780001-43.998976l-131.542968-35.249052 154.544685-89.22876a22.381518 22.381518 0 0 0-22.378321-38.759252l-154.541488 89.225563 35.245855-131.539771a22.378321 22.378321 0 0 0-43.231719-11.58238l-46.828235 174.768294-149.503169 86.316381V303.363716l127.943255-127.943255a22.378321 22.378321 0 0 0-31.64934-31.646142l-96.293915 96.293915v-178.451126a22.378321 22.378321 0 1 0-44.756642 0v178.451126l-96.290718-96.293915a22.378321 22.378321 0 0 0-31.64934 31.646142l127.943255 127.943255v172.629566l-149.499972-86.313185-46.834629-174.774687a22.378321 22.378321 0 0 0-43.231719 11.585577l35.249052 131.539771-154.544685-89.225563a22.378321 22.378321 0 0 0-22.378321 38.759252l154.547882 89.22876-131.546164 35.245855a22.378321 22.378321 0 0 0 11.582379 43.231719l174.777884-46.831432 149.499972 86.313184-131.670844 76.022354-174.768293-46.831432a22.378321 22.378321 0 0 0-11.58238 43.228522l131.539771 35.249053-172.37701 99.522787a22.381518 22.381518 0 0 0 11.208342 41.761144 22.244051 22.244051 0 0 0 11.166782-3.001892l172.380207-99.522787-35.249052 131.542967a22.378321 22.378321 0 0 0 43.231719 11.58238l46.828235-174.774687 131.667647-76.019157v152.035116l-127.943255 127.943255a22.378321 22.378321 0 0 0 31.64934 31.646143l96.290718-96.293915v199.045575a22.378321 22.378321 0 1 0 44.756642 0v-199.048772l96.293915 96.293915a22.378321 22.378321 0 0 0 31.64934-31.646142l-127.943255-127.943255V553.511785l131.667647 76.019157 46.828235 174.774687a22.384715 22.384715 0 0 0 27.40705 15.82467 22.378321 22.378321 0 0 0 15.82467-27.40705l-35.245856-131.542967 172.380207 99.522787a22.371927 22.371927 0 0 0 30.568786-8.190466 22.371927 22.371927 0 0 0-8.187268-30.568786z", fill: "#bfbfbf", p_uid: "2179" },

      ],
      navbar2: [
        { describ: '作业管理', name: 'workActive', is_needmap: true, t: "1710816682832", class: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", p_id: "7972", d: "M60.09 342.9l-0.046 0.093 137.216 65.024-0.093 0.094 70.795 32.86-0.233 0.466L503.203 552.96l0.046-0.14c2.793 1.35 5.772 2.188 9.03 2.188s6.237-0.838 8.984-2.188l0.093 0.14 256.837-121.67 1.304 0.605 48.454-23.505-0.699-0.373 137.31-65.024-0.094-0.093a20.852 20.852 0 0 0 12.102-18.85 20.945 20.945 0 0 0-12.102-18.805l0.047-0.14-443.16-209.92-0.092 0.094a20.945 20.945 0 0 0-8.984-2.188c-3.258 0-6.237 0.93-9.03 2.188l-0.046-0.14-443.16 209.92 0.047 0.186a20.899 20.899 0 0 0-12.102 18.804c0 8.379 4.98 15.454 12.102 18.851z m767.162 258.56l137.31-65.024-0.094-0.14a20.852 20.852 0 0 0 12.102-18.804 20.945 20.945 0 0 0-12.102-18.85l0.047-0.14-104.541-49.525-48.547 23.552 94.953 44.963-394.1 186.694-394.101-186.694 96.163-45.568-49.618-22.993L59.997 498.5l0.093 0.14a20.899 20.899 0 0 0-12.102 18.851c0 8.379 4.98 15.407 12.102 18.805l-0.046 0.14L197.26 601.46l-0.326 0.187 72.657 33.698-0.14 0.28 233.752 110.778 0.046-0.14c2.793 1.304 5.772 2.188 9.03 2.188a20.945 20.945 0 0 0 8.984-2.188l0.093 0.14 256.837-121.716 49.06-23.273z m30.301 40.495l105.519 50.036v0.093a20.945 20.945 0 0 1 12.055 18.851 20.945 20.945 0 0 1-12.102 18.805l0.047 0.14L519.959 939.8l-0.14-0.094a21.132 21.132 0 0 1-8.983 2.141 20.806 20.806 0 0 1-8.983-2.14l-0.093 0.092L58.6 729.88l0.047-0.14a20.899 20.899 0 0 1-12.102-18.804c0-8.378 4.98-15.453 12.102-18.85l-0.046-0.094 104.448-49.524 49.57 22.993-95.883 45.475 394.1 186.648 394.1-186.648-95.883-45.428 48.5-23.506z", fill: "#bfbfbf", p_uid: "7973" },
        { describ: '数据管理', name: 'aggregateActive', is_needmap: false, t: "1709817224982", class: "icon", viewBox: "0 0 1433 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", p_id: "7634", d: "M128 153.6V76.8a76.8 76.8 0 0 1 76.8-76.8h1152a76.8 76.8 0 0 1 76.8 76.8v716.8a76.8 76.8 0 0 1-76.8 76.8h-76.8v76.8a76.8 76.8 0 0 1-76.8 76.8H76.8a76.8 76.8 0 0 1-76.8-76.8V230.4a76.8 76.8 0 0 1 76.8-76.8h51.2z m51.2 0h1024a76.8 76.8 0 0 1 76.8 76.8v588.8h76.8a25.6 25.6 0 0 0 25.6-25.6V76.8a25.6 25.6 0 0 0-25.6-25.6H204.8a25.6 25.6 0 0 0-25.6 25.6v76.8zM76.8 204.8a25.6 25.6 0 0 0-25.6 25.6v716.8a25.6 25.6 0 0 0 25.6 25.6h1126.4a25.6 25.6 0 0 0 25.6-25.6V230.4a25.6 25.6 0 0 0-25.6-25.6H76.8z m384 358.4a128 128 0 1 1 0-256 128 128 0 0 1 0 256z m0-51.2a76.8 76.8 0 1 0 0-153.6 76.8 76.8 0 0 0 0 153.6zM153.9584 828.4672c7.5264-141.2864 139.264-251.5456 298.112-251.5456 158.848 0 290.56 110.2592 298.112 251.5456l-0.256 5.2736a51.2 51.2 0 0 1-50.6112 43.3664H204.8256a51.2 51.2 0 0 1-50.5856-43.3664l-0.256-5.2736z m544.7424-2.56c-9.0624-110.1568-115.8144-197.7856-246.6304-197.7856s-237.568 87.6288-246.6048 197.7856h493.2352zM691.2 384a25.6 25.6 0 0 1 0-51.2h25.6a25.6 25.6 0 0 1 0 51.2h-25.6z m128 0a25.6 25.6 0 0 1 0-51.2h25.6a25.6 25.6 0 0 1 0 51.2h-25.6z m128 0a25.6 25.6 0 0 1 0-51.2h25.6a25.6 25.6 0 0 1 0 51.2h-25.6z m128 0a25.6 25.6 0 0 1 0-51.2h25.6a25.6 25.6 0 0 1 0 51.2h-25.6z m-196.48 230.4a25.6 25.6 0 1 1 0-51.2h224.3072a25.6 25.6 0 0 1 0 51.2h-224.3072z m0 128a25.6 25.6 0 1 1 0-51.2h224.3072a25.6 25.6 0 0 1 0 51.2h-224.3072z m6.0928 128a25.6 25.6 0 1 1 0-51.2h224.3072a25.6 25.6 0 0 1 0 51.2h-224.3072z", fill: "#bfbfbf", p_uid: "7635" },
      ]
    }
  },
  mounted() {
   
  },
  methods: {
    go(name,is_needmap) {
      this.mapActive = is_needmap
      for (let key in this.control) {
        this.control[key] = false
      }
      this.control[`${name}`] = true

    },
    colors(color, index) {
      this.navbar[index].fill = color
    },
  },
  components: {
    weatherdate,
    sumpeople,
    summarydata,
    mapbody,
    analyse,
    work,
    bodyshow,
    aggregate,
    evaluate,
    prediction,
    analysesgrade,
    workconfirm
  },


}
</script>
<style>
@font-face {
    font-family: 'Source Han Sans regular Bold';
    src: url('src\assets\font\SourceHanSansCN-Regular.otf') format('otf');
    font-weight: bold;
    font-style: normal;
    font-display: swap; /* 优化字体加载 */
}
.mapbody{
  width: 95vw;
  height: 88vh;
  position:absolute;
  left: -100px;
  opacity: 1;
  
}
#detail1{
  height: 80%;
  width: 36px;
  line-height: 80%;
  margin-left: 60px;
  margin-top: 5px;

}
#detail2{
  width: 36px;
  height: 80%;
  line-height: 80%;
  margin-left: 80px;
  margin-top: 5px;
}
.not_body{
  flex: 2;
  height: 100%;
}
.name{
  width: 3vw;
  height: 3vw;
  color: white;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  line-height: 3vw;
}
.avator {
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
  margin-right: 20px;
  line-height: 3vw;
}

.user_side {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
}

.titles {
  color: #bfbfbf;
  font-size: 12px;
  height: 6vh;
  line-height: 6vh;
  margin-top: 5px;
  font-family:'Source Han Sans regular Bold';
  font-weight: bold; 
}

.aggregateside {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.feedback {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;

}

.sidbar {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;

}

.work {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.analyse {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;

}

.container {
  width: 95vw;
  height: 88vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);
  overflow:hidden;
  background-color:#fff0;
}
.left_side{
  height: 100%;
  flex: 2;
  display: flex;
  background-image: url(/2.png);
  background-repeat: no-repeat;
  background-size: 70% 85%;
  background-position: 60% 50%;
}
.right_side{
  height: 100%;
  flex: 2;
  display: flex;
  background-image: url(/10.png);
  background-repeat: no-repeat;
  background-size: 70% 85%;
  background-position: 60% 80%;
 
}
.aside {
  z-index: 3;
  width:6vw;
  float: left;
  left: 0;
  border: 0px;
  
}

.top_side {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: row;
}

/* .top_side1 {
  flex: 1;
  display: flex;
  flex-direction:row;
  height: 100%;

} */

/* .top_side1:hover {
  background-color: #0f4a79;
} */
.left_side:hover {
  background-image: url(/1.png);
}
.right_side:hover {
  background-image: url(/18.png);
 
}
.user_side {
  flex: 1.5;
}

.sum_title {
  color: white;
  font-size: 18px;
  font-weight: 400;
  flex: 4;
}

* {
  margin: 0;
  padding: 0;
}

body,
html {
  width: 100%;
  height: 100%;
  background: #f0f2f5 url('/12.png') no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

/* #detail {
  margin: 0 auto;
  display: inline-block;
  z-index: 1;
  box-sizing: content-box;
  flex: 1;

} */

#navbar {
  top: 2vh;
  height: 8vh;
  position: absolute;
  left: 5vw;
  width: 90vw;
  display: flex;
  flex-direction: row;
  align-items: center;

}
</style>
