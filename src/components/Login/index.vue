<template>
  <div class="login-form">
    <div class="title-box">
      <h1>登录</h1>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" type="text" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="密码" />
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <button @click="handleLogin('ruleForm')">提交</button>
      <p @click="switchMode">没有账号，去注册</p>
    </div>
  </div>
</template>

<script>
// import * as api from '@/api/api'
export default {
  name: 'LoginForm',
  props: ['switchForm'],
  data() {
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (value.length < 3 || value.length > 10) {
        return callback(new Error('用户名长度应在3-10个字符之间'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度应在6-20个字符之间'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    switchMode() {
      this.ruleForm.userName = ''
      this.ruleForm.password = ''
      this.switchForm()
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // await api
      //   .adminLogin({
      //     username: this.ruleForm.username,
      //     pwd: this.ruleForm.password

      //   })
      //   .then((res) => {
      //     if (res.code === 200) {
      //       if (res.ret === 'success') {
      //         this.loginRes = true
      //         this.loginUser = res.username
      //         sessionStorage.setItem('loginUser', JSON.stringify(res.user))
      //         sessionStorage.setItem('username', this.loginUser)
      //         sessionStorage.setItem('islogin', true)
      //       }
      //     }
      //   })

      // if (this.loginRes) {
      //   this.$router.push({ path: '/admin' })
      //   return
      // } else {
      //   this.$message.error('账号密码错误')
      //   return
      // }
      // this.$router.push({ path: "/admin" });
      // return;
    }
  }

}
</script>

<style scoped>
.el-form-item {
  width: 65%;
}
.el-input__inner {
  height: 40px;
  text-indent: 4px;
  border: 1px solid #157580;
  transition: all 0.5s;
  border-radius: 40px;
}
.el-input__inner:focus {
  color: #157580;
  font-size: 20px;
}
button {
  box-sizing: content-box;
  width: 100px;
  height: 30px;
  line-height: 30px;
  padding: 5px 10px;
  text-align: center;
  background-color: rgb(0, 201, 183);
  color: #fff;
  border: none;
  border-radius: 30px;
  box-shadow: 10px 10px 14px 1px rgba(0, 0, 0, .2);
  transition: all 0.5s;
}
button:hover {
  font-size: 20px;
  cursor: pointer;
  box-shadow: none;
}

.login-form {
    float: right;
    height: 100%;
    width: 50%;
    padding-top: 150px;
}

.title_box {
    height: 300px;
    line-height: 500px;
}

.title-box h1 {
    text-align: center;
    letter-spacing: 5px;
    text-shadow: 5px 4px 3px rgba(0, 0, 0, .1);
}

.btn-box {
    text-align: center;
}

.btn-box p {
    height: 30px;
    margin: 10px 0;
    line-height: 30px;
    font-size: 14px;
    transition: all 0.5s;
}

.btn-box p:hover {
    cursor: pointer;
    font-size: 18px;
    text-decoration: underline;
}
</style>
