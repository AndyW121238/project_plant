<template>
  <div class="box">
    <div ref="pre_box" class="pre-box">
      <h1>欢迎加入</h1>
      <p>WELCOME</p>
      <div class="img-box">
        <img src="@/assets/img/OIP.jpeg" alt="">
      </div>
    </div>
    <Login v-show="flag" :switch-form="switchForm" />
    <Register v-show="!flag" :switch-form="switchForm" />
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Login from '@/components/Login'
import Register from '@/components/Register'
import * as api from '@/api/api'
import request from '@/utils/request'

export default {
  name: 'LoginRegister',
  components: { Login, Register },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        name: ''
      },
      flag: true,
      type: '登录',
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      loginRes: false,
      loginUser: {}

    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    switchForm() {
      if (this.flag) {
        this.$refs.pre_box.style.left = '50%'
      } else {
        this.$refs.pre_box.style.left = '0'
      }
      this.flag = !this.flag
    }
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // }

    // register() {
    //   this.$router.push({ path: '/register' })
    // }

    // async handleLogin() {
    //   if (this.loginForm.username === '' || this.loginForm.password === '') {
    //     this.$message.error('请输入账号或密码')
    //     return
    //   }

    //   // this.$router.push({ path: "/admin" });
    //   // return;

    //   await api
    //     .adminLogin({
    //       username: this.loginForm.username,
    //       pwd: this.loginForm.password

    //     })
    //     .then((res) => {
    //       if (res.code === 200) {
    //         if (res.ret === 'success') {
    //           this.loginRes = true
    //           this.loginUser = res.username
    //           sessionStorage.setItem('loginUser', JSON.stringify(res.user))
    //           sessionStorage.setItem('username', this.loginUser)
    //           sessionStorage.setItem('islogin', true)
    //         }
    //       }
    //     })

    //   if (
    //     this.loginRes
    //   ) {
    //     this.$router.push({ path: '/admin' })
    //     return
    //   } else {
    //     this.$message.error('账号密码错误')
    //     return
    //   }
    // }
  }
}
</script>

<style scoped>

.box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -525px;
    margin-top: -300px;
    width: 1050px;
    height: 600px;
    border: 1px solid rgba(255, 255, 255, .6);
    border-radius: 20px;
    box-shadow: 5px 4px 3px rgba(0, 0, 0, .1);
}

.pre-box {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999999;
    height: 100%;
    width: 50%;
    background-color: #d3faf0;
    border-radius: 20px;
    transition: all 0.5s;
}

.pre-box h1 {
    margin-top: 100px;
    letter-spacing: 5px;
    text-align: center;
    text-shadow: 5px 4px 3px rgba(0, 0, 0, .1);
}

.pre-box p {
    height: 30px;
    line-height: 30px;
    margin: 20px 0;
    font-weight: 700;
    text-align: center;
    text-shadow: 5px 4px 3px rgba(0, 0, 0, .1);
}

.pre-box .img-box {
    width: 200px;
    height: 200px;
    margin: 20px auto;
    border-radius: 100px;
    overflow: hidden;
    box-shadow: 5px 4px 3px rgba(0, 0, 0, .1);
}

.pre-box .img-box img {
    width: 100%;
    height: 100%;
}
</style>
