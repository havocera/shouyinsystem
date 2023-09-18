<template>
	<div>
		<!-- <el-page-header @back="goBack">
		    <template #content>
		      <span class="text-large font-600 mr-3">库存管理 </span>
		    </template> -->
		 
		<el-card class="box-card">
		    <template #header>
		      <div class="card-header">
		        <span></span>
		        <el-button type="primary" v-if="!isEdit" @click="isEdit=!isEdit" class="button" >更改库存或价格</el-button>
				<el-button type="primary" v-else @click="isEdit=!isEdit" class="button" >取消更改</el-button>
				<el-button type="primary" @click="isEdit=!isEdit" class="button" >保存更改的库存或价格信息</el-button>
		      </div>
		    </template>
		<el-table :data="data.skuList" border style="width: 100%" empty-text="暂无商品">
			<el-table-column prop="id" label="序号"  />
			<el-table-column prop="sku" label="商品分类" />
			<!-- <el-table-column prop="price" label="商品价格" />
			<el-table-column prop="stock" label="库存" /> -->
			<el-table-column >
				<template #header>
					商品价格
					<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
				</template>
				<template #default="scope">
					<el-input-number v-if="isEdit" v-model="scope.row.price" :precision="2" :step="0.1"  />
					<div v-else  class="cell">{{scope.row.price}}</div>
					
				</template>
			</el-table-column>
			<el-table-column >
				<template #header>
					商品库存
					<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
				</template>
				<template #default="scope">
					<el-input-number v-if="isEdit" v-model="scope.row.stock" :precision="0" :step="1"  />
					<div v-else  class="cell">{{scope.row.stock}}</div>
					
				</template>
			</el-table-column>
			
			</el-table>
			</el-card>
			 <!-- </el-page-header> -->
	</div>
</template>

<script setup>
import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		ElNotification,
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import service from "../../api/index.js"
	const data  = reactive({
		skuList:[]
	})
	 import { useRouter, useRoute} from 'vue-router'
	 const route = useRoute()
	 const router = useRouter()
	 const goods_id = route.query.goods_id
	 const isEdit =ref(false)
	onMounted(()=>{
		getSku()
	})
	const goBack=()=>{
		router.push("/setting/goods")
	}
	const getSku=()=>{
		service({
			url: "getSku",
			method: "post",
			data:{
				id:goods_id
			}
		}).then((res) => {
			data.skuList = res.data;
			ElMessage({
				type: 'success',
				message: 'ok',
			})
			
		})
	}
</script>

<style lang="less">
</style>