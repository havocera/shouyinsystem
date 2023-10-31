<template>
	<div>
		<el-row>
			<el-col v-for="(o, index) in data.rowdata" :key="o" :span="6" :offset="0">
				<el-card>
					
					<img v-if="o.start_time" src="../../assets/images/active.jpeg" class="image" />
					<img v-else src="../../assets/images/noactive.jpeg" class="image" />
					<div style="padding: 14px">
						  <el-row justify="space-between">
						    <el-col :span="6"><span>桌号：{{o.number}}</span></el-col>
							<el-col :span="16"><span><el-tag  type="success">{{o.name}}</el-tag></span></el-col>
							</el-row>
						<div class="bottom">
							<time class="time" v-if="o.start_time">开始时间:{{ o.start_time }}</time>
							<time class="time" v-else>暂无计时</time>
							<el-button type="danger" class="button"  v-if="o.start_time" @click="stopdialogFunction(o.id,o.number)" >停止计时</el-button>
							<el-button type="primary" class="startbutton button" v-else
								@click="startdialogFunction(o.id,o.number)">
								<el-icon><VideoPlay /></el-icon>
								开始</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-dialog v-model="startdialog" title="提示" width="30%" :before-close="handleClose">
			<span>确定要打开{{current_num}}号球台吗！</span>
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

	</div>
</template>
<script setup>
	import {
		ref,
		reactive,onMounted
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
	const data = reactive({
		rowdata: []
	});
	onMounted(()=>{
		getRowData()
	})
	function getRowData(){
		const resData = [{
				active: 1,
				starttime: "",
				num: 1
			},
			{
				active: 0,
				starttime: "",
				num: 2
			},
			{
				active: 1,
				starttime: "",
				num: 3
			},
			{
				active: 0,
				starttime: "",
				num: 4
			},
			{
				active: 0,
				starttime: "",
				num: 5
			},
			{
				active: 1,
				starttime: "",
				num: 6
			},
		]
		
			
			service({
				url: "getqiutaiView",
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
		
		console.log("11")
		// data.rowdata = resData
	}
	
	function startdialogFunction(id,number) {
		
		
		ElMessageBox.confirm(
				`确认开始计时${number}号球台?`,
				'Warning', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "kaitai",
					method: "post",
					data:{id:id}
				}).then((res) => {
					if (res.code) {
						
						getRowData()
						ElNotification({
							title: '提示',
							message: '球台已开启计时',
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

	function tostart(id) {
		startdialog.value=false
		
		
		
	}
	function stopdialogFunction(id,number){
		ElMessageBox.confirm(
				`确认停止计时${number}号球台?`,
				'Warning', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				service({
					url: "stopkaitai",
					method: "post",
					data:{id:id}
				}).then((res) => {
					if (res.code) {
						
						getRowData()
						ElNotification({
							title: '提示',
							message: '球台已停止计时',
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
	function tostop(num) {
		stopdialog.value=false
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
	.startbutton{
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
		width: 100%;
		display: block;
	}
</style>
