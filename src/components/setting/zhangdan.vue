<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span></span>
					<!-- <el-button type="primary" @click="addvisible=true" class="button" >添加球台</el-button> -->
					<!--  <el-button type="primary" v-if="!isEdit" @click="isEdit=!isEdit" class="button" >更改库存或价格</el-button>
				<el-button type="primary" v-else @click="isEdit=!isEdit" class="button" >取消更改</el-button>
				<el-button type="primary" @click="isEdit=!isEdit" class="button" >保存更改的库存或价格信息</el-button> -->
				</div>
			</template>
			<el-table :data="data.qiutaiList" border style="width: 100%" empty-text="暂无账单数据">
				<el-table-column prop="uuid" label="序号" />
				<el-table-column prop="sum_count" label="总消费" />
				<el-table-column prop="price" label="实际支付" />
				<el-table-column prop="qiutai_count" label="球台消费" />
				<el-table-column prop="zhujiao_count" label="助教消费" />
				<el-table-column prop="food_count" label="商品消费" />
				<el-table-column prop="create_time" label="结账时间" />
				<el-table-column prop="type" label="支付方式" />
				<el-table-column prop="vip" label="是否会员结账" />



			</el-table>
			<el-pagination background layout="prev, pager, next" @update:current-page="next"  :current-page="data.page" :total="data.row"/>
		</el-card>

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
const addvisible = ref(false)
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const goods_id = route.query.goods_id
const isEdit = ref(false)
const data = reactive({
	goodsList: [],
	page: 1,
	pageSize: 10,
	row: 0,
	title: "添加球台",
	qiutaiList: [],
	qiutaiForm: {}
})
onMounted(() => {
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
		url: "getzhangdan",
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
			ElNotification({
				title: '错误',
				message: res.message,
				type: 'error',
			})
		}
	})
}
function handleEdit(index, row) {
	data.qiutaiForm = row
	data.title = "编辑球台"
	addvisible.value = true

}
function submitGoods() {

	service({
		url: "editqiutai",
		method: "post",
		data: data.qiutaiForm
	}).then((res) => {
		getqiutai()
		ElMessage({
			type: 'success',
			message: 'ok',
		})
	})

	addvisible.value = false
	data.title = "添加球台"
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

<style lang="less"></style>