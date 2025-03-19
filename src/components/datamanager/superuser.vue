<template>
    <div class="superuser_container">
        <div class="title">个人信息修改</div>
        <div class="avator">
            头像:
            <img :src="imageurl" alt="" class="images" id="show">
            <div class="image"><input type="file" id="image" v-on:change="filepreview(this)"></div>
            <div><el-button class="image_update" v-on:click="updateurl()">更新头像</el-button></div>
        </div>
        <div class="username">
            用户名:
            <input type="text" name="username" placeholder="username" class="input-item"  id="id" v-model="nickname">
               
        </div>
        <div class="password">
            密码:
            <input type="password" name="password" placeholder="password" class="input-item"  v-model="password"  >
        </div>
        <div>
            <el-button type="primary" style="position: relative; left:60%;top: 150%;background-color: wheat;" v-on:click="closescreen()">取消</el-button> 
           <el-button type="primary" style="position: relative; left:65%;top: 150%;" v-on:click="updatedata()">确定</el-button> 
        </div>
    </div>
</template>
<script >
import axios from 'axios'
export default {
    data() {
        return {
            imageurl: '/api/static',
            nickname:'',
            password:''
        }
    },
    mounted() {
        this.init()

    },
    methods: {
        updatedata(){
            var headimgurl = document.getElementById('image').files[0]
            var formData = new FormData()
             formData.append("password",this.password)
             formData.append("nickname",this.nickname)
             formData.append("image",headimgurl)
             formData.append('identity',0)
             if(this.password&&this.nickname&&headimgurl){
            axios.post("/api/work/updatesuper",formData,{
                headers:{"Content-Type":"multipart/form-data"}
            }).then(res=>{
               this.$message.success('修改成功')
               axios.get('/api/work/loginout').then(res => {
                location.href = 'login'
            })
            })
        }else{
            this.$message.error('有属性值为空')
        }
        },
        closescreen(){
            this.$store.state.editscreen=null
        },
        init() {
            var avator = document.cookie
            var cookiearray = avator.split(';');
            var res = {};
            for (var i = 0; i < cookiearray.length; i++) {
                var name = cookiearray[i].split('=')[0];
                var value = cookiearray[i].split('=')[1];
                res[name] = value
            }
            this.imageurl = this.imageurl+res[" images"].split('"')[1]
            this.username = res.name
        },
        updateurl(){
           var image= document.querySelector('#image')
           image.click()
        },
        filepreview(e){
            var reads= new FileReader();
            var f=document.getElementById('image').files[0];
            reads.readAsDataURL(f);
            reads.onload=function (e) {
            document.getElementById('show').src=this.result;
        };
           
        }
    }
}


</script>
<style scoped>

.input-item {
     position: absolute;
     right: 10%;
     display: block;
     width: 60%;
     border: 0;
     padding: 10px;
     border-bottom: 1px solid rgb(128, 125, 125);
     font-size: 15px;
     outline: none;
   
 }
.password{
    line-height: 50px;
    height: 50px;
    font-weight: 700;
    font-size: 12px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin:20px ;
}
.username{
    line-height: 50px;
    height: 50px;
    font-weight: 700;
    font-size: 12px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin:20px;
}
#show{
    
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
.image{
    width: 50%;
    height: 100%;
    overflow: hidden;
}
.image_update{
    background-color:skyblue;
    color: white;
    font-size: 12px;
    margin-left:-50%;
}
.image>input{
   opacity: 0;
   width: 10px;
}

.superuser_container {

    display: flex;
    flex-direction: column;
}

.avator {
    margin-top: 10px;
    line-height: 50px;
    height: 50px;
    font-weight: 700;
    font-size: 12px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
}

.title {
    
    font-family: '楷体';
    font-weight: 700;
    font-size: 24px;
    margin: 0 auto;
    line-height: 36px;
    padding: 2px;
    height: 36px;
}

.images {
    width: 36px;
    height: 36px;
    vertical-align: center;
    margin: 7px 0px 7px 55px;

}</style>