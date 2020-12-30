import Vue from 'vue'
import Router from 'vue-router'
import VueKonva from 'vue-konva'
import ElementUI from 'element-ui'

// 路由页面
import Index from '@/view/index'
import Konvamap from '@/view/konva/index'
import Detail from '@/view/detail/index'

// 引入组件
Vue.use(Router)
Vue.use(VueKonva)
Vue.use(ElementUI)

const router =  new Router({
  mode:"history",
  routes: [
    {
      path: '/home',
      name: 'HOME',
      component: Index
    },
    {
      path: '/konva/index',
      name: 'MAP',
      component: Konvamap
    },
    {
      path: '/detail/index',
      name: 'DETAIL',
      component: Detail
    }
  ]
})

router.beforeEach((to, from, next) => {
  router.options.routes.forEach(item => {
    if (item.path == to.path) {
      next();
    }
  })
});

router.afterEach(to => {
  // next();
});

export default router;
