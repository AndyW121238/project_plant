<!-- main内容组件 -->
<template>
  <div class="f-r f-j-c">
    <div class="app-middle">
      <Breadcrumb v-if="showBread" />
      <el-card v-if="showSearch" class="middle-box-card" shadow="never">
        <slot name="search" />
      </el-card>
      <slot />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
export default {
  components: { Breadcrumb },
  props: {
    title: {
      type: String,
      default: ''
    },
    showBread: {
      // 是否显示面包屑
      type: Boolean,
      default: true
    },
    showSearch: {
      // 是否显示搜索
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.app-middle {
}
.header-card {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
}
.middle-title-block {
  width: 4px;
  height: 22px;
  margin-right: 8px;
  background: linear-gradient(
    180deg,
    rgba(0, 101, 219, 1) 0%,
    rgba(92, 174, 255, 1) 100%
  );
}
.middle-box-card >>> .el-card__body {
  padding: 20px 20px 20px 20px;
}
</style>
