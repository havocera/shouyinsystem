<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
	<div style="height: 100%;">
		<el-container style="height: 100%;">
			<el-header class="h-header">
				
			<el-row class="row-bg" justify="space-between">
			    <el-col :span="6">黑石点餐收银系统</el-col>
			    <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
			    <el-col :span="6" style="text-align: right;"><el-button type="primary">刷新</el-button></el-col>
			  </el-row>
			</el-header>
			<el-container>
				<el-aside class="h-aside" width="200px">
					<div class="user">
						<el-avatar :size='60'
						        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
						      />
					</div>
					<el-menu default-active="/" text-color='#fff' active-text-color='#409EFF' background-color="#232e35" :router="true" class="el-menu-vertical-demo" @open="handleOpen"
						@close="handleClose">
						<el-menu-item index="/kaitai">
							<el-icon><Basketball /></el-icon>
							<span>台球开台</span>
						</el-menu-item>
						<el-menu-item index="/diancan">
							<el-icon><KnifeFork /></el-icon>
							<span>点餐</span>
						</el-menu-item>
						<el-menu-item index="/zhujiao">
							<el-icon><Avatar /></el-icon>
							<span>助教</span>
						</el-menu-item>
						<el-menu-item index="/zhangdan">
							<el-icon><List /></el-icon>
							<span>账单管理</span>
						</el-menu-item>
						<el-menu-item index="/vip">
							<el-icon><Promotion /></el-icon>
							<span>会员管理</span>
						</el-menu-item>
						<el-menu-item index="/setting/goods">
							<el-icon><Operation /></el-icon>
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
	</div>
</template>

<style lang="scss">
	#app {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		--color-ihavoc:#232e35;
		--bg-color:#232e35
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
		.is-active{
			background-color: #fff;
		}
		.is-active:hover{
			background-color: #fff;
		}
	}
	.user{
		margin: 0 auto;
		text-align: center;
		padding: 10px 0 10px 0;
	}
</style>
