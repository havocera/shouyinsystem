<template>
	<div class="zhangdan">
		<div class="zhuohao_title">
			<div v-if="data.select_qiutai.length != 0">
				<span v-for="(o, i) in data.select_qiutai">{{ o.number }}号桌/</span>
			</div>
			<div v-else>暂未选择结账的桌号</div>
			<div class="select_zhuohao" @click="drawer = true">选择桌号</div>
		</div>
		<el-scrollbar height="80vh">
			<el-row class="row-bg">
				<el-col :span="8">
					<div class="cart">
						<el-card class="box-card">
							<template #header>
								<div class="card-header">

									<span> <el-icon>
											<ShoppingCartFull />
										</el-icon>球台计时账单</span>
									<!-- <el-button class="button" text>Operation button</el-button> -->
								</div>
							</template>
							<div>

								<div class="goods">
									<div>
										<div v-for="(qiutaiitem, qiutaiindex) in data.zhangdan.qiutai" :key="qiutaiindex">


											<div style="display: flex;">

												<div style="justify-content: start;flex: 4;">{{ qiutaiitem.count }}分钟
												</div>
												<div style="justify-content: end;flex: 1;">￥：{{ qiutaiitem.price }}</div>
											</div>
											<div style="display: flex;width: 100%;">
												<!-- 	<div style="justify-content: start;flex: 4;" >{{sku_item.sku.sku}}</div>
											<div style="justify-content: end;flex: 1;" >数量：X{{sku_item.num}}</div>
											<div @click="delcart(sku_item)" style="color: red;cursor: pointer; " >删除</div> -->
												<!-- <el-row>
												<el-col :span="6">{{sku_item.sku.sku}}</el-col>
												<el-col :span="6">{{sku_item.num}}</el-col>
											</el-row> -->
											</div>
											<el-divider border-style="dashed" />
										</div>
									</div>
									<el-empty v-if="data.zhangdan.lenght == 0" description="您还没选择商品!" />
								</div>

								<div class="heji">
									<div class="jine">
										总计金额：{{ data.qiutai_count }}
									</div>
									<div class="xiadan" @click="dandujiezhang(data.zhangdan.qiutai,data.qiutai_count,'qiutai')">单独结算</div>
								</div>
							</div>

						</el-card>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="cart">
						<el-card class="box-card">
							<template #header>
								<div class="card-header">

									<span> <el-icon>
											<ShoppingCartFull />
										</el-icon>购物账单</span>
									<!-- <el-button class="button" text>Operation button</el-button> -->
								</div>
							</template>
							<div>

								<div class="goods">
									<div v-for="(qiutaiitem, qiutaiindex) in data.zhangdan.foodzhangdan" :key="qiutaiindex">


										<div style="display: flex;">

											<div style="justify-content: start;flex: 4;">{{ qiutaiitem.goods }}</div>
											<div style="justify-content: end;flex: 1;">￥：{{ qiutaiitem.price }}</div>
										</div>
										<div style="display: flex;width: 100%;">
											<div style="justify-content: start;flex: 4;">{{ qiutaiitem.sku }}</div>
											<div style="justify-content: end;flex: 1;">数量：X{{ qiutaiitem.num }}</div>
											<div @click="delcart(qiutaiitem)" style="color: red;cursor: pointer; ">删除
											</div>
											<!-- <el-row>
											<el-col :span="6">{{sku_item.sku.sku}}</el-col>
											<el-col :span="6">{{sku_item.num}}</el-col>
										</el-row> -->
										</div>
										<el-divider border-style="dashed" />
									</div>
									<el-empty v-if="data.zhangdan.lenght == 0" description="您还没选择商品!" />
								</div>

								<div class="heji">
									<div class="jine">
										总计金额：{{ data.food_count }}
									</div>
									<div class="xiadan" @click="dandujiezhang(data.zhangdan.foodzhangdan,data.food_count,'food')" >单独结算</div>
								</div>
							</div>

						</el-card>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="cart">
						<el-card class="box-card">
							<template #header>
								<div class="card-header">

									<span> <el-icon>
											<ShoppingCartFull />
										</el-icon> 助教账单</span>
									<!-- <el-button class="button" text>Operation button</el-button> -->
								</div>
							</template>
							<div>

								<div class="goods">
									<div v-for="(qiutaiitem, qiutaiindex) in data.zhangdan.zhujiao" :key="qiutaiindex">


										<div style="display: flex;">

											<div style="justify-content: start;flex: 4;">{{ qiutaiitem.count }}分钟</div>
											<div style="justify-content: end;flex: 1;">￥：{{ qiutaiitem.price }}</div>
										</div>
										<div style="display: flex;width: 100%;">
											<!-- 	<div style="justify-content: start;flex: 4;" >{{sku_item.sku.sku}}</div>
										<div style="justify-content: end;flex: 1;" >数量：X{{sku_item.num}}</div>
										<div @click="delcart(sku_item)" style="color: red;cursor: pointer; " >删除</div> -->
											<!-- <el-row>
											<el-col :span="6">{{sku_item.sku.sku}}</el-col>
											<el-col :span="6">{{sku_item.num}}</el-col>
										</el-row> -->
										</div>
										<el-divider border-style="dashed" />
									</div>
									<el-empty v-if="data.zhangdan.lenght == 0" description="您还没选择商品!" />
								</div>

								<div class="heji">
									<div class="jine">
										总计金额：{{ data.zhujiao_count }}
									</div>
									<div class="xiadan" @click="dandujiezhang(data.zhangdan.zhujiao,data.zhujiao_count,'zhujiao')">单独结算</div>
								</div>
							</div>

						</el-card>
					</div>
				</el-col>
			</el-row>
		</el-scrollbar>
		<div class="heji">
			<div class="jine">
				总计金额：{{ data.sum_count }}
			</div>
			<div class="xiadan" @click="jiezhangVisible = true">结账</div>
		</div>
		<!-- 选择桌号 -->
		<el-drawer v-model="drawer" title="选择桌号" :direction="direction" :before-close="handleClose">
			<template #header>
				<h4>选择桌号</h4>
			</template>
			<template #default>
				<div>
					<el-checkbox-group @change="getchange" v-model="data.qiutaiList" size="large">
						<el-checkbox v-for="(item, index) in data.qiutai" :label="`桌号：${item.number}`" size="large" border />
					</el-checkbox-group>
				</div>
			</template>
			<template #footer>
				<div style="flex: auto">
					<el-button @click="drawer = false" style="width: 30%;height: 60px;">取消</el-button>
					<el-button type="primary" style="width: 30%;height: 60px;" @click="getzhangdan">确定</el-button>
				</div>
			</template>
		</el-drawer>
		<!-- 结账 -->
		<el-dialog v-model="jiezhangVisible" title="结账" width="30%" :before-close="handleClose">
			<div class="info" style="">
				<!-- <el-alert :title="`您即将为${data.chongzhiUser.name},手机号为${data.chongzhiUser.phone_number}的会员充值！`" type="success" :closable="false" /> -->
				应付金额：{{ data.sum_count }}

			</div>
			<div class="info" v-if="data.is_balance_zu == 0" style="">
				会员余额充足，剩余余额￥{{ data.vip_balance }}

			</div>
			<div class="info" v-if="data.is_balance_zu == 1" style="">
				会员余额不足，剩余余额￥ {{ data.vip_balance }}

			</div>
			<div>

				<el-form :model="data.balance" label-width="120px">
					<el-form-item label="实付金额">
						<el-input-number v-model="data.balance.price" size="large" :precision="2" :step="0.1" />
					</el-form-item>
					<el-form-item label="支付方式">
						<el-select v-model="data.balance.type" size="large" placeholder="请选择充值方式">
							<el-option label="网络支付(微信)" value="网络支付(微信)" />
							<el-option label="网络支付(支付宝)" value="网络支付(支付宝)" />
							<el-option label="会员支付" value="会员支付" />
							<el-option label="现金" value="现金" />
							<el-option label="活动支付" value="活动支付" />
						</el-select>
					</el-form-item>
					<el-form-item label="会员账户">
						<el-select-v2 size="large" v-model="data.balance.vip" value-key="phone_number" filterable remote
							:remote-method="getVip" @change="getbalance" clearable :options="data.vipList"
							:loading="loading" placeholder="请输入手机号码" />
						<!-- <el-input v-model="data.balance.vip" @change="getVip" size="large" /> -->
					</el-form-item>
					<el-button type="primary" v-if="data.is_balance_zu == 1" @click="tovip">去充值</el-button>
				</el-form>
			</div>

			<template #footer>
				<span class="dialog-footer">
					<el-button size="large" @click="jiezhangVisible = false">取消结账</el-button>
					<el-button type="primary" size="large" @click="jiezhang">
						确认结账
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 单独结账 -->
		<el-dialog v-model="dandujiezhangVisible" title="结账" width="30%" :before-close="handleClose">
			<div class="info" style="">
				<!-- <el-alert :title="`您即将为${data.chongzhiUser.name},手机号为${data.chongzhiUser.phone_number}的会员充值！`" type="success" :closable="false" /> -->
				应付金额：{{ data.dandu.sum_count }}

			</div>
			<div class="info" v-if="data.is_balance_zu == 0" style="">
				会员余额充足，剩余余额￥{{ data.vip_balance }}

			</div>
			<div class="info" v-if="data.is_balance_zu == 1" style="">
				会员余额不足，剩余余额￥ {{ data.vip_balance }}

			</div>
			<div>

				<el-form :model="data.dandu" label-width="120px">
					<el-form-item label="实付金额">
						<el-input-number v-model="data.dandu.price" size="large" :precision="2" :step="0.1" />
					</el-form-item>
					<el-form-item label="支付方式">
						<el-select v-model="data.dandu.type" size="large" placeholder="请选择充值方式">
							<el-option label="网络支付(微信)" value="网络支付(微信)" />
							<el-option label="网络支付(支付宝)" value="网络支付(支付宝)" />
							<el-option label="会员支付" value="会员支付" />
							<el-option label="现金" value="现金" />
							<el-option label="活动支付" value="活动支付" />
						</el-select>
					</el-form-item>
					<el-form-item label="会员账户">
						<el-select-v2 size="large" v-model="data.dandu.vip" value-key="phone_number" filterable remote
							:remote-method="getVip" @change="getbalancedandu" clearable :options="data.vipList"
							:loading="loading" placeholder="请输入手机号码" />
						<!-- <el-input v-model="data.balance.vip" @change="getVip" size="large" /> -->
					</el-form-item>
					<el-button type="primary" v-if="data.is_balance_zu == 1" @click="tovip">去充值</el-button>
				</el-form>
			</div>

			<template #footer>
				<span class="dialog-footer">
					<el-button size="large" @click="dandujiezhangVisible = false">取消结账</el-button>
					<el-button type="primary" size="large" @click="todandujiezhang">
						确认结账
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import {
	ref,
	reactive,
	onMounted
} from 'vue'
const drawer = ref(false)
import {
	ElNotification,
	ElMessageBox,
	ElMessage
} from 'element-plus'
const loading = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()
import service from "../../api/index.js"
const jiezhangVisible = ref(false)
const dandujiezhangVisible = ref(false)
const data = reactive({
	qiutai: [],
	qiutaiList: [],
	select_qiutai: [],
	zhangdan: {},
	qiutai_count: 0,
	food_count: 0,
	zhujiao_count: 0,
	sum_count: 0,
	del_food: [],
	balance: {},
	vipList: [],
	vip_balance: "",
	is_balance_zu: 2,
	dandu: {
		sum_count: 0,
		qiutai: [],
		zhujiao: [],
		foodzhangdan: [],
		qiutai_count: 0,
		food_count: 0,
		zhujiao_count: 0,
		_class:'',
		type:'',
		vip:'',
		vippay:'',
		price:0

	}
})
onMounted(() => {
	getqiutai()
})
const tovip = () => {
	router.push("/vip")
}

