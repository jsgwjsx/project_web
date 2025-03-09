<template>
  <div class="summary">

    <div class="header" id="growing">

    </div>
    <div class="footer" id='summary'>

    </div>
  </div>
</template>
<script>
import { toRaw } from "vue";
import axios from 'axios'
import * as echarts from 'echarts'
import { watch } from 'vue'
var renderdata;
export default {
  data() {
    return {
    }
  },
  mounted() {
    renderdata = toRaw(this.$store.state.renderdata)
    init()
  },
}
function init() {
  console.log(renderdata)
  var peopledata = []
  var progress = []
  var percentage = []
  for (var i = 0; i < renderdata.length; i++) {
    peopledata.push([i + 1, renderdata[i].attributes.people])
    progress.push(renderdata[i].attributes.pop1_addsp)
    percentage.push((renderdata[i].attributes.pop1_addsp / renderdata[i].attributes.people).toFixed(2) * 100)
  }
  var myechart1 = echarts.init(document.getElementById('growing'))
  let config1 = {
    title: {
      text: "人口对比", textStyle: {
        color: '#ffffff'//字体颜色
      },
    },
    tooltip: {
      trigger: 'item'
    },
    dataset: [{
      dimensions: ['name', 'people'],
      source: peopledata
    }],
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        name: 'name',
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '数量',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: true,
          fontSize: 6, // 根据需要调整字体大小  
          interval: 0, // 设置为0以显示所有坐标点  
    
        }

      },
      {
        type: 'value',
        name: '百分比',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: '{value} %',

        }
      },

    ],
    axisName: {
    color: '#fff',
    backgroundColor: '#999',
    borderRadius: 3,
    padding: [3, 5]
  },
    series: [
      {
        type: 'line',
        name: 'number',
        data: progress
      },
      {
        type: 'line',
        name: 'percentage%',
        data: percentage
      },
    ]
  };

  myechart1.setOption(config1);
  var myechart = echarts.init(document.getElementById('summary'))
  let config = {
    dataset: [{
      dimensions: ['name', 'progress',],
      source: peopledata
    },
    {
      transform: {
        type: 'sort',
        config: { dimension: 'progress', order: 'desc' }
      }
    }
    ],
    title: {
      text: "人口数量", textStyle: {
        color: '#ffffff'//字体颜色
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        show: true,
        fontSize: 12, // 根据需要调整字体大小  
        interval: 0 // 设置为0以显示所有坐标点  

      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        fontSize: 6, // 根据需要调整字体大小  
        interval: 0 // 设置为0以显示所有坐标点  

      }
    },
    axisName: {
    color: '#fff',
    backgroundColor: '#999',
    borderRadius: 3,
    padding: [3, 5]
  },
    tooltip: {
      trigger: 'item'
    },
    series:
    {
      type: 'bar',
      encode: { x: 'name', y: 'progress' },
      datasetIndex: 1,
      label: {
        show: false,
        position: 'right',


      }
    },

    emphasis: {
      label: {
        show: false,
        fontSize: 18,
        fontWeight: 'bold'
      }
    },

  };

  myechart.setOption(config);

}



</script>
<style scoped>
.header {
  width: 100%;
  height: 45%;
  text-align: center;


}

.footer {
  width: 100%;
  height: 45%;

}
.summary {
  position: absolute;
  right: 1vh;
  top: 1vh;
  bottom: 1vh;
  width: 20vw;
  height: 98vh;
  background-image: url(/8.png);
  background-size: 110% 110%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  z-index: 3;
}
</style>