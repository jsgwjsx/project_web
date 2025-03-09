<template>
  <div class="summary">
    <div class="header" id="summary">

    </div>
    <div class="footer" id='pie'>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import * as echarts from 'echarts'
import { getPositionDataWithUnit } from 'element-plus'
export default {
  data() {
    return {

    }
  },
  mounted() {
    init()
  },
  methods: {

  }
}
function init() {
  axios.get('/api/map/bodyecharts').then(res => {
    if(res.data[1]==undefined){
      if(res.data[0].area==1){
        res.data[1]={area: 0, shape_length:0 }
      }else{
        res.data[1]={area: 1, shape_length:0 }
      }
     
    }
    
    var myechart = echarts.init(document.getElementById('summary'),'dark')
    let config = {
      title: {
        text: "汇总(m/米)",
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
     
      },
      series: [
        {

          type: 'pie',
          radius: ['40%', '70%'],
          color: [
            'wheat',
            'skyblue'
          ],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 0.1
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: res.data[1].shape_length, name: '未清理' },
            { value: res.data[0].shape_length, name: '已清理' },
          ]
        }
      ]
    };
    // 设置参数
    myechart.setOption(config);
  })

  axios.get(' /api/map/areaecharts').then(res => {
    var sum_work = {
      香坊区: 243459.49,
      道里区: 241056.40,
      南岗区: 191116.56,
      阿城区: 317187.39,
      平房区: 41225.65,
      呼兰区: 309499.01,
      松北区: 200213.05,
      道外区: 153483.14,
      双城区: 227736.54
    }
    var data = {}
    for (var i = 0; i < res.data.length; i++) {
      sum_work[res.data[i].area] = parseFloat(res.data[i].shape_length) / parseFloat(sum_work[res.data[i].area]) * 100
      data[res.data[i].area] = sum_work[res.data[i].area].toFixed(2)
    }
    var myechart = echarts.init(document.getElementById('pie'),'dark')
    let config = {
      dataset: [{
        dimensions: ['name', 'progress',],
        source: [
          ['香坊', data['香坊区'],],
          ['南岗', data['南岗区'],],
          ['道里', data['道里区'],],
          ['阿城', data['阿城区'],],
          ['平房', data['平房区'],],
          ['呼兰', data['呼兰区'],],
          ['道外', data['道外区'],],
          ['松北', data['松北区'],],
          ['双城', data['双城区'],],

        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'progress', order: 'desc' }
        }
      }


      ],
      title: {
        text: "各地区清雪进度%",
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: 30,
        }

      },
      yAxis: {
        max: '100',

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
  })
  //   option = {
  //   dataset: [
  //     {
  //       dimensions: ['name', 'age', 'profession', 'score', 'date'],
  //       source: [
  //         ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
  //         ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
  //         ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
  //         ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
  //         ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
  //         ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
  //         ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
  //         ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
  //         ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
  //       ]
  //     },
  //     {
  //       transform: {
  //         type: 'sort',
  //         config: { dimension: 'score', order: 'desc' }
  //       }
  //     }
  //   ],
  //   xAxis: {
  //     type: 'category',
  //     axisLabel: { interval: 0, rotate: 30 }
  //   },
  //   yAxis: {},
  //   series: {
  //     type: 'bar',
  //     encode: { x: 'name', y: 'score' },
  //     datasetIndex: 1
  //   }
  // };

}



</script>
<style scoped>
.header {
  width: 100%;
  height: 40%;
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
  /* background-image: url(/8.png);
  background-size: 110% 110%;
  background-position: 60% 50%;
  background-repeat: no-repeat; */
  background-color: #100C2A;
  z-index: 3;
}

* {
  color: white;
}
</style>