const getbalancedandu = () => {
	let index = data.vipList.findIndex(item => {
		if (item.phone_number = data.dandu.vip) {
			return true
		}
	})
	console.log(index, data.vipList[index].balance)
	if(data.dandu._class=="qiutai"){
	if (parseFloat(data.vipList[index].zhekou_balance) > data.dandu.sum_count) {
		data.vip_balance = data.vipList[index].zhekou_balance
		data.dandu.sum_count=data.dandu.sum_count*data.vipList[index].qiutaizhekou
		data.dandu.vippay="zhekou_balance"
		// data.tips=`会员余额充足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 0
	} else if(parseFloat(data.vipList[index].real_balance) > data.dandu.sum_count) {
		data.vip_balance = data.vipList[index].real_balance
		data.dandu.vippay="real_balance"
		// data.tips=`会员余额不足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 0
	}else{
		data.vip_balance = data.vipList[index].real_balance
		// data.tips=`会员余额不足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 1
	}
}else{
	if(parseFloat(data.vipList[index].real_balance) > data.dandu.sum_count) {
		data.vip_balance = data.vipList[index].real_balance
		data.dandu.vippay="real_balance"
		// data.tips=`会员余额不足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 0
	}else{
		data.vip_balance = data.vipList[index].real_balance
		// data.tips=`会员余额不足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 1
	}
}
}
const getbalance = () => {
	let index = data.vipList.findIndex(item => {
		if (item.phone_number = data.balance.vip) {
			return true
		}
	})
	// console.log(index, data.vipList[index].balance)
	
		if (parseFloat(data.vipList[index].balance) > data.sum_count) {
		data.vip_balance = data.vipList[index].balance
		// data.tips=`会员余额充足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 0
	} else {
		data.vip_balance = data.vipList[index].balance
		// data.tips=`会员余额不足，剩余余额￥ ${data.vipList[index].balance}`
		data.is_balance_zu = 1
	}
	
	
}
const getVip = (e) => {
	service({
		url: "getVippay",
		method: "post",
		data: {
			"key": e
		},
	}).then((res) => {
		if (res.code) {
			data.vipList = res.data
		} else {
			ElNotification({
				title: '错误',
				message: res.message,
				type: 'error',
			})
		}
	})
}
const getchange = (e) => {

	console.log(e)
	data.select_qiutai = []
	e.forEach((val) => {
		data.qiutai.forEach((item) => {
			console.log(val.split("："))
			if (val.split("：")[1] == item.number) {
				data.select_qiutai.push(item)
			}
		})
	})
	console.log(data.select_qiutai)

}
const dandujiezhang=(zhangdan,count,_class)=>{
	data.dandu._class=_class
	if(_class==="qiutai"){
		data.dandu.sum_count=count
	data.dandu.qiutai=zhangdan
	data.dandu.qiutai_count=count
	}else if(_class==="food"){
		data.dandu.sum_count=count
		data.dandu.foodzhangdan=zhangdan
		data.dandu.food_count=count
	}else if(_class === "zhujiao"){
		data.dandu.sum_count=count
		data.dandu.zhujiao=zhangdan
		data.dandu.zhujiao_count=count
	}
	dandujiezhangVisible.value=true


}
const todandujiezhang = () => {
	data.dandu.del_food = data.del_food
	
	service({
		url: "dandujiezhang",
		method: "post",
		data: data.dandu

	}).then((res) => {
		if (res.code) {
			data.is_balance_zu = 2
			dandujiezhangVisible.value = false
			data.dandu.qiutai = []
			data.dandu.zhujiao = []
			data.dandu.foodzhangdan = []
			data.dandu.sum_count = 0
			data.dandu.qiutai_count = 0
			data.dandu.zhujiao_count = 0
			data.dandu.food_count = 0
			data.dandu.price=0
			data.dandu.vip=''
			if(data.dandu._class==="qiutai"){
				data.qiutai=[]
				data.sum_count=data.sum_count-data.qiutai_count
				data.qiutai_count=0
			}
			if(data.dandu._class==="zhujiao"){
				data.zhujiao=[]
				data.sum_count=data.sum_count-data.zhujiao_count
				data.zhujiao_count=0
			}
			if(data.dandu._class==="food"){
				data.foodzhangdan=[]
				data.sum_count=data.sum_count-data.food_count
				data.food_count=0
			}
			ElNotification({
				title: '成功',
				message: "结账完成",
				type: 'success',
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
const delcart = (row) => {
	let index = data.zhangdan.foodzhangdan.findIndex(item => {
		if (item.id = row.id) {
			return true
		}
	})
	// data.food_count=data.food_count-row.price
	data.del_food.push(data.zhangdan.foodzhangdan[index])
	data.zhangdan.foodzhangdan.splice(index, 1)
	heji()
}
const jiezhang = () => {
	data.balance.qiutai = data.zhangdan.qiutai
	data.balance.zhujiao = data.zhangdan.zhujiao
	data.balance.foodzhangdan = data.zhangdan.foodzhangdan
	data.balance.del_food = data.del_food
	data.balance.sum_count = data.sum_count
	data.balance.qiutai_count = data.qiutai_count
	data.balance.food_count = data.food_count
	data.balance.zhujiao_count = data.zhujiao_count
	service({
		url: "jiezhang",
		method: "post",
		data: data.balance

	}).then((res) => {
		if (res.code) {
			data.is_balance_zu = 2
			jiezhangVisible.value = false
			data.zhangdan = {}
			data.sum_count = 0
			data.qiutai_count = 0
			data.zhujiao_count = 0
			data.food_count = 0
			ElNotification({
				title: '成功',
				message: "结账完成",
				type: 'success',
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
const getqiutai = () => {
	service({
		url: "getqiutaiView",
		method: "post",

	}).then((res) => {
		if (res.code) {
			data.qiutai = res.data;


		} else {
			ElNotification({
				title: '错误',
				message: res.message,
				type: 'error',
			})
		}
	})
}
const getzhangdan = () => {

	service({
		url: "getzhangdanAll",
		method: "post",
		data: data.select_qiutai

	}).then((res) => {
		if (res.code) {
			// data.select_qiutai=[]
			data.del_food = []
			data.qiutaiList = []
			data.zhangdan = res.data;
			drawer.value = false
			heji()
		} else {
			ElNotification({
				title: '错误',
				message: res.message,
				type: 'error',
			})
		}
	})
}

const heji = () => {
	data.qiutai_count = 0
	data.food_count = 0
	data.zhujiao_count = 0
	data.sum_count = 0
	data.zhangdan.qiutai.forEach((item) => {
		data.qiutai_count += parseFloat(item.price)
	})
	data.zhangdan.foodzhangdan.forEach((item) => {
		data.food_count += parseFloat(item.price)
	})
	data.zhangdan.zhujiao.forEach((item) => {
		data.zhujiao_count += parseFloat(item.price)
	})
	data.sum_count = data.qiutai_count + data.food_count + data.zhujiao_count
	data.balance.price = data.sum_count
}
</script>

<style lang="less">
.zhangdan {
	overflow: hidden;

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

	.zhuohao_title {
		--title-height: 8vh;
		--el-card-border-color: var(--el-border-color-light);
		--el-card-border-radius: 4px;
		--el-card-padding: 20px;
		--el-card-bg-color: var(--el-fill-color-blank);
		width: 100%;
		height: var(--title-height);
		border-radius: var(--el-card-border-radius);
		border: 1px solid var(--el-card-border-color);
		background-color: var(--el-card-bg-color);
		overflow: hidden;
		color: var(--el-text-color-primary);
		transition: var(--el-transition-duration);
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
		;
		margin-bottom: 5px;
		margin-top: 5px;
		line-height: var(--title-height);
		padding-left: 20px;
		display: flex;
		justify-content: space-between;

		.select_zhuohao {
			// line-height: ;
			// width: 100%;
			width: 10vh;
			text-align: center;
			background-color: rgb(70, 132, 226);
			color: rgb(255, 255, 255);
			padding-right: 16px;
			font-weight: bold;
			cursor: pointer;
		}
	}
}

.cart {
	// min-width: 25rem;
	height: 100%;
	position: relative;

	// padding-top: 5vh;
	.card-header {
		font-size: 1.3rem;


		.el-icon {
			height: 1.5rem;
			width: 1.5rem;
			vertical-align: middle;
		}
	}

	.box-card {
		height: 100%;
		min-height: 75vh;
	}

	.goods {
		overflow: auto;
		min-height: calc(100vh-(2*60)px);
		// max-height: calc(85vh - 60px);
	}

	.heji {
		position: absolute;
		bottom: 5px;
		width: 80%;
		margin: 0 auto;
		border-top: 1px dashed rgb(238, 238, 238);
		background-color: rgb(255, 255, 255);
		display: flex;
		flex-direction: space-between;
		width: 90%;
		height: 44px;
		bottom: 1px;

		.jine {
			flex: 1 1 0%;
			line-height: 44px;
			font-weight: normal;
		}

		.xiadan {
			line-height: 44px;
			background-color: rgb(70, 132, 226);
			color: rgb(255, 255, 255);
			padding: 0px 16px;
			font-weight: bold;
			cursor: pointer;
		}
	}
}

.heji {
	position: absolute;
	bottom: 5px;
	width: 80% !important;
	margin: 0 auto;
	border-top: 1px dashed rgb(238, 238, 238);
	background-color: rgb(255, 255, 255);
	display: flex;
	flex-direction: space-between;
	width: 90%;
	height: 60px;
	bottom: 1px;

	.jine {
		flex: 1 1 0%;
		line-height: 60px;
		font-weight: normal;
	}

	.xiadan {
		line-height: 60px;
		width: 10rem;
		text-align: center;
		background-color: rgb(70, 132, 226);
		color: rgb(255, 255, 255);
		padding: 0px 16px;
		font-weight: bold;
		cursor: pointer;
	}
}
</style>