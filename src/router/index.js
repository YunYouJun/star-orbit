import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import StarMap from '@/components/StarMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
