<template>
    <div class="analysecontainer">
        <div id="render"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import { toRaw } from "vue";
var renderdata;
export default {
    data() {
        return {

        }
    },
    methods: {
        init() {
            console.log(renderdata)
            var myechart1 = echarts.init(document.getElementById('render'))
            var option = {
                tooltip: {
                    trigger: 'item'
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
                            { value:renderdata[0].attributes.classify, name: '综合' },
                            { value: renderdata[0].attributes.relationship, name: '居民联系度' },
                            { value:renderdata[0].attributes.snowcover, name: '积雪厚度' },
                        ]
                    }
                ]
            };

            myechart1.setOption(option);
        }
    },
    mounted() {
        renderdata = toRaw(this.$store.state.analysesdata)
        this.init()
    }

}
</script>
<style scoped>
.analysecontainer {
    position: absolute;
    right: 1vh;
    top: 1vh;
    width: 300px;
    height: 200px;
    z-index: 3;
}

#render {
    width: 100%;
    height: 100%;
}
</style>