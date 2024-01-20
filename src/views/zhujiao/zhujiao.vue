<template>
	<div>
		<el-row>
			<el-col v-for="(o, index) in data.rowdata" :key="o" :span="4" :offset="0">
				<el-card>

					<!-- <img v-if="o.start_time" src="../../assets/images/zhujiao.jpg" class="image" /> -->
					<img :src="o.img" class="image" />
					<div style="padding: 14px">
						<el-row justify="space-between">
							<el-col :span="6"><span>{{o.name}}</span></el-col>
							<el-col :span="16"><time class="time" v-if="o.start_time">{{ o.start_time }}</time>
								<time class="time" v-else>暂无计时</time></el-col>
						</el-row>

						<div class="bottom">

							<el-button type="danger" class="button" v-if="o.start_time"
								@click="stopdialogFunction(o)">停止计时</el-button>
							<el-button type="danger" class="button" v-if="o.start_time || o.yuyue!=0"
								@click="yuyueF(o)">预约</el-button>

							<el-button type="primary" class="startbutton button" v-if="!o.start_time & o.yuyue==0"
								@click="startdialogFunction(o)">
								<el-icon>
									<VideoPlay />
								</el-icon>
								开始</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-dialog v-model="startdialog" title="请选择助教服务的球台号" width="30%" :before-close="handleClose">
			<el-radio-group v-model="data.select_qiutai">
				<el-radio :label="item.id" v-for="item in data.qiutai" size="large" border>{{item.number}}</el-radio>
		
			</el-radio-group>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="startdialog = false">取消</el-button>
					<el-button type="primary" @click="tostart(current_num)">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="stopdialog" title="提示" width="30%" :before-close="stophandleClose">
			<span>确定要停止{{current_num}}号球台吗！</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="stopdialog = false">取消</el-button>
					<el-button type="primary" @click="tostop(current_num)">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 预约记录 -->
		<el-drawer  v-model="getyuyuevisible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<h4 :id="titleId" :class="titleClass">预约记录</h4>
				<el-button type="primary" @click="toyuyue">
					<el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon>
					预约
				</el-button>
				<el-button type="danger" @click="getyuyuevisible=false">
					<el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon>
					关闭
				</el-button>
			</template>
			 <el-empty v-if="data.yuyue.length==0" description="暂无预约" />
			<el-descriptions v-else title="" v-for="item in data.yuyue" :key="item.id" :column="3" border>
				<el-descriptions-item label="桌号" label-align="center"
					align="center">{{item.number}}</el-descriptions-item>
				<el-descriptions-item label="时间" label-align="center"
					align="center">{{item.create_time}}</el-descriptions-item>
				<el-descriptions-item label="操作" label-align="center"
					align="center"><el-button type="danger" @click="startyuyue(item)">助教开始
				</el-button>
				<el-button type="danger" @click="startyuyue(item)">取消预约
				</el-button>
				</el-descriptions-item>
			</el-descriptions>
		</el-drawer>
	<!-- 预约桌号 -->
	<el-dialog v-model="yuyueadddialog" title="请选择助教服务的球台号" width="30%" :before-close="handleClose">
		<el-radio-group v-model="data.select_qiutai">
			<el-radio :label="item.id" v-for="item in data.qiutai" size="large" border>{{item.number}}</el-radio>
	
		</el-radio-group>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="yuyueadddialog = false">取消</el-button>
				<el-button type="primary" @click="toyuyueFunction()">
					确定
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
	import {
		ElNotification,
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import service from "../../api/index.js"
	const currentDate = ref(new Date())
	const startdialog = ref(false)
	const stopdialog = ref(false)
	const current_num = ref(0)
	const getyuyuevisible=ref(false)
	const yuyueadddialog = ref(false)
	const data = reactive({
		rowdata: [],
		select_qiutai: "",
		qiutai: [],
		current: {},
		yuyue: [],
		yuyue_user:"",
	});
	onMounted(() => {
		getRowData()
	})

	function getRowData() {


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
		service({
			url: "getzhujiaoView",
			method: "post",

		}).then((res) => {
			if (res.code) {
				data.rowdata = res.data;

				ElNotification({
					title: '成功',
					message: res.message,
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

	function startdialogFunction(row) {
		data.current = row;
		startdialog.value = true
		

	}
	
	function tostart() {
		startdialog.value = false
		ElMessageBox.confirm(
				`确认选择${name}助教?`,
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "startzhujiao",
					method: "post",
					data: {
						id: data.current.id,
						qiutai_id: data.select_qiutai
					}
				}).then((res) => {
					if (res.code) {

						getRowData()
						ElNotification({
							title: '提示',
							message: '助教已开启计时',
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

			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '已经取消删除！',
				})
			})

	}
	const startyuyue=(item)=>{
		ElMessageBox.confirm(
				`确认开始助教?`,
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "yuyueStartzhujiao",
					method: "post",
					data: item,
				}).then((res) => {
					if (res.code) {
						getyuyuevisible.value=false
						getRowData()
						ElNotification({
							title: '提示',
							message: '助教已开启计时',
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
		
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '已经取消删除！',
				})
			})
	}
	function stopdialogFunction(row) {
		ElMessageBox.confirm(
				`确认停止${row.name}助教?`,
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "endzhujiao",
					method: "post",
					data: {
						id: row.id,

					}
				}).then((res) => {
					if (res.code) {

						getRowData()
						ElNotification({
							title: '提示',
							message: '助教已停止计时',
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

			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '已经取消删除！',
				})
			})

	}
	const toyuyue=()=>{
		
		yuyueadddialog.value=true
		
	}
	const toyuyueFunction=()=>{
		yuyueadddialog.value=false
		service({
			url: "yuyuezhujiao",
			method: "post",
			data: {
				zhujiao_id:data.yuyue_user.id,
				qiutai_id:data.select_qiutai
			}
		}).then((res) => {
			if (res.code) {
				yuyueF(data.yuyue_user)
				ElNotification({
					title: '提示',
					message: '助教预约成功',
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
	const yuyueF = (row) => {
		data.yuyue_user=row
		service({
			url: "getyuyue",
			method: "post",
			data: {
				id: row.id
			}
		}).then((res) => {
			if (res.code) {
				data.yuyue = res.data;
		getyuyuevisible.value=true

			} else {
				ElNotification({
					title: '错误',
					message: res.message,
					type: 'error',
				})
			}
		})
	}

	function tostop(num) {
		stopdialog.value = false
		getRowData()
		ElNotification({
			title: '提示',
			message: '球台已停止计时',
			type: 'success',
		})
	}
</script>

<style lang="scss">
	.time {
		font-size: 12px;
		color: #999;
	}

	.startbutton {
		font-size: 1.4rem;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button {
		padding: 0;
		min-height: 3rem;
		min-width: 6rem;
	}

	.image {
		// width: 147px;
		height: 20rem;
		object-fit: contain;
		display: block;
		margin: 0 auto;
	}
</style>