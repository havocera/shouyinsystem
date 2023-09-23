<!--  -->
<!-- ihavoc -->
<!--  -->
<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span></span>
                    <el-button type="primary" @click="addvisible = true" class="button">添加新会员等级</el-button>
                </div>
            </template>
            <el-table :data="data.goodsList" border style="width: 100%" empty-text="暂无助教">
                <el-table-column prop="id" label="序号" width="180" />
                <el-table-column prop="level" label="会员等级" />
                <el-table-column prop="goodszhekou" label="商品折扣" />
                <el-table-column prop="qiutaizhekou" label="球台折扣" />
                <el-table-column prop="create_time" label="创建时间" />

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

            <el-pagination background layout="prev, pager, next" @update:current-page="next"
                :current-page="data.page" :total="data.row" />
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
                <el-alert type="info" show-icon :closable="false">
                    <p>
                        "会员等级" 请为该会员等级定义名称
                    </p>
                </el-alert>
                <el-form-item label="会员等级">
                    <el-input v-model="data.goodsform.level" />
                </el-form-item>
                <el-alert type="info" show-icon :closable="false">
                    <p>
                        "会员商品折扣" 例如8折请输入0.8 包括设置了可以折扣的商品，酒水等...
                    </p>
                </el-alert>
                <el-form-item label="会员商品折扣">
                    <el-input v-model="data.goodsform.goodszhekou" />
                </el-form-item>
                <el-alert type="info" show-icon :closable="false">
                    <p>
                        "会员台费折扣" 单独设置台费折扣
                    </p>
                </el-alert>
                <el-form-item label="会员台费折扣">
                    <el-input v-model="data.goodsform.qiutaizhekou" />

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitGoods">确定</el-button>
                    <el-button @click="addvisible = false">取消</el-button>
                </el-form-item>
            </el-form>

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
import { useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({
    goodsList: [],
    page: 1,
    pageSize: 10,
    row: 0,
    title: "添加会员等级",
    goods_class: [],
    goodsform: {}
})
const deleteDialog = ref(false)
const addvisible = ref(false)
onMounted(() => {
    getGoodsList()

})
function next(e){
	console.log(e)
	data.page=e
	getGoodsList()
}
const tosku = (index, row) => {
    router.push({ path: "/setting/sku", query: { goods_id: row.id } })
}
const kucun = (index, row) => {
    router.push({ path: "/setting/kucun", query: { goods_id: row.id } })
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
    data.title = "编辑会员等级"
    addvisible.value = true

}
function submitGoods() {
    service({
        url: "addVipClass",
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
        url: "getVipClass",
        method: "post",
        data: reqdata
    }).then((res) => {
        if (res.code) {
            data.goodsList = res.data.row;
            data.row = res.data.count;
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