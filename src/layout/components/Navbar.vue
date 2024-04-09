<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu pr20">
      <a class="mr10 font14 font-blue" @click="showDialog = true">{{ name }}</a>
      <el-button type="" class="exitBtn" @click="logout">退出</el-button>
    </div>

    <!-- 个人信息弹窗 -->
    <!-- <Dialog :show-dialog.sync="showDialog" title="个人信息" :append-body="true" width="500" @cancal="close" @confirm="saveMyInfo">
      <div slot>
        <el-form ref="loginUser" :model="loginUser" label-width="80px" class="addForm" label-position="left" size="small">

          <el-form-item label="账号:">
            <el-input v-model="loginUser.username" readonly="true" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="loginUser.pwd" readonly="true" placeholder="请输入密码" type="text" />
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="loginUser.name" readonly="true" placeholder="请输入名称" />
          </el-form-item>

        </el-form>
      </div>
    </Dialog> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Middle from '@/components/Middle/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Enduit from '@/components/WangEnduit/index.vue'
import request from '@/utils/request'
import * as api from '@/api/api'

export default {

  components: {
    Breadcrumb,
    Hamburger,
    Middle, Dialog, Pagination, Enduit
  },
  data() {
    return {
      imgUploadUrl: process.env.VUE_APP_BASE_FILE,
      name: sessionStorage.getItem('username') || '',
      loginUser: {
        user: '',
        pwd: '',
        name: '',
        tel: '',
        img: '',
        isrider: 'admin'
      },
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])

  },
  created() {
    // this.name = sessionStorage.getItem('username')
    this.initData()
  },
  methods: {
    // 获取初始化数据
    async initData() {
      // 获取当前登录用户信息
      const loginUsername = sessionStorage.getItem('username')
      console.log('loginUsername', loginUsername)
      const u = sessionStorage.getItem('loginUser')
      this.loginUser = JSON.parse(u)
      console.log('this.loginUser====', this.loginUser)
    },

    // 个人信息模态框-关闭
    close() {
      this.showDialog = false
      const time = setTimeout(() => {

      }, 300)
    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      sessionStorage.clear('islogin')
      this.$router.push(`/admin/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px #c7c7c7 dashed;
  border-radius: 10px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 108px;
  height: 108px;
  display: block;
  object-fit: cover;
}

.exitBtn {
  background-color: rgb(169, 57, 57);
  color: #fff;
}
</style>
