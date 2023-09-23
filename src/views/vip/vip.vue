<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span></span>
					<el-row :gutter="5">
						<el-col :span="6"><el-input style="vertical-align: middle;" v-model="data.vip" @input="handleSearch"
								size="large" placeholder="手机号搜索" :suffix-icon="Search" /></el-col>
						<el-col :span="6"> <el-button size="large" type="primary" @click="handleSearch"
								:icon="Search">搜索会员</el-button>
						</el-col>
						<el-col :span="8"><el-button type="primary" size="large" @click="addvisible = true"
								class="button">加入会员</el-button></el-col>
					</el-row>


				</div>
			</template>
			<el-table :data="data.goodsList" border style="width: 100%" empty-text="暂无会员">
				<el-table-column prop="id" label="序号" width="60" />
				<el-table-column prop="name" label="姓名" />
				<el-table-column prop="phone_number" label="手机号" />
				<!-- <el-table-column prop="date_of_birth" label="出生日期" /> -->
				<el-table-column prop="balance" label="账户余额" />
				<el-table-column prop="zhekou_balance" label="可折扣金额" />
				<el-table-column prop="real_balance" label="不可折扣金额" />
				<el-table-column prop="level" label="会员等级" />
				<el-table-column align="right">
					<template #header>
						记录
						<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
					</template>
					<template #default="scope">
						<el-button size="large" type="primary"
							@click="getchongzhi(scope.$index, scope.row)">充值记录</el-button>


					</template>
				</el-table-column>
				<el-table-column align="right">
					<template #header>
						充值
						<!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
					</template>
					<template #default="scope">

						<el-button size="large" type="primary"
							@click="handlebalance(scope.$index, scope.row)">充值</el-button>

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
			<el-pagination :page-size="data.pageSize" :current-page="data.page" background layout="prev, pager, next"
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
			<el-form :model="data.goodsform" ref="addForm" label-width="120px">
				<el-form-item label="会员姓名">
					<el-input v-model="data.goodsform.name" />
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="data.goodsform.phone_number" />

				</el-form-item>
				<el-form-item label="出生日期">
					<!-- <el-input v-model="data.goodsform.date_of_birth" /> -->
					<el-date-picker v-model="data.goodsform.date_of_birth" value-format="YYYY-MM-DD" format="YYYY-MM-DD"
						type="date" placeholder="选择出生日期" />
				</el-form-item>
				<el-form-item label="会员等级">
					<el-select v-model="data.goodsform.level" class="m-2" placeholder="Select" size="large">
						<el-option v-for="item in data.level" :key="item.id" :label="item.level" :value="item.id" />
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitGoods">确定</el-button>
					<el-button @click="addvisible = false">取消</el-button>
				</el-form-item>
			</el-form>

		</el-drawer>
		<!-- 充值弹窗 -->
		<el-dialog v-model="chongzhiVisible" title="会员充值" width="30%" :before-close="handleClose">
			<div class="info" style="">
				<!-- <el-alert :title="`您即将为${data.chongzhiUser.name},手机号为${data.chongzhiUser.phone_number}的会员充值！`" type="success" :closable="false" /> -->
				您即将为{{ data.chongzhiUser.name }},手机号为{{ data.chongzhiUser.phone_number }}的会员充值！

			</div>
			<div>
				<el-form :model="data.chongzhi" label-width="120px">

					<el-form-item label="充值可折扣金额">
						<el-input-number v-model="data.chongzhi.zhekou_balance" size="large" :precision="2" :step="0.1" />
					</el-form-item>
					<el-form-item label="不可折扣金额">
						<el-input-number v-model="data.chongzhi.real_balance" size="large" :precision="2" :step="0.1" />
					</el-form-item>
					<el-form-item label="实付金额">
						<el-input-number v-model="data.chongzhi.pay_balance" size="large" :precision="2" :step="0.1" />
					</el-form-item>

					<el-form-item label="充值方式">
						<el-select v-model="data.chongzhi.type" size="large" placeholder="请选择充值方式">
							<el-option label="网络支付(微信)" value="网络支付(微信)" />
							<el-option label="网络支付(支付宝)" value="网络支付(支付宝)" />
							<el-option label="现金" value="现金" />
							<el-option label="活动支付" value="活动支付" />
						</el-select>
					</el-form-item>
				</el-form>
			</div>

			<template #footer>
				<span class="dialog-footer">
					<el-button size="large" @click="chongzhiVisible = false">取消充值</el-button>
					<el-button type="primary" size="large" @click="addchongzhi">
						确认充值
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 充值记录 -->
		<el-drawer size="50%" v-model="getchongzhivisible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<h4 :id="titleId" :class="titleClass">充值记录</h4>
				<el-button type="danger" @click="close">
					<el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon>
					关闭
				</el-button>
			</template>
			<el-descriptions title="" v-for="item in data.chongzhihistory" :key="item.id" :column="6" border>
				<el-descriptions-item label="实付金额" width="100" label-align="center"
					align="center">{{ item.pay_balance }}</el-descriptions-item>
				<el-descriptions-item label="不可折扣金额" width="70" label-align="center"
					align="center">{{ item.real_balance }}</el-descriptions-item>
				<el-descriptions-item label="折扣金额" width="60" label-align="center"
					align="center">{{ item.zhekou_balance }}</el-descriptions-item>
				<el-descriptions-item label="时间" label-align="center"
					align="center">{{ item.create_time }}</el-descriptions-item>
				<el-descriptions-item label="方式" label-align="center" width="150"
					align="center">{{ item.type }}</el-descriptions-item>
			</el-descriptions>
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
import {
	useRouter
} from 'vue-router'
import {
	Delete,
	Edit,
	Search,
	Share,
	Upload
} from '@element-plus/icons-vue'
const addForm = ref(null)
const router = useRouter()
const chongzhiVisible = ref(false)
const data = reactive({
	goodsList: [],
	page: 1,
	pageSize: 10,
	row: 0,
	title: "新会员入会",
	goods_class: [],
	goodsform: {},
	vip: "",
	chongzhi: {},
	chongzhiUser: {},
	chongzhihistory: [],
	level:[],
})
const deleteDialog = ref(false)
const addvisible = ref(false)
const getchongzhivisible = ref(false)
onMounted(() => {
	getGoodsList()
	getlevel()

})
const handleSearch = (res) => {
	getGoodsList()
}
const handlebalance = (index, row) => {
	data.chongzhiUser = row
	chongzhiVisible.value = true
}
const tosku = (index, row) => {
	router.push({
		path: "/setting/sku",
		query: {
			goods_id: row.id
		}
	})
}
const getlevel=()=>{
	service({
		url: "getlevel",
		method: "post",}).then((res)=>{
			data.level=res.data
		})
}
const kucun = (index, row) => {
	router.push({
		path: "/setting/kucun",
		query: {
			goods_id: row.id
		}
	})
}
const addchongzhi = () => {
	service({
		url: "chongzhi",
		method: "post",
		data: {
			type: data.chongzhi.type,
			real_balance: data.chongzhi.real_balance,
			vip_id: data.chongzhiUser.id,
			zhekou_balance: data.chongzhi.zhekou_balance,
			pay_balance: data.chongzhi.pay_balance,
			balance: data.chongzhi.real_balance + data.chongzhi.zhekou_balance
		}
	}).then((res) => {
		chongzhiVisible.value = false
		getGoodsList()

		ElMessage({
			type: 'success',
			message: `充值成功，金额${data.chongzhi.balance}`,
		})
	})
}
const getchongzhi = (index, row) => {
	service({
		url: "getchongzhi",
		method: "post",
		data: {
			id: row.id
		}
	}).then((res) => {
		getchongzhivisible.value = true
		data.chongzhihistory = res.data
		ElMessage({
			type: 'success',
			message: `ok`,
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
	data.goodsform.product_img = baseUrl + response.data
}

function handleEdit(index, row) {
	data.goodsform = row
	data.title = "修改会员信息"
	addvisible.value = true

}

function submitGoods() {
	// data.goodsform.balance = data.goodsform.zhekou_balance + real_balance
	service({
		url: "editvip",
		method: "post",
		data: data.goodsform
	}).then((res) => {
		getGoodsList()
		ElMessage({
			type: 'success',
			message: 'ok',
		})
	})
	data.goodsform = {}
	// addForm.value.resetFields();
	addvisible.value = false
	data.title = "新会员入会"
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
				url: "deletevip",
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
		pageSize: data.pageSize,
		key: data.vip
	}
	service({
		url: "getvip",
		method: "post",
		data: reqdata
	}).then((res) => {
		if (res.code) {
			data.goodsList = res.data.row;
			data.row = res.data.count;
			// ElNotification({
			// 	title: '成功',
			// 	message: res.message,
			// 	type: 'success',
			// })
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

.info {
	font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
		'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	font-size: 1.3rem;
	color: #67c23a;
	background-color: #f0f9eb;
	margin-bottom: 0.625rem;
	align-items: center;
	padding: 8px 16px;
	border-radius: 4px;
}
</style>