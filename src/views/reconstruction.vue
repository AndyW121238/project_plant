<template>
  <div>

    <div class="dashboard-container">

      <el-card slot class="content-card" shadow="never">
        <el-form ref="itemSaveEditForm" :model="itemSaveEditForm" label-width="80px" class="itemSaveEditForm" label-position="left" size="small">
          <!-- <el-form-item label="文件类型:">
          <el-select v-model="itemSaveEditForm.type" placeholder="请选择文件类型">
            <el-option  key="图片"  label="图片"   value="图片"  >
            </el-option>
            <el-option  key="pdf"  label="pdf"   value="pdf"  >
            </el-option>
            <el-option  key="word"  label="word"   value="word"  >
            </el-option>
            <el-option  key="压缩包"  label="压缩包"   value="压缩包"  >
            </el-option>
            <el-option  key="其他"  label="其他"   value="其他"  >
            </el-option>
          </el-select>
		    </el-form-item> -->
          <!--  <el-form-item label="文件:">
          <el-input v-model="itemSaveEditForm.file" placeholder="文件"></el-input>
        </el-form-item> -->

          <el-form-item label="文件:">
            <el-upload
              class="upload-demo"
              :action="fileMulUploadUrl"
              :on-success="fileSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="itemSaveEditForm.fileArr"
            >
              <el-button size="small" type="primary">点击上传视频</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="getData()">开始处理</el-button>
        <div class="image-row">
          <img v-for="(image, index) in images" :key="index" :src="image" alt="Image">
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Middle from '@/components/Middle/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Enduit from '@/components/WangEnduit/index.vue'
import * as api from '@/api/api'
import request from '@/utils/request'

export default {
  components: { Middle, Dialog, Pagination, Enduit },
  data() {
    return {
      selItem: undefined,
      url: process.env.VUE_APP_BASE_FILE,
      fileMulUploadUrl: process.env.VUE_APP_BASE_API + 'file/upload',
      offset: 1, // 当前页
      limit: 10, // 每页大小
      total: 0, // 总记录数
      hidden: false, // 分页是否隐藏
      saveUpdateTitle: '新增',
      searchForm: {
        name: ''
      },
      itemSaveEditForm: {
        // img: "",
      },
      infoMap: {},
      list: [],
      showDialog: false,
      loginUser: {},

      rules: {
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
        ]
      },
      images: [
        require('@/assets/img/pic1.jpeg'),
        require('@/assets/img/pic1.jpeg'),
        require('@/assets/img/pic1.jpeg'),
        require('@/assets/img/pic1.jpeg')
      ]

    }
  },
  computed: {},

  created() {
    // this.initData();
    // this.getData();
  },

  mounted() {

  },

  methods: {

    // 获取初始化数据
    async initData() {
      // 获取跳转路由值
      console.log('路由参数', this.$route.query)

      // 获取当前登录用户信息
      const loginUsername = sessionStorage.getItem('username')

      debugger
      this.infoMap.loginUser = JSON.parse(sessionStorage.getItem('loginUser'))
      console.log('loginUser', this.infoMap)

      await request({
        url: 'user/selectByUsername',
        method: 'post',
        // form提交
        params: {
          user: loginUsername
        }
      })
        .then((res) => {
          if (res.code === 200) {
            this.loginUser = res.data
            console.log('this.loginUser', this.loginUser)
          } else {
            this.$message.error(res.msg)
          }
        })
    },

    // 大图上传
    imgSuccess(file) {
      this.itemSaveEditForm.img = file.data
    },

    // 移除图片
    handleRemove(file, fList) {
      debugger
      console.log('file', file)
      console.log('fileList', fList)
      this.itemSaveEditForm.fileArr = fList

      this.itemSaveEditForm.file = undefined

      this.itemSaveEditForm.fileArr.forEach(curFile => {
        if (this.itemSaveEditForm.file !== undefined) {
          const havefile = JSON.stringify(curFile)
          this.itemSaveEditForm.file = havefile + ';' + JSON.stringify(curFile)
        } else {
          this.itemSaveEditForm.file = JSON.stringify(curFile)
        }
      })

      console.log('remove', this.itemSaveEditForm.file)

      // fileListCopy.data = fileListCopy.data.filter(v => v.uid !== file.uid);
    },

    // 文件上传
    // 考虑多个文件的情况
    fileSuccess(file) {
      debugger
      if (this.itemSaveEditForm.file !== undefined) {
        const havefile = this.itemSaveEditForm.file
        this.itemSaveEditForm.file = havefile + ';' + JSON.stringify(file.data)
      } else {
        this.itemSaveEditForm.file = JSON.stringify(file.data)
      }
    },

    // 获取列表
    /* 调用api方法的写法
   getData11() {
      api
        .userlist({
          name: this.searchForm.name,
          offset: this.offset,
          limit: this.limit,
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        });
    },  */

    getData() {
      // post requestBody方式提交
      this.searchForm.offset = this.offset
      this.searchForm.limit = this.limit
      debugger
      if (this.infoMap.loginUser.type === 2) {
        this.searchForm.applyUid = this.infoMap.loginUser.id
      }

      request({
        url: 'apply/getlist',
        method: 'post',
        /*  data: {
                name: this.searchForm.name,
                offset: this.offset,
                limit: this.limit,

            } */
        data: this.searchForm
      })
        .then((res) => {
          if (res.code === 200) {
            this.list = res.data.list
            this.total = res.data.total
          }
        })
    },

    // 模态框-关闭
    close() {
      this.showDialog = false
      const time = setTimeout(() => {
        this.resetData('itemSaveEditForm', this) // 重置数据
      }, 300)
    },

    // 删除
    async del(item) {
      await request({
        url: 'apply/del',
        method: 'post',
        params: {
          id: item.id
        }
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('操作成功!')
          } else {
            this.$message.error(res.msg)
          }
        })

      await this.getData()
    },

    // 新增/编辑-提交
    async confirm() {
      // 验证是否填入所有信息
      try {
        Object.keys(this.itemSaveEditForm).forEach((k) => {
          if (this.itemSaveEditForm[k] === '') {
            // throw new Error("请填写所有信息");
          }
        })
      } catch (err) {
        this.$message.error('请填写所有信息')
        return
      }
      this.itemSaveEditForm.applyUid = this.infoMap.loginUser.id
      await request({
        url: 'apply/save',
        method: 'post',
        data: this.itemSaveEditForm
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('操作成功!')
            this.showDialog = false
          } else {
            this.$message.error(res.msg)
          }
        })

      await this.getData()
    },

    // 编辑
    edit(item) {
      this.itemSaveEditForm = JSON.parse(JSON.stringify(item)) // 对象拷贝防止重置对象时污染

      if (this.itemSaveEditForm.file !== undefined) {
        this.itemSaveEditForm.fileArr = []
        debugger
        this.itemSaveEditForm.file.split(';').forEach(element => {
          debugger
          const fileItem = JSON.parse(element)
          this.itemSaveEditForm.fileArr.push({ name: fileItem.name, url: fileItem.url })
        })
      }

      this.showDialog = true
      this.saveUpdateTitle = '修改'
    },

    // 定义一个获取子组件传值的方法
    test(datas) {
      // datas 就是子向父传过来的数据
      // 由于函数内的参数 不能直接用于渲染
      // 所以我们需要在父组件的data中 定义一个变量
      // 来接收一下 子组件传递过来的参数
      // this.data1 = datas;
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.searchForm {
  ::v-deep .el-form-item__label {
    color: #efefef;
  }
}

.content-card .el-card__body {
  padding: 20px !important;
}

.image-row {
  margin-top: 20px;
  display: flex; /* 或者使用 flex 或 grid 来实现更复杂的布局 */
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 20px;

  img {
    width: 200px;
    height: 200px;
  }
}
</style>
