<template>
    <div>
        <div class="header">
            <div class="title">天气检测模块</div>
        </div>
        <div class="body">
            <div class='upper'>
                <div class="two_title">
                    <!-- <svg t="1711533742535" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2159" width="18" height="18">
                        <path
                            d="M186.181818 651.636364H0V0h651.636364v186.181818h186.181818v186.181818h186.181818v651.636364H372.363636v-186.181818H186.181818v-186.181818z m465.454546-372.363637v372.363637H279.272727v93.090909h465.454546V279.272727h-93.090909z m186.181818 186.181818v372.363637H465.454545v93.090909h465.454546V465.454545h-93.090909zM93.090909 93.090909v465.454546h465.454546V93.090909H93.090909z"
                            fill="#bfbfbf" p-id="2160"></path>
                    </svg> -->
                    <img src="/public/实时监测.png" alt="" class="supervision">实时监测
                </div>
                <div>
                    <div class="prediction">
                        <el-button type="primary" v-on:click="open()" style="width: 80%;"class="button">实时天气</el-button>
                        <!-- <el-button type="primary">历史天气</el-button> -->
                    </div>
                </div>
            </div>
            <div class='low'>
                <div class="two_title">
                    <!-- <svg t="1711534421694" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5397" width="18" height="18">
                        <path
                            d="M955.069071 864.311021 740.015134 649.258107c-3.752464-3.751441-8.841366-5.860475-14.149255-5.860475-5.306866 0-10.395768 2.108011-14.149255 5.860475l-16.692171 16.692171-38.34226-38.34226c53.03796-59.810201 85.298711-138.442072 85.298711-224.478588 0-186.774871-151.952784-338.727655-338.727655-338.727655S64.527642 216.35456 64.527642 403.12943c0 186.775894 151.952784 338.728678 338.727655 338.728678 86.36909 0 165.276231-32.510438 225.170343-85.913718l38.303374 38.303374-17.34504 17.34504c-7.812943 7.813966-7.812943 20.48352 0 28.297486l215.051891 215.052914c3.753487 3.751441 8.841366 5.860475 14.149255 5.860475 5.306866 0 10.395768-2.108011 14.149255-5.860475l62.334697-62.334697C962.883037 884.794541 962.883037 872.124987 955.069071 864.311021zM104.546078 403.12943c0-164.709319 133.9999-298.709219 298.709219-298.709219s298.709219 133.9999 298.709219 298.709219S567.964616 701.839673 403.255297 701.839673 104.546078 567.838749 104.546078 403.12943zM878.585119 912.496463 691.829691 725.741036l34.036187-34.036187 186.755428 186.755428L878.585119 912.496463z"
                            fill="#bfbfbf" p-id="5398"></path>
                    </svg> -->
                    <img src="/public/天气预测.png" alt="" class="supervision">天气预测
                </div>
                <div class="prediction">
                    <el-button type="primary" v-on:click="attaindata()" class="button">开始预测</el-button>
                    <el-button type="primary" v-on:click="showdata()"class="button">查询结果</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

var data
export default {
    data() {
        return {
            isactive: false
        }
    },
    methods: {
        open() {
            this.$store.state.weatherdata = !this.$store.state.weatherdata
        },
        attaindata() {
            // axios.get('/api/map/prediction').then(res => {
            //     if (res.data) {
            //         this.$message.success('数据获取成功')
            //         data = res.data
            //     }
            // })
            // 和风天气的 API Key
            const apiKey = '0858f5276fb541a4b5cc581af2400fdf';
            // 城市 Location ID，例如北京的是 101010100
            const locationId = '101050101';
            // 和风天气的 7 天天气预报 API URL
            const apiUrl = `https://devapi.qweather.com/v7/weather/7d?location=${locationId}&key=${apiKey}`;
            // 使用 Axios 发送 GET 请求
            axios.get(apiUrl)
                .then(response => {
                    // 请求成功，处理返回的天气数据
                    const week = response.data;
                    // 和风天气的逐小时天气预报 API URL
                    const apiUrl = `https://devapi.qweather.com/v7/weather/24h?location=${locationId}&key=${apiKey}`;
                    // 使用 Axios 发送 GET 请求
                    axios.get(apiUrl)
                        .then(response => {
                            // 请求成功，处理返回的天气数据
                            const hour = response.data;
                            data = processdata(hour,week)
                            this.$message.success('数据获取成功')
                        })

                })
        },
        showdata() {
            this.isactive = !this.isactive
            if (this.isactive) {
                this.$store.state.prediction = data
            } else {
                this.$store.state.prediction = undefined
            }
        }
    }
}
function processdata(hourData, weekData) {
    const timeRegex = /T(\d{2}:\d{2})/;
    var resData = {
        hour: {
            snow: ['降水'],
            temperature: ['气温'],
            time: ['时间'],
            wind: ['风速'],
            winddirection: ['风向']
        },
        week: {
            天气状况: [],
            日期: [],
            气温: [],
            风速: [],
        },
    }
    for (var i=0; i < hourData.hourly.length; i++) {
        if (hourData.hourly[i].precip == '0.0') {
            resData.hour.snow.push('无降水')
        } else {
            resData.hour.snow.push(hourData.hourly[i].precip + 'mm')
        }
        resData.hour.temperature.push(hourData.hourly[i].temp + '°C')
        resData.hour.time.push(hourData.hourly[i].fxTime.match(timeRegex)[1])
        resData.hour.winddirection.push(hourData.hourly[i].windDir)
        resData.hour.wind.push(hourData.hourly[i].windSpeed+'m/s')
    }

    for (var i=0; i < weekData.daily.length; i++) {
        resData.week.天气状况.push(weekData.daily[i].textDay)
        resData.week.日期.push(weekData.daily[i].fxDate)
        resData.week.气温.push(`${weekData.daily[i].tempMax}/${weekData.daily[i].tempMin}°C`)
        resData.week.风速.push(weekData.daily[i].windSpeedDay+'m/s')
    }
    return resData
}   
</script>
<style scoped>
.supervision{
    object-fit: contain;
    height: 18px;
    width: auto;
    position: relative;
    top: 2px;
}
.title {
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-family: '宋体';
    display: inline-block;
    line-height: 36px;
    color: white;
    
}

.header {
    width: 100%;
    height: 36px;
    line-height: 36px;
    color: white;
    display: inline-block;
}

* {
    color: white;
}

.prediction {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px 20px;
}

.prediction>* {
    background-color: #1f445f;
    font-weight: 700;
    height: 40px;
    font-size: 16px;


}

.prediction>*:hover {
    background-color: #dd5a06;
}
</style>