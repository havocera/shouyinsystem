<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
    <div>
        <el-card class="box-card " style="width: 50%;margin: 0 auto;">
            <template #header>
                <div class="card-header">
                    <h3>基础设置</h3>
                    
                    <el-button type="primary" @click="submit">确认提交修改</el-button>
                </div>
            </template>
            <div>
                <el-alert title="假如您不想修改，直接点击去别的页面即可，无需提交确认" type="success" :closable="false" />
                <el-form :model="data.form" label-width="120px">
                    <el-form-item label="活动文字">
                        <el-input v-model="data.form.huodong" />
                    </el-form-item>
                    <el-form-item label="WiFi名称">
                        <el-input v-model="data.form.wifi" />
                    </el-form-item>
                    <el-form-item label="WiFi密码">
                        <el-input v-model="data.form.password" />
                    </el-form-item>
                    <el-form-item label="二维码1">
                        <!-- <el-input v-model="data.form.qrcode1" /> -->
                        <el-upload class="avatar-uploader" :action="`${baseUrl}index/uploadImage`" :show-file-list="false"
                            :on-success="handleAvatarSuccessqrcode1">
                            <img v-if="data.form.qrcode1" :src="data.form.qrcode1" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="二维码2">
                        <!-- <el-input v-model="data.form.qrcode2" /> -->
                        <el-upload class="avatar-uploader" :action="`${baseUrl}index/uploadImage`" :show-file-list="false"
                            :on-success="handleAvatarSuccessqrcode2">
                            <img v-if="data.form.qrcode2" :src="data.form.qrcode2" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="二维码3">
                        <!-- <el-input v-model="data.form.qrcode3" /> -->
                        <el-upload class="avatar-uploader" :action="`${baseUrl}index/uploadImage`" :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="data.form.qrcode3" :src="data.form.qrcode3" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>


    </div>
</template>

<script setup>
import service from "../../api/index.js"
import baseUrl from "../../api/config.js"
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
const data = reactive({
    form: {}
})
onMounted(()=>{
    getdata()
})
const handleAvatarSuccess= (
	  response,
	  uploadFile
	) => {
		data.form.qrcode3=baseUrl+response.data
	}
    const handleAvatarSuccessqrcode2= (
	  response,
	  uploadFile
	) => {
		data.form.qrcode2=baseUrl+response.data
	}
    const handleAvatarSuccessqrcode1= (
	  response,
	  uploadFile
	) => {
		data.form.qrcode1=baseUrl+response.data
	}
    const submit=()=>{
        service({url:'setting',method:"post",data:data.form}).then((res)=>{
            ElNotification({
					title: '成功',
					message: res.message,
					type: 'success',
				})
        })
    }
    const getdata=()=>{
        service({url:'getsetting',method:"post"}).then((res)=>{
                data.form=res.data
        })
    }
</script>

<style lang="less">
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