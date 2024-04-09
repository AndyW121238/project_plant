<template>
  <div class="dashboard-container">
    <h2>欢迎 <a class="">

      {{ name }}</a> 进入植物分析处理系统</h2>

  </div>

</template>

<script>
import * as api from '@/api/api'
import Middle from '@/components/Middle/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Enduit from '@/components/WangEnduit/index.vue'
import request from '@/utils/request'

export default {
  components: { Middle, Dialog, Pagination, Enduit },
  data() {
    return {
      name: ''

    }
  },
  computed: {},
  created() {
    this.name = sessionStorage.getItem('username')
  },
  mounted() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card {
  width: 50%;
  background: #fff;
  color: #fff;
  border-radius: 10px;
  height: 300px;
}
</style>
<style>
.echarts {
  width: 100%;
  height: 500px;
}
</style>
