import router from './router'
import store from './store'
import { resetRouter } from '@/router'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  const islogin = sessionStorage.getItem('islogin')
  // const islogin = true
  const id = sessionStorage.getItem('id')

  // debugger
  console.log('to.path', to.path)
  if (to.path.includes('/admin') || to.path === '/admin/login') {
    // console.log('后台');
    if (islogin == null && to.path === '/admin/login') {
      next()
    } else if (islogin == null && to.path !== '/admin/login') {
      next('/admin/login')
      // next()
    } else if (islogin != null && to.path === '/admin/login') {
      next('/admin')
    } else {
      // 修改路由
      console.log('调用路由===')
      // resetRouter();
      next()
    }
  } else if (islogin == null && to.path === '/register') {
    next()
  }
})

router.afterEach(() => {
})
