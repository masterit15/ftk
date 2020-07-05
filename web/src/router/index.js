import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '*', 
      component: () => import('../views/Notfound.vue')
    },
    {
      path: '/',
      name: 'Главная',
      component: () => import('../views/Home.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true
      }
    },
    {
      path: '/applications',
      name: 'Обращения',
      component: () => import('../views/Claims.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Авторизация',
      component: () => import('../views/Auth.vue'),
      meta: {
        layout: 'empty',
        requiresGuest: true
      }
    },
    {
      path: '/users',
      name: 'Пользователи',
      component: () => import('../views/Users.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!localStorage.getItem('user')){
      // делаем редирект на страницу авторизации
      next('/login')
    }else{
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)){
    if (localStorage.getItem('user')) {
      // делаем редирект на главную страницу
      next('/')
    } else {
      next()
    }
  }else{
    next()
  }
})

export default router