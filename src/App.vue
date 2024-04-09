<!--路由配置的地方-->
<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left'
    }
  }
}
</script>
<style lang="less">
// @import "./common/style/public.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  outline: none;
}

html,
body {
  height: 100%;
  font-size: 14px;
}

body {
  position: relative;
  background: linear-gradient(45deg, rgb(33, 126, 166), rgb(46, 186, 118));
}
.register-form .el-form,
.login-form .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-form .el-input__inner,
.login-form .el-input__inner{
  height: 40px;
  text-indent: 4px;
  border: 1px solid #157580;
  transition: all 0.5s;
  border-radius: 40px;
}

.register-form .el-input__inner:focus,
.login-form .el-input__inner:focus{
  color: #157580;
  font-size: 20px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #373737;
}

.router-view {
  width: 100%;
  // height: auto;
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
