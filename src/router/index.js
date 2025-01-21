import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Menu from '@/views/Menu'
import Hello2 from '@/views/Hello2'
import Layout from '@/views/Layout'
/*
import '@/assets/css/global.css'
*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/Hello2',
      name: 'Hello2',
      component: Hello2
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout
    }
  ]
})
