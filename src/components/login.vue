<template>
  <div class="about">
    <div class="body">
      <div class="out-cont" style="background: rgba(255, 255, 255, 0.2)">
        <h2 class="title-name1"><span>城市清雪工作管理优化系统</span></h2>
        <h1 class="title-name2">————————————<span style=" color: #f0f2f5;">snow blower</span>————————————</h1>
        <div class="login-page">
          <div class="left-box">
            <div class="content">
              <div style="margin: 10px;">欢迎来到!</div>
              <div style="margin: 10px;">城市清雪工作管理优化系统</div>
            </div>
          </div>
          <div class="right-box">
            <h6 class="body-name">登录</h6>
            <!-- <div class="accountbox">
              <div class="information-box">
                <a-input type="text" placeholder="请输入账户" >
                  <template #suffix>
                    <user-outlined type="user" />
                  </template>
                </a-input>
              </div>
              <div class="information-box">
                <a-input-password placeholder="请输入密码" v-model:value="password" @keyup.enter.native="login()" />
              </div>
              <a-button type="primary" class="button" @click="login()" :loading="loading">登录</a-button> -->
            <!-- </div> -->
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="username" class="input-item"  id="id" v-model="id">
                <input type="password" name="password" placeholder="password" class="input-item"  v-model="password" @keyup.enter.native="login()" >
                <div class="btn" v-on:click="login()">Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios';
export default {
  data() {
    return {
      value:'',
      id: '',
      password: '',
      loading: false
    }
  },
  components: {
  },
  mounted() {
    this.$nextTick(
      window.onload = function () { // 光标默认位置
        var oInput = document.getElementById('id');
        oInput.focus();
      }
    )
    document.title = ('欢迎登录')
  },
  methods: {
    showModal() {
      this.visible = !this.visible
    },
    // 加载个人信息
    async doGetYourInformation() {
      // let res = await request.getYourInformation()
      return res
    },
    login() {
      // this.$router.push({ path: '/home' })
      this.loading = true
      if (this.id === '' || this.password === '') {
        this.$message.error('账号和密码不能为空')
        this.loading = false
      } else {
        axios.post('/api/work/register',{
          username:this.id,
          password:this.password
        }).then(
          res=>{
            if(res.data=='用户名或密码错误'){
              this.$message.error('用户名或密码错误')
            }else{
              location.href='body'
            }
          }
        )
        // this.$router.push({ path: '/body' })
        this.loading = false
      }
    },
  }
}
</script>
<style lang="less" scoped>
.content{
  color: white;
  font-size: 18px;
  font-weight: 100;
  padding: 150px 20px;
}
.input-item {
     display: block;
     width: 95%;
     margin-bottom: 40px;
     border: 0;
     padding: 10px;
     border-bottom: 1px solid rgb(128, 125, 125);
     font-size: 15px;
     outline: none;
 }
 .btn {
     text-align: center;
     padding: 10px;
     width: 95%;
     margin-top: 60px;
     background-image: linear-gradient(to right,#115ca2;#115ca2;);
     color: #fff;
 }



.about {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
}
body,
html {
  width: 100%;
  height: 100%;
  background-image: url('/public/background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.body {
  width: 100%;
  height: 100%;
  background: #f0f2f5 url(/public/background.png) no-repeat;
  background-position: center center;
  background-size: cover;

  .out-cont {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
  }
}

.left-box {
  background-image: url(../../public/left_aside.png);
  background-position: center center;
  // filter: blur(5px);
  background-size: cover;
  height: 100%;
  width: 400px;
 
}

.right-box {
  height: 400px;
  width: 400px;
  padding: 20px;
}

.login-page {
  margin-top: 50px;
  box-shadow: 0px 0px 10px #111111;
  display: flex;
  background: #ffffff;
}

.title-name1 {
  margin-top: -100px;
  color:white;
  font-size: 40px;
  padding-top: 20px;
  font-weight: 700;
  span {
    letter-spacing: 4px;
  }
}

.title-name2 {
  color: #9db9d7;
  font-size: 16px;
  opacity: 0.8;
}

.body-name {
  margin-bottom: 50px;
  font-size: 25px;
  color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-weight: 700;
}

.accountbox {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.information-box {
  margin-top: 20px;
  width: 310px;
  background-color: rgba(0, 0, 0, 0);
}

input {
  margin: 0;
  width: 280px;
}

.button {
  margin-top: 20px;
  width: 310px;
  height: 35px;
  color: white;
  border: 0;
  outline: none;
}</style>
  