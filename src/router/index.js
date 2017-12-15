import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Category from '@/pages/category'
import Rec from '@/pages/rec'
import Shopcart from '@/pages/shopcart'
import Mycenter from '@/pages/mycenter'
import Login from '@/pages/login'
import SearchList from '@/pages/searchList'
import SearchListResult from '@/pages/searchListresult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/rec',
      name: 'Rec',
      component: Rec
    },
    {
      path: '/shopcart',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path: '/mycenter',
      name: 'Mycenter',
      component: Mycenter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/searchlist',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/searchlistresult',
      name: 'SearchListResult',
      component: SearchListResult
    }
  ]
})
