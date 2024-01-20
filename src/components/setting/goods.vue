<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
	<div>
		<el-card class="box-card">
		    <template #header>
		      <div class="card-header">
		        <span></span>
		        <el-button type="primary" @click="addvisible=true" class="button" >添加商品</el-button>
		      </div>
		    </template>
		<el-table :data="data.goodsList" border style="width: 100%" empty-text="暂无商品">
			<el-table-column prop="id" label="序号" width="180" />
			<el-table-column prop="product_name" label="商品名称" />
			<el-table-column prop="product_img" label="商品照片" />
			<el-table-column prop="goods_class" label="商品分类" />
			<el-table-column prop="create_time" label="创建时间" />
			<el-table-column >
				<template #header>
					是否上架
				</template>
				<template #default="scope">
					<el-switch v-model="scope.row.flag" active-value="1" inactive-value="0" @change="isshangjia(scope.row)" />
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #header>
					库存管理
					<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
				</template>
				<template #default="scope">
					<el-button size="large" @click="kucun(scope.$index, scope.row)">库存管理</el-button>
					
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #header>
					操作
					<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
				</template>
				<template #default="scope">
					<el-button size="large" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="large" type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #header>
					添加商品详情
					<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
				</template>
				<template #default="scope">
					<el-button size="large" type="primary" @click="tosku(scope.$index, scope.row)">添加商品详情</el-button>
					
				</template>
			</el-table-column>
		</el-table>
		
			<el-pagination background layout="prev, pager, next" @update:current-page="pagenum"  :current-page="data.page" :total="data.row"/>
			</el-card>
		<!-- tanchuceng -->
		<el-drawer v-model="addvisible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<h4 :id="titleId" :class="titleClass">{{data.title}}</h4>
				<el-button type="danger" @click="close">
					<el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon>
					关闭
				</el-button>
			</template>
			<el-form :model="data.goodsform" label-width="120px">
				<el-form-item label="商品名称">
					<el-input v-model="data.goodsform.product_name" />
				</el-form-item>
				<el-form-item label="商品分类">
				      <el-select
				        v-model="data.goodsform.goods_class"
				        placeholder="请选择商品分类"
				        clearable
				      >
				        <el-option v-for="i in data.goods_class" :label="i.goods_class" :value="i.goods_class" />
				        
				      </el-select>
				    </el-form-item>
					<el-form-item label="商品图片">
						<el-upload
						    class="avatar-uploader"
						    :action="`${baseUrl}index/uploadImage`"
						    :show-file-list="false"
						    :on-success="handleAvatarSuccess"
						    
						  >
						    <img v-if="data.goodsform.product_img" :src="data.goodsform.product_img" class="avatar" />
						    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
						  </el-upload>
					</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitGoods">确定</el-button>
					<el-button @click="addvisible=false">取消</el-button>
				</el-form-item>
			</el-form>

		</el-drawer>
	</div>
</template>

<script setup>
	import service from "../../api/index.js"
	import {
		ElNotification,
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import baseUrl from "../../api/config.js"
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const data = reactive({
		goodsList: [],
		page: 1,
		pageSize: 10,
		row: 0,
		title: "添加商品",
		goods_class:[],
		goodsform:{}
	})
	const deleteDialog = ref(false)
	const addvisible=ref(false)
	onMounted(() => {
		getGoodsList()
		getGoodsClass()
	})
	const pagenum=(e)=>{
			data.page=e
			getGoodsList()
	}
	const isshangjia=(e)=>{
			console.log(e)
			service({
			url: "addGoods",
			method: "post",
			data:e
		}).then((res) => {
			getGoodsList()
			ElMessage({
				type: 'success',
				message: 'ok',
			})
		})
	}
	const tosku=(index,row)=>{
		router.push({path:"/setting/sku", query: {goods_id:row.id}})
	}
	const kucun=(index,row)=>{
		router.push({path:"/setting/kucun", query: {goods_id:row.id}})
	}
	function getGoodsClass(){
		service({
			url: "getGoodsClass",
			method: "post",
		}).then((res) => {
			data.goods_class = res.data
			// ElMessage({
			// 	type: 'success',
			// 	message: 'ok',
			// })
		})
	}
	const handleAvatarSuccess= (
	  response,
	  uploadFile
	) => {
		data.goodsform.product_img=baseUrl+response.data
	}
	function handleEdit(index, row) {
		data.goodsform =row
		data.title="编辑商品"
			addvisible.value=true
			
	}
	function submitGoods(){
		service({
			url: "addGoods",
			method: "post",
			data:data.goodsform
		}).then((res) => {
			getGoodsList()
			ElMessage({
				type: 'success',
				message: 'ok',
			})
		})
		
		addvisible.value=false
		data.title="添加商品"
	}

	function handleDelete(index, row) {

		ElMessageBox.confirm(
				`确认删除${row.product_name}?`,
				'Warning', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "deleteGoods",
					method: "post",
					data: row
				}).then((res) => {
					ElMessage({
						type: 'success',
						message: '删除成功',
					})
				})

			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '已经取消删除！',
				})
			})
	}

	function getGoodsList() {
		const reqdata = {
			page: data.page,
			pageSize: data.pageSize
		}
		service({
			url: "getGoodsList",
			method: "post",
			data: reqdata
		}).then((res) => {
			if (res.code) {
				data.goodsList = res.data.row;
				data.row = res.data.count;
				ElMessage({
				type: 'success',
				message: 'ok',
			})
			} else {
				ElNotification({
					title: '错误',
					message: res.message,
					type: 'error',
				})
			}
		})
	}
</script>

<style lang="less" scoped>
	.avatar-uploader .avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}
	.avatar-uploader .el-upload {
	  border: 1px dashed var(--el-border-color);
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	  transition: var(--el-transition-duration-fast);
	}
	
	.avatar-uploader .el-upload:hover {
	  border-color: var(--el-color-primary);
	}
	
	.el-icon.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 178px;
	  height: 178px;
	  text-align: center;
	}
</style>