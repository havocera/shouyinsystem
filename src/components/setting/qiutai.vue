<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
	<div>
		<el-card class="box-card">
		    <template #header>
		      <div class="card-header">
		        <span></span>
				<el-button type="primary" @click="addvisible=true" class="button" >添加球台</el-button>
		      <!--  <el-button type="primary" v-if="!isEdit" @click="isEdit=!isEdit" class="button" >更改库存或价格</el-button>
				<el-button type="primary" v-else @click="isEdit=!isEdit" class="button" >取消更改</el-button>
				<el-button type="primary" @click="isEdit=!isEdit" class="button" >保存更改的库存或价格信息</el-button> -->
		      </div>
		    </template>
		<el-table :data="data.qiutaiList" border style="width: 100%" empty-text="暂无球台">
			<el-table-column prop="id" label="序号"  />
			<el-table-column prop="name" label="球台名称" />
			<el-table-column prop="number" label="球台号" />
			<el-table-column prop="start_time" label="开台时间" />
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
			
			</el-table>
			<el-pagination background layout="prev, pager, next" @update:current-page="next"  :current-page="data.page" :total="data.row"/>
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
				<el-form :model="data.qiutaiForm" label-width="120px">
					<el-form-item label="球台名称">
						<el-input v-model="data.qiutaiForm.name" />
					</el-form-item>
					<el-form-item label="球台号">
						<el-input v-model="data.qiutaiForm.number" />
					      
					    </el-form-item>
						<el-form-item label="价格(每分钟)">
							<el-input-number  v-model="data.qiutaiForm.price" :precision="2" :step="0.1"  />
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
	const addvisible=ref(false)
	 import { useRouter, useRoute} from 'vue-router'
	 const route = useRoute()
	 const router = useRouter()
	 const goods_id = route.query.goods_id
	 const isEdit =ref(false)
	const data  = reactive({
		goodsList: [],
		page: 1,
		pageSize: 10,
		row: 0,
		title: "添加球台",
		qiutaiList:[],
		qiutaiForm:{}
	})
	onMounted(()=>{
		getqiutai()
	})
	function next(e){
	console.log(e)
	data.page=e
	getqiutai()
}
	function getqiutai() {
		const reqdata = {
			page: data.page,
			pageSize: data.pageSize
		}
		service({
			url: "getqiutai",
			method: "post",
			data: reqdata
		}).then((res) => {
			if (res.code) {
				data.qiutaiList = res.data.row;
				data.row = res.data.count;
				ElMessage({
				type: 'success',
				message: 'ok',
			})
			} else {
				ElMessage({
				type: 'success',
				message: 'ok',
			})
			}
		})
	}
	function handleEdit(index, row) {
		data.qiutaiForm =row
		data.title="编辑球台"
			addvisible.value=true
			
	}
	function submitGoods(){
		
		service({
			url: "editqiutai",
			method: "post",
			data:data.qiutaiForm
		}).then((res) => {
			getqiutai()
			ElMessage({
				type: 'success',
				message: 'ok',
			})
		})
		
		addvisible.value=false
		data.title="添加球台"
	}
	
	function handleDelete(index, row) {
	
		ElMessageBox.confirm(
				`确认删除${row.number}?`,
				'Warning', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "deleteqiutai",
					method: "post",
					data: row
				}).then((res) => {
					getqiutai()
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
	
</script>

<style lang="less">
</style>