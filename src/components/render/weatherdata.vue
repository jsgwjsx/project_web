<template>
    <div class="weathercontainer">
        <div class="top">
            <div class="city">{{data.city}}</div>
            <div class="time">{{data.time}}更新</div>
        </div>
        <div class="center">
            <div class="status"><img :src="imagesurl" alt=""></div>
            <div class="temp">
               <div class="datetime" > {{data.temp}}</div><div style="display: inline-block; color: white;font-size: 16px;">℃</div>
               <div style="font-size: 16px;margin-left: 1vw; ;">{{data.high_temp}}/{{data.low_temp}}℃</div>
            </div>
        </div>
        <div class="bottom">
            <div class="weather">{{data.status}}</div>
            <div class="rainfall">{{data.snow}}mm</div>
        </div>
        
    </div>
</template>
<script>

import axios from 'axios'
export default {
    data() {
        return {
            data: {
                city:null,
                time:null,
                status:null,
                temp:null,
                snow:null,
            },
            status:'../../../public/weather/',
            imagesurl:''
        }
    },
  async mounted() {
        this.attaindata()
        setInterval(this.attaindata, 300000);
    },
    methods: {
     attaindata() {
        axios.get('/api/work/weatherdata').then(res => {
            this.imagesurl=this.status+res.data.status+'.png'
           this.data=res.data 
           console.log(this.data)
        })
        }
    }
}

</script>
<style scoped>
.bottom{
    height: 5vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    font-family: '黑体';
    color: white;
}
.weather{
    width: 50%;
    height: 100%;
    line-height: 5vh;
    text-align: center;
}
.rainfall{
    width: 50%;
    height: 100%;
    margin-left: 3vw;
    line-height: 5vh;
   
}
.datetime{
    font-size: 10vh;
    display: inline-block;
}
.temp{
    height: 15vh;
    width: 50%;
    color: white;
}


*{
    margin: 0px;
    padding: 0px;
    font-family: '宋体';
}
.status{
    height: 15vh;
    width: 50%;
}
.status>img{
   width: 90%;
   margin: 0 auto;
       
}
.city{
color: white;
font-size: 16px;
line-height: 3vh;
height:3vh;
font-weight: 700;
}
.time{
color: white;
font-size: 12px;
line-height: 3vh;
height:3vh;
}
.weathercontainer {
    width: 16vw;
    height: 24vh;
    z-index: 3;
    
}
.top{
    margin-top: 3px;
    height: 3vh;
    width: 100%;
    font-size: 14px;
    display: flex;
    line-height: 3vh;
    flex-direction: row;
    justify-content: space-around;
}
.center{
    margin-top: 1px;
    height: 15vh;
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>