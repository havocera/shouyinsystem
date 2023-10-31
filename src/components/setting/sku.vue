<template>
	<div>
		
			<el-row :gutter="20">
				<el-col :span="12">
		<el-card class="box-card" >
			<template #header>
				<div class="card-header">
					<span>添加商品属性</span>

				</div>
			</template>
			<div>
				<el-row :gutter="20">
					<el-col :span="8"><el-input v-model="data.attribute" placeholder="请输入商品属性名称" /></el-col>
					<el-col :span="4"> <el-button type="primary" @click="addattribute">添加属性</el-button></el-col>
				</el-row>
				


			</div>
		</el-card>
		</el-col>
		<el-col :span="12">
		<el-card >
			<template #header>
				<div class="card-header">
					<span>添加商品属性</span>

				</div>
			</template>
			<div>
				<el-tag v-for="(tag,index) in sourceAttributes" :key="tag.name" class="mx-1" @close="handleClose(index)" closable type="success">
					{{ tag.name }}
				</el-tag>
				 <el-button type="primary" @click="issku=true">设置属性值</el-button>
			</div>
		</el-card>
		</el-col>
		</el-row>
		<SkuForm v-if="issku" class="sku-form-demo" :source-attributes="sourceAttributes"  :skeleton="sourceSkeleton.sourceSkeleton"
			:inline-theme-disabled="true" @update:sku="handleUpdateSku"
			@update:selected-attribute="handleUpdateSelectedAttrs"></SkuForm>
			 <el-button type="primary" @click="tosave" >确定提交</el-button>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		toRaw
	} from 'vue'
	import service from "../../api/index.js"
	import SkuForm from '../SkuForm';
	 import { v4 } from 'uuid';
	 import {
	 	ElNotification,
	 	ElMessageBox,
	 	ElMessage
	 } from 'element-plus'
	 import { useRouter,useRoute } from 'vue-router'
	const data = reactive({
		attribute: "",
		attrList: [],
		attrs:[
		
		],
		sku:[
			
		],
		attrsKey:[],
		saveSku:[],

	})
	const route = useRoute()
	const router = useRouter()
	const goods_id = route.query.goods_id
	const sourceAttributes = ref([])
	const issku = ref(false)
	// {
	// 	name: '颜色',
	// 	id: '1',
	// 	disabled: false,
	// 	items: [{
	// 		name: '胭脂',
	// 		id: '1-1'
	// 	}, {
	// 		name: '朱青',
	// 		id: '1-2'
	// 	}, {
	// 		name: '远山黛',
	// 		id: '1-3'
	// 	}, {
	// 		name: '梅染',
	// 		id: '1-4'
	// 	}]
	// },
	const addattribute = () => {
		console.log(data.attribute)
		// const uuid = v4();
		data.attrsKey.push(data.attribute)
		data.attrList.push({
			name: data.attribute,
			disabled: false,
			id:v4(),
			items: [],
		})
		console.log(data.attrList)
		sourceAttributes.value=data.attrList
		data.attribute=""
		 
	}
const handleClose = (tag) => {
	console.log(tag)
  sourceAttributes.value.splice(tag, 1)
}

	const sourceSkeleton = reactive({
		sourceSkeleton: [{
				key: 'price',
				component: 'InputNumber',
				title: '商品价格',
				componentProps: {
					min: 0.01,
					showButton: false,
					placeholder: '请输入价格',
					precision: 2,
				},
				rules: [{
					required: true,
					message: '请输入商品价格',
					type: 'number',
					trigger: ['blur']
				}],
				titleRequireMark: true,
				titleHelpMessage: '价格须大于等于0.01元',
			},
			{
				key: 'inventory',
				component: 'InputNumber',
				title: '商品库存',
				componentProps: {
					placeholder: '请输入库存',
					min: 0,
					showButton: false,
					precision: 0,
				},
				rules: [{
					required: true,
					message: '请输入商品库存',
					type: 'number',
					trigger: ['blur']
				}],
				titleRequireMark: true,
				titleHelpMessage: '库存须大于等于0',
				defaultValue: 0,
			},

			// {
			// 	key: 'cover',
			// 	component: 'ImageUpload',
			// 	componentProps: {
			// 		action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
			// 		listType: 'image-card',
			// 		max: 1,
			// 	},
			// 	title: '商品图',
			// 	rules: [{
			// 		required: true,
			// 		message: '请上传商品图',
			// 		type: 'array'
			// 	}]
			// }
		]
	})
	
	const handleUpdateSku = (val) => {
	const sku =toRaw(val)
		console.log(sku)
		data.sku=sku
		console.log(data.sku)
	}
	const tosave=()=>{
		data.saveSku=[]
		const _arrts=toRaw(data.attrs)		
		data.sku.forEach((item,index)=>{
			let skuSelect = ""
		
			for(let i=0;i<_arrts.length;i++){
				let _key =_arrts[i].name
				
				if (i ===_arrts.length-1){
					
					skuSelect=skuSelect+item[_key]
				}else{
					skuSelect= skuSelect+item[_key]+";"
				}
				
			}
			data.saveSku.push({id:item["id"],sku:skuSelect,price:item["price"],stock:item["inventory"]})
			// addAttrsbute
			
			
		})
		service({
			url: "addAttrsbute",
			method: "post",
			data:{
				attrs:data.attrs,
				sku:data.saveSku,
				id:goods_id
			}
		}).then((res) => {
			
			ElMessage({
				type: 'success',
				message: 'ok',
			})
			router.push("/setting/goods")
		})
		console.log(data.saveSku,data.attrs)
	}
	const handleUpdateSelectedAttrs = (val) => {
		const attrs = toRaw(val)
		data.attrs = attrs
		console.log(attrs, 'select-attribute')
	}
</script>

<style lang="less">
</style>