<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span></span>
					<el-button type="primary" @click="addvisible = true" class="button">添加助教</el-button>
				</div>
			</template>
			<el-table :data="data.goodsList" border style="width: 100%" empty-text="暂无助教">
				<el-table-column prop="id" label="序号" width="180" />
				<el-table-column prop="name" label="助教姓名" />
				<el-table-column prop="age" label="年龄" />
				<el-table-column prop="img" label="照片" />
				<el-table-column prop="price" label="价格(元/每分钟)" />
				<el-table-column prop="create_time" label="创建时间" />
				<el-table-column align="right">
					<template #header>
						是否上架
					</template>
					<template #default="scope">
						<el-switch v-model="scope.row.flag" active-value="1" inactive-value="0"
							@change="isshangjia(scope.row)" />
					</template>
				</el-table-column>
				<el-table-column align="right">
					<template #header>
						操作
						<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
					</template>
					<template #default="scope">
						<el-button size="large" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="large" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>

			</el-table>

			<el-pagination background layout="prev, pager, next" @update:current-page="next" :current-page="data.page"
				:total="data.row" />
		</el-card>
		<!-- tanchuceng -->
		<el-drawer v-model="addvisible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<h4 :id="titleId" :class="titleClass">{{ data.title }}</h4>
				<el-button type="danger" @click="close">
					<el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon>
					关闭
				</el-button>
			</template>
			<el-form :model="data.goodsform" label-width="120px">
				<el-form-item label="助教姓名">
					<el-input v-model="data.goodsform.name" />
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="data.goodsform.age" />

				</el-form-item>
				<el-form-item label="价格(元/每分钟)">
					<el-input v-model="data.goodsform.price" />

				</el-form-item>
				<el-form-item label="首页照片">
					<el-upload class="avatar-uploader" :action="`${baseUrl}index/uploadImage`" :show-file-list="false"
						:on-success="handleAvatarSuccess">
						<img v-if="data.goodsform.img" :src="data.goodsform.img" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon">
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="个人简介">
					<el-input v-model="data.goodsform.content" :rows="2" type="textarea" placeholder="Please input" />
				</el-form-item>
				<el-form-item label="照片墙">
					<el-upload v-model:file-list="data.goodsform.fileList" :action="`${baseUrl}index/uploadImage`"
						list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="uploadsuccess"
						:on-remove="handleRemove">
						<el-icon>
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitGoods">确定</el-button>
					<el-button @click="addvisible = false">取消</el-button>
				</el-form-item>
			</el-form>

		</el-drawer>
		<el-dialog v-model="dialogVisible">
			<img w-full :src="dialogImageUrl" alt="Preview Image" />
		</el-dialog>

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
import { Plus } from '@element-plus/icons-vue'
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
	title: "添加助教",
	goods_class: [],
	goodsform: {
		fileList: []
	}
})
const deleteDialog = ref(false)
const addvisible = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
onMounted(() => {
	getGoodsList()

})
const handleRemove = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
	dialogImageUrl.value = uploadFile.url
	dialogVisible.value = true
}
const uploadsuccess = (e) => {
	console.log(e, data.goodsform.fileList)
	let index = data.goodsform.fileList.length - 1
	data.goodsform.fileList[index].url = baseUrl + e.data
	data.goodsform.fileList[index] = {
		url: data.goodsform.fileList[index].url,
		name: data.goodsform.fileList[index].name
	}
}
function next(e) {
	console.log(e)
	data.page = e
	getGoodsList()
}
const tosku = (index, row) => {
	router.push({ path: "/setting/sku", query: { goods_id: row.id } })
}
const kucun = (index, row) => {
	router.push({ path: "/setting/kucun", query: { goods_id: row.id } })
}
const isshangjia = (e) => {
	console.log(e)
	service({
		url: "editzhujiao",
		method: "post",
		data: e
	}).then((res) => {
		getGoodsList()
		ElMessage({
			type: 'success',
			message: 'ok',
		})
	})
}
function getGoodsClass() {
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
const handleAvatarSuccess = (
	response,
	uploadFile
) => {
	data.goodsform.img = baseUrl + response.data
}
function handleEdit(index, row) {
	data.goodsform = row
	data.title = "编辑助教信息"
	addvisible.value = true

}
function submitGoods() {
	service({
		url: "editzhujiao",
		method: "post",
		data: data.goodsform
	}).then((res) => {
		getGoodsList()
		ElMessage({
			type: 'success',
			message: 'ok',
		})
	})

	addvisible.value = false
	data.title = "添加商品"
}

function handleDelete(index, row) {

	ElMessageBox.confirm(
		`确认删除${row.name}?`,
		'Warning', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}
	)
		.then(() => {
			service({
				url: "deletezhujiao",
				method: "post",
				data: row
			}).then((res) => {
				getGoodsList()
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
		url: "getzhujiao",
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