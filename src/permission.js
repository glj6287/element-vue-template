import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {     //判断是否有tokens
    if (to.path === '/login') {
      next({ path: '/' })

    } else {
      if (store.getters.menus.length === 0) {  //判断当前用户是否已拉完信息
        store.dispatch('GetInfo').then(res => {  //拉取info
          const menus = res.data.menus
          store.dispatch('GenerateRoutes', { menus }).then(() => { //生成可访问路由表
            router.addRoutes(store.getters.addRouters) //动态添加可访问路由表
            next({ ...to })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
