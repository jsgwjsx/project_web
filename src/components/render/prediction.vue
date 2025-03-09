<template>
  <div class="prediction_container">

    <el-radio-group v-model="typeprodection" size="small" text-color="#fff" fill="#dd5a06" default="date">
      <el-radio-button label="date天预测" value="date" />
      <el-radio-button label="week周预测" value="week" />
    </el-radio-group>
    <div class="date" v-if="typeprodection === 'date'">
      <div class="echarts1" id="echarts1"></div>
      <div class="content">
        <el-table :data="tableData1" style="width: 100%;height: 100%;">
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="temp" label="气温" width="180" />
          <el-table-column prop="rain" label="降水" />
          <el-table-column prop="wind_speed" label="风速" width="180" />
          <el-table-column prop="wind_direction" label="风向" />
        </el-table>
      </div>
    </div>
    <div class="week" v-if="typeprodection === 'week'">
      <div class="echarts2" id="echarts2"></div>
      <div class="content">
        <el-table :data="tableData2" style="width: 100%;height: 100%;">
          <el-table-column prop="time" label="日期" width="180"></el-table-column>
          <el-table-column prop="weather" label="天气">
            <template #default="scope">
              <div style="display: flex; align-items: center;width: 50px;">
                <el-image :src="scope.row.weather"></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="天气情况"></el-table-column>
          <el-table-column prop="temp" label="气温"></el-table-column>
          <el-table-column prop="wind_speed" label="风速" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      typeprodection: 'date',
      tableData1: [],
      tableData2: [],
      status: '../../../public/weather/',
    }
  },
  mounted() {
    this.table_init()
    // this.weekinit()
  },
  updated() {
    if (this.typeprodection === 'date') {
      this.dateinit()
    } else if (this.typeprodection === 'week') {
      this.weekinit()
    }
  },
  methods: {
    table_init() {
      var date = this.$store.state.prediction.hour
      var week = this.$store.state.prediction.week
      var res1 = [];
      var res2 = []
      for (var i = 1; i < date.time.length; i++) {
        var middle = {
          time: date.time[i],
          rain: date.snow[i],
          temp: date.temperature[i],
          wind_speed: date.wind[i],
          wind_direction: date.winddirection[i]
        }
        res1.push(middle)
      }
      this.tableData1 = res1
    
      for (var i = 1; i < week['日期'].length; i++) {
        var middle = {
          time: week['日期'][i],
          weather: this.status + week['天气状况'][i] + '.png',
          status: week['天气状况'][i],
          temp: week['气温'][i],
          wind_speed: week['风速'][i],
        }
        res2.push(middle)
      }

      this.tableData2 = res2
    },
    dateinit() {
      var myechart1 = echarts.init(document.getElementById('echarts1'), 'dark')
      // var myechart2 = echarts.init(week)
      var hour = []
      var temp = []
      for (var i = 1; i < this.$store.state.prediction.hour.time.length; i++) {
        hour.push(this.$store.state.prediction.hour.time[i])
      }
      var reg = /(\-)?\d+(\.\d+)?/g
      for (var i = 1; i < this.$store.state.prediction.hour.temperature.length; i++) {
        var middle = this.$store.state.prediction.hour.temperature[i]
        var res = middle.match(reg)
        temp.push(parseFloat(res[0]))
      }
      var option1 = {
        title: {
          text: "近几个小时温度变化情况",
          textStyle: {
            color: "#fff"
          },
        },
        xAxis: {
          type: 'category',
          data: hour,
          axisLabel: {//修改坐标系字体颜色
            show: true,
            color: "#fff",
            fontSize: '16px',
          },

        },
        yAxis: {
          type: 'value',
          axisLabel: {//修改坐标系字体颜色
            show: true,
            color: "#fff",
            fontSize: '16px',
          },
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
      
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            saveAsImage: {}
          }
        },
        series:  [
          {
            name: '温度',
            type: 'line',
            data:temp,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      };
      myechart1.setOption(option1)
    },
    weekinit() {
      console.log(this.$store.state.prediction.week['气温'])
      var reg = /(\-)?\d+(\.\d+)?/g
      var high = [];
      var low = []
      for (var i = 0; i < this.$store.state.prediction.week['气温'].length; i++) {
        var middle = this.$store.state.prediction.week['气温'][i]
        var res = middle.match(reg)
        high.push(res[0])
        low.push(res[1])
      }
      var myechart2 = echarts.init(document.getElementById('echarts2'), 'dark')
      var option = {
        title: {
          text: '近几天天气预测情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
      
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$store.state.prediction.week['日期']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '最高温度',
            type: 'line',
            data: high,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: '最低温度',
            type: 'line',
            data: low,
            markPoint: {
              data: [
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: 'Avg' },
              ]
            }
          }
        ]
      };
      myechart2.setOption(option)
    }
  }
}
</script>
<style scoped>
.date {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

}

.echarts1 {
  height:40%;
  width:100%;
  margin: 10px 0px 0px 0px;
}

.echarts2 {
  height:40%;
  width:100%;
  margin: 10px 0px 0px 0px;
}

.content {
  height: 45%;
  width: 100%;
  background-color: yellow;
  margin-left: 3px;
}

html,
body {
  height: 100%;
  width: 100%;
}

.week {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

}

.prediction_container {
  box-sizing: border-box;
  padding: 10px;
  position: absolute;
  right: 1vh;
  top: 1vh;
  bottom: 1vh;
  width: 75%;
  height: 98%;
  /* background-image: url(/8.png);
  background-size: 110% 110%;
  background-position: 60% 50%;
  background-repeat: no-repeat; */
  background-color: #100C2A;
  z-index: 3;
}</style>