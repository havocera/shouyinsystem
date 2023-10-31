<template>
	<div>
		<el-menu
		    :default-active="router.path"
		    class="el-menu-demo"
		    mode="horizontal"
			:router="true"
		    @select="handleSelect"
		  >
		    <el-menu-item index="/setting/goods">商品管理</el-menu-item>
			<el-menu-item index="/setting/qiutai">球台管理</el-menu-item>
			<el-menu-item index="/setting/zhujiao">助教管理</el-menu-item>
			<el-menu-item index="/setting/zhangdan">账单管理</el-menu-item>
			<el-menu-item index="/setting/vipclass">会员等级管理</el-menu-item>
			<el-menu-item index="/setting/zhanshi">展示管理</el-menu-item>
			</el-menu>
			<router-view></router-view>
		
		
	</div>

</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import SkuForm from '../../components/SkuForm';
	import goods from '../../components/setting/goods.vue';
	import qiutai from '../../components/setting/qiutai.vue';
	import zhujiao from '../../components/setting/zhujiao.vue';
	import zhangdan from '../../components/setting/zhangdan.vue';
	import { useRouter } from 'vue-router'
	const router = useRouter()
	// import {
	// 	CheckedAttributeItem,
	// 	SkuTableItem,
	// 	SourceAttriButeItem
	// } from '../../components/SkuForm/types'
	// import {
	// 	SkeletonItem
	// } from '../../components/SkuForm/types/skeleton'
	const data = reactive({
		
	})
	
	
</script>

<style>
</style>