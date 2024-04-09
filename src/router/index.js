import Vue from 'vue'
import Router from 'vue-router'
import request from '@/utils/request'
import { adminRoute } from './adminRoute'

import store from '../store'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// resetRouter();

// const constantRoutes=undefined;

let constantRoutes = adminRoute
const userRole = sessionStorage.getItem('userRole')
console.log('userRole===', userRole)

// 根据不同角色 给予不同路由菜单
if (userRole === 'user') {
  debugger
  constantRoutes = userRoute
  // router.options.routes = userRoute
} else {
  constantRoutes = adminRoute
  // router.options.routes = adminRoute
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  debugger
  const userRole = sessionStorage.getItem('userRole')

  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
