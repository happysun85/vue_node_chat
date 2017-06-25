import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user'
import UserItem from '@/components/user-item'
import Post from '@/components/post'
import Zyb from '@/components/zyb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: '用户',
      component: User
    }, {
      path: '/user/:id',
      name: '用户详情',
      component: UserItem,
      hidden: true
    }, {
      path: '/post',
      name: '说说',
      component: Post
    }/*, {
     path: '/zyb',
     name: '测试',
     component: Zyb
     }*/
  ]
})
