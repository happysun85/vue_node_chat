import Vue from 'vue'
import Router from 'vue-router'
// import User from '@/components/user'
// import UserItem from '@/components/user-item'
// import Post from '@/components/post'
import Zyb from '@/components/zyb'

Vue.use(Router)
/*
 const Foo = resolve => {
 // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
 // （代码分块）
 require.ensure(['./Foo.vue'], () => {
 resolve(require('./Foo.vue'))
 })
 }
 */
export default new Router({
  routes: [
    {
      path: '/user',
      name: '用户',
      component: resolve => {
        require.ensure(['../components/user.vue'], () => {
          resolve(require('../components/user.vue'))
        }, 'test')
      }
    }, {
      path: '/user/:id',
      name: '用户详情',
      component: resolve => {
        require.ensure(['../components/user-item.vue'], () => {
          resolve(require('../components/user-item.vue'))
        }, 'test')
      },
      hidden: true
    }, {
      path: '/post',
      name: '说说',
      component: resolve => {
        require.ensure(['../components/post.vue'], () => {
          resolve(require('../components/post.vue'))
        }, 'test')
      }
    }/*, {
     path: '/zyb',
     name: '测试',
     component: Zyb
     }*/
  ]
})
