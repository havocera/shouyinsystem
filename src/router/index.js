import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
 
const routes = [
	{
		path: '/',
		redirect: '/kaitai'
	},
	
	{
		path: '/kaitai',
		name: 'kaitai',
		component: () => import('../views/kaitai/kaitai.vue'),
		meta: {
			title: 'kaitai'
		},
	},
	{
		path: '/diancan',
		name: 'diancan',
		component: () => import('../views/diancan/diancan.vue'),
		meta: {
			title: 'diancan'
		},
	},
	{
		path: '/zhujiao',
		name: 'zhujiao',
		component: () => import('../views/zhujiao/zhujiao.vue'),
		meta: {
			title: 'zhujiao'
		},
	},
	{
		path: '/vip',
		name: 'vip',
		component: () => import('../views/vip/vip.vue'),
		meta: {
			title: 'vip'
		},
	},
	{
		path: '/setting',
		name: 'setting',
		component: () => import('../views/setting/setting.vue'),
		meta:{
			title:"setting"
		},
		children:[
			{
				path:"goods",
				component:()=> import("../components/setting/goods.vue")
			},
			{
				path:"qiutai",
				component:()=> import("../components/setting/qiutai.vue")
			},
			{
				path:"zhangdan",
				component:()=> import("../components/setting/zhangdan.vue")
			},
			{
				path:"zhujiao",
				component:()=> import("../components/setting/zhujiao.vue")
			},
			{
				path:"sku",
				component:()=> import("../components/setting/sku.vue")
			},{
				path:"kucun",
				component:()=> import("../components/setting/kucun.vue")
			},
			{
				path:"zhanshi",
				component:()=> import("../components/setting/zhanshi.vue")
			},
		]
		
	},
	{
		path: '/zhangdan',
		name: 'zhangdan',
		component: () => import('../views/zhangdan/zhangdan.vue'),
		meta: {
			title: 'zhangdan'
		},
	},
	]
 
// router实例
const router = createRouter({
	history: createWebHashHistory(), //hash模式（若使用history模式改为createWebHashHistory()）
	routes,
});
 
 
// 全局前置守卫
router.beforeEach((to, from, next) => {
	next();
});
 
// 全局解析守卫
router.beforeResolve(async to => {});
 
// 全局后置钩子
router.afterEach((to, from, failure) => {
	// if (!failure) sendToAnalytics(to.fullPath)
});
 
export default router