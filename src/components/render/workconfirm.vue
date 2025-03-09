<template>
    <div class="weathercontainer">
        <div class="image">
            <img :src="imgurl" style="height: 100%;width: 100%;"></img>
        </div>
        <div class="controls">
            <div class="button1" v-on:click="cancle">取消</div>
            <div class="button1" v-on:click="rework">打回</div>
            <div class="button1" v-on:click="compute">通过</div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    data() {
        return {
            identity:'',
            workid:'',
            imgurl: ''
        }
    },
    watch:{
        "$store.state.workconfirm_data"(newVal){
            this.identity = newVal.identity
            this.workid = newVal.workid
            this.imagesurl = newVal.avator
            console.log(this.identity)
        }
    },
    mounted(){
        this.identity = this.$store.state.workconfirm_data.identity
        this.workid = this.$store.state.workconfirm_data.workid
        this.imgurl = this.$store.state.workconfirm_data.avator
        
    },
    methods: {
        rework(){
            axios.post('/api/map/rework',{
                identity:this.identity,
                workid:this.workid,
            }).then(res=>{
                console.log(res.data)
                if(res.data=='ok'){
                    this.$message.success('打回')
                    this.$store.state.workconfirm = false
                }
            })
        },
        cancle(){
            this.$store.state.workconfirm = false
        },
        compute(){
            axios.post('/api/map/computework',{
                identity:this.identity,
                workid:this.workid,
            }).then(res=>{
                console.log(res.data)
                if(res.data=='ok'){
                    this.$message.success('通过')
                    this.$store.state.workconfirm = false
                }
            })
        }
    }
}

</script>
<style scoped>
.button1 {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    border: none;
    width: 100px;
    height: 36px;
    font-weight: 800;
    margin: 10px;
    background-color:rgba(1, 138, 255, 0.3);
    color: white;
    font-weight: bold;
    border: 0px solid white;
    border-radius: 5px;
    line-height: 36px;
    border: 1px solid rgba(1,138, 255,0.8);

}
.controls{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

}
.button1:hover {
    background-color: #dd5a06;
    cursor: pointer;
    opacity: 1;

}

.weathercontainer {
    position: absolute;
    right: 10px;
    top: 1vh;
    bottom: 1vh;
    width: 20vw;
    height: 40vh;
    /* background-image: url(/8.png);
    background-size: 110% 110%;
    background-position: 50% 50%;
    background-repeat: no-repeat; */
    background-color: rgba(1, 138, 255, 0.2);
    z-index: 3;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
}
.image{
    /* padding:1vh 1vw; */
    flex: 3;
    width:calc(100% - 20px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    padding: 10px;
}
.image>img{
    object-fit: contain;
    width: 100%;
}

.controls{
    flex: 2;
    width: 100%;
}
</style>