<script setup>

const synth = window.speechSynthesis // 启用文本
const msg = new SpeechSynthesisUtterance()
import {
	ref,
	reactive,
	onMounted,
	onUnmounted
} from 'vue'
import {
	ElNotification,
	ElMessageBox,
	ElMessage
} from 'element-plus'
import service from "./api/index.js"
import handleSpeak from "./utils/speak.js"
const msgdrawer = ref(false)
const data = reactive({
	lastTime: null,
	msg: [],
})
function playVoice() {
	handleSpeak('一号球台呼叫') // 传入需要播放的文字
}
function gethujiao() {
	// gethujiao
	service({ method: "post", url: "gethujiao" }).then((res) => {

		if (res.data.length !== 0) {
			if (res.data[res.data.length - 1].time !== data.lastTime) {
				data.msg = res.data.slice().reverse();
				let timestamp = get10BitTimestamp();
				let dif_time = calculateDiffTime(res.data[res.data.length - 1].time, timestamp)
				console.log(dif_time)
				if(dif_time<10){
					console.log(dif_time)
					handleSpeak(`请注意，${res.data[res.data.length - 1].number}号球台呼叫服务！`)
					
				}
			
				
				data.lastTime = res.data[res.data.length - 1].time

			}
		}

	})
}
function get10BitTimestamp() {
  const date = new Date();
  const timestamp = date.getTime();
  
  return Math.floor(timestamp / 1000);
}

//计算两个时间之间的时间差 多少天时分秒
// JS 计算两个时间戳相差年月日时分秒
function calculateDiffTime(startTime, endTime) {
	return Math.abs(endTime - startTime);
}



let intervalFlush //定时器
// 定时器 每5秒调用一次接口
const interval = () => {
	clearInterval(intervalFlush)
	intervalFlush = setInterval(gethujiao, 5000)
}
onMounted(() => {
	// 设置定时器

	interval()
})
onUnmounted(() => {
	// 离开页面销毁定时器
	clearInterval(intervalFlush)
})

</script>

<template>
	<div style="height: 100%;">
		<el-container style="height: 100%;">
			<el-header class="h-header">

				<el-row class="row-bg" justify="space-between">
					<el-col :span="6">黑石点餐收银系统</el-col>
					<el-col :span="6"></el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button type="primary" @click="msgdrawer = !msgdrawer"><el-icon>
								<BellFilled />
							</el-icon></el-button>
						<el-button type="primary">刷新</el-button>
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-aside class="h-aside" width="200px">
					<div class="user">
						<el-avatar :size='60' src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
					</div>
					<el-menu default-active="/" text-color='#fff' active-text-color='#409EFF' background-color="#232e35"
						:router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						<el-menu-item index="/kaitai">
							<el-icon>
								<Basketball />
							</el-icon>
							<span>台球开台</span>
						</el-menu-item>
						<el-menu-item index="/diancan">
							<el-icon>
								<KnifeFork />
							</el-icon>
							<span>点餐</span>
						</el-menu-item>
						<el-menu-item index="/zhujiao">
							<el-icon>
								<Avatar />
							</el-icon>
							<span>助教</span>
						</el-menu-item>
						<el-menu-item index="/zhangdan">
							<el-icon>
								<List />
							</el-icon>
							<span>账单管理</span>
						</el-menu-item>
						<el-menu-item index="/vip">
							<el-icon>
								<Promotion />
							</el-icon>
							<span>会员管理</span>
						</el-menu-item>
						<el-menu-item index="/setting/goods">
							<el-icon>
								<Operation />
							</el-icon>
							<span>设置</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<transition name="el-zoom-in-top">
						<router-view />
					</transition>
				</el-main>
			</el-container>
		</el-container>
		<!-- 未读消息 -->

		<el-drawer v-model="msgdrawer" title="呼叫消息" size="20%">
			<div class="msgcard" v-for="(item, index) in data.msg" :key="index">
				<div class="msgicon">
					<el-icon color="#606266" size="20">
						<BellFilled />
					</el-icon>
				</div>
				<div class="msg">
					请注意，{{ item.number }} 号球台呼叫服务！
					<div class="msgbtn">
						<!-- <el-button round @click="playVoice">已读</el-button> -->
					</div>
				</div>

			</div>
		</el-drawer>

	</div>
</template>

<style lang="scss">
#app {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	--color-ihavoc: #232e35;
	--bg-color: #232e35
}

.msgcard {
	width: 99%;
	min-height: 5rem;
	margin: 0 auto;
	border-radius: 5px;
	background: #fff;
	border: 1px solid #ccc;
	// box-shadow: 18px 18px 36px #c5c5c5,
	// 	-18px -18px 36px #fbfbfb;
	// box-shadow:
	// 	4.8px 3.8px 5.3px rgba(0, 0, 0, 0.053),
	// 	16.1px 12.7px 17.9px rgba(0, 0, 0, 0.077),
	// 	72px 57px 80px rgba(0, 0, 0, 0.13);
	display: flex;
	justify-content: flex-start;
	padding: 5px;
	flex: 1, 5;

	.msgbtn {
		width: 100%;
		text-align: right;
	}

	.msg {
		flex: 100%;
	}

	.msgicon {
		vertical-align: middle;
	}
}

.el-header {
	// height: 100px;
	padding: 0;
}

.el-aside {

	height: 100vh;
	overflow-y: auto;
}

.el-main {
	padding: 0px 16px !important;
	height: calc(110vh - 200px);
	overflow-y: auto;
}

.h-header {
	background-color: black;
	color: #fff;
	font-size: 1.6em;
	line-height: 60px;
}

.h-aside {
	background-color: var(--color-ihavoc);
	height: 100%;

	.is-active {
		background-color: #fff;
	}

	.is-active:hover {
		background-color: #fff;
	}
}

.user {
	margin: 0 auto;
	text-align: center;
	padding: 10px 0 10px 0;
}
</style>
