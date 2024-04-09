import Layout from '@/layout'

// 管理员路由
const guanliyuanRoute = [

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/admin',
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/admin/register'),
    hidden: true
  },

  // 后台
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/admin/index'),
        meta: { title: '系统首页' }
      },

      {
        path: 'reconstruction',
        component: () => import('@/views/reconstruction'),
        meta: { title: '三维重建' }
      },

      {
        path: 'analysis',
        component: () => import('@/views/analysis'),
        meta: { title: '表型分析' }
      },
      {
        path: 'classification',
        component: () => import('@/views/classification'),
        meta: { title: '植物分类' }
      },
      {
        path: 'disease',
        component: () => import('@/views/disease'),
        meta: { title: '病害分析' }
      },
      {
        path: 'sysmeue',
        component: () => import('@/layout/components/AppMain'),
        meta: { title: '系统管理' },
        // redirect: '/admin/sysmeue/user',
        // hidden: adminRole,
        children: [
          {
            path: 'user',
            component: () => import('@/views/admin/user'),
            meta: { title: '用户管理' }
          }

        ]
      }
    ]
  },
  {
    path: '/admin/login',
    hidden: true,
    component: () => import('@/views/admin/login&register'),
    meta: { title: '后台登陆', icon: 'dashboard' }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const adminRoute = guanliyuanRoute

/* let userRole=sessionStorage.getItem("userRole");
console.log("userRole===",userRole);
if(userRole=='user'){
  curRoute=userRoute;
} */

export { adminRoute }
