<template>
  <div class="register-form">
    <div class="title-box">
      <h1>注册</h1>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" type="text" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input v-model="ruleForm.checkPassword" type="password" placeholder="确认密码" />
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <button @click="handleRegister('ruleForm')">注册</button>
      <p @click="switchMode">已有账号，去登陆</p>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
export default {
  name: 'RegisterForm',
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
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 切换登录/注册模式
    switchMode() {
      this.ruleForm.userName = ''
      this.ruleForm.password = ''
      this.ruleForm.checkPassword = ''
      this.switchForm()
    },
    handleRegister(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('submit!')
          // request({
          //   url: 'user/register',
          //   method: 'post',
          //   data: {
          //     username: this.ruleForm.userName,
          //     pwd: this.ruleForm.password
          //   }
          // })
          //   .then((res) => {
          //     if (res.code === 200) {
          //       if (res.msg === 'success') {
          //         this.$router.push({ path: '/admin' })
          //       }
          //     } else if (res.code === 400) {
          //       this.$message.error(res.msg)
          //     }
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
.register-form {
    float: left;
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
