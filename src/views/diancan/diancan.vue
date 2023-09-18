<template>
	<div class="diancan">
		<div class="shop">

			<el-menu :default-active="data.index" style="width: 100%;" class="el-menu-demo" mode="horizontal"
				@select="handleSelect">
				<el-menu-item index="0">咖啡&茶</el-menu-item>
				<el-menu-item index="1">鲜榨</el-menu-item>
				<el-menu-item index="2">饮料</el-menu-item>
				<el-menu-item index="3">餐食</el-menu-item>
				<el-menu-item index="4">烟酒</el-menu-item>
				<el-menu-item index="5">球具</el-menu-item>
			</el-menu>
			<el-scrollbar height="80vh">
				<transition name="el-zoom-in-top" v-for="(child,cindex ) in data.goodsList" :key="cindex">
					<el-row v-show="data.index==cindex" :gutter="5">

						<el-col :span="4" v-if="child.length" v-for="(item, index) in child" :key="index">
							<el-card :body-style="{ padding: '0px' }">
								<img v-if="item.product_img" :src="item.product_img" class="image">
								<img v-else src="../../assets/images/yinliao.png" class="image">
								<div style="padding: 14px;">
									<span>{{item.product_name}}</span>
									<div class="bottom clearfix">

										<el-button type="text" class="button" @click="buysku(item)">购买</el-button>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-empty style="margin: 0 auto;" v-else description="暂无商品" />

					</el-row>
				</transition>
			</el-scrollbar>


		</div>
		<div class="cart">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">

						<span> <el-icon>
								<ShoppingCartFull />
							</el-icon> 购物车</span>
						<!-- <el-button class="button" text>Operation button</el-button> -->
					</div>
				</template>
				<div>
					<div class="goods">
						<div v-if="data.select_sku.length">
							<div v-for="(sku_item, sku_index) in data.select_sku" :key="sku_index">
								
							
							<div style="display: flex;">
								
								<div style="justify-content: start;flex: 4;" >{{sku_item.goods.product_name}}</div>
								<div style="justify-content: end;flex: 1;" >￥：{{sku_item.price}}</div>
							</div>
							<div style="display: flex;width: 100%;">
								<div style="justify-content: start;flex: 4;" >{{sku_item.sku.sku}}</div>
								<div style="justify-content: end;flex: 1;" >数量：X{{sku_item.num}}</div>
								<div @click="delcart(sku_item)" style="color: red;cursor: pointer; " >删除</div>
								<!-- <el-row>
									<el-col :span="6">{{sku_item.sku.sku}}</el-col>
									<el-col :span="6">{{sku_item.num}}</el-col>
								</el-row> -->
							</div>
							<el-divider border-style="dashed" />
							</div>
						</div>
						<el-empty v-else description="您还没选择商品!" />
					</div>

					<div class="heji">
						<div class="jine">
							总计金额：{{data.count_price}}
						</div>
						<div class="xiadan" @click="toxiadan">下单</div>
					</div>
				</div>

			</el-card>
		</div>
		<!-- 选择商品规格弹窗 -->
		<el-drawer v-model="skuvisible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<h4 :id="titleId" :class="titleClass">请选择商品规格</h4>
				<el-button type="danger" @click="skuvisible=false">
					<el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon>
					Close
				</el-button>
			</template>
			<el-row type="flex" class="sku-info" justify="center">
				<el-col v-for="(attr, index) in data.process_attribute" :key="index">
					<div style="margin-bottom: 10px;">
						<h3>{{ attr.name }}</h3>
					</div>
					
					
					<el-button-group>
						<el-button v-for="(item, index2) in attr.item" style="width: 5rem;height: 3rem;" :key="index2"
							:type="item.actived ? 'danger' : ''" :disabled="item.disabled"
							@click="skuClick(index, index2)" round>{{ item.name }}</el-button>
					</el-button-group>
					 
				</el-col>
				
			</el-row>
			<div style="margin-top: 2rem;">
				<el-input-number style="width: 10rem;height: 3rem;" v-model="data.num" :min="1" :max="data.stock" @change="handleChange" />
			</div>
			
			<el-button type="success" size="large" style="margin-top: 3rem;text-align: right; width: 50%;margin-left: 20%;height: 3.75rem;" @click="submit">
				<el-icon class="el-icon--left">
					<CircleCloseFilled />
				</el-icon>
				确定
			</el-button>
		</el-drawer>
		<!-- 预约桌号 -->
		<el-dialog v-model="xiadanqiutaidialog" title="请选择助教服务的球台号" width="30%" :before-close="handleClose">
			<el-radio-group v-model="data.current_qiutai">
				<el-radio :label="item.id" v-for="item in data.qiutai" size="large" border>{{item.number}}</el-radio>
		
			</el-radio-group>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="xiadanqiutaidialog = false">取消</el-button>
					<el-button type="primary" @click="xiadanFunction()">
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
	import BScroll from 'better-scroll'
	console.log("卡死")
	const base = ref(false);
	import {
		ElNotification,
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import service from "../../api/index.js"
	const skuvisible = ref(false)
	const xiadanqiutaidialog=ref(false)
	const data = reactive({
			attribute: [],
			process_attribute: [],
			process_sku: [],
			goodsList: [],
			index: 1,
			qiutai:[],
			sku: [],
			process_attribute: [],
			process_sku: [],
			stock: '',
			minprice: '',
			maxprice: '',
			separator: ';',
			num:0,
			select_sku:[],
			current_goods:{},
			count_price:0,
			current_qiutai:"",
		}),
		handleSelect = (e) => {
			console.log(e)
			data.index = e
		};
	// 切换规格类目

	const init = () => {
		// 对 attribute 数据进行加工，并存入 process_attribute 中
		data.attribute.map(attr => {
			let temp = {
				name: attr.name
			}
			temp.item = attr.item.map(item => {
				return {
					name: item,
					actived: false,
					disabled: false
				}
			})
			data.process_attribute.push(temp)
		})
		// 对 sku 数据进行加工，并存入 process_sku 中
		data.sku.map(v => {
			var combArr = arrayCombine(v.sku.split(data.separator))
			for (var j = 0; j < combArr.length; j++) {
				var key = combArr[j].join(data.separator)
				if (data.process_sku[key]) {
					// 库存累加，价格添加进数组
					data.process_sku[key].stock += v.stock
					data.process_sku[key].prices.push(v.price)
				} else {
					data.process_sku[key] = {
						stock: v.stock,
						prices: [v.price]
					}
				}
			}
		})
		// 更新数据视图
		data.process_sku = Object.assign({}, data.process_sku)
		skuCheck()
	}
	const arrayCombine = (targetArr) => {
		var resultArr = []
		for (var n = 0; n <= targetArr.length; n++) {
			var flagArrs = getFlagArrs(targetArr.length, n)
			while (flagArrs.length) {
				var flagArr = flagArrs.shift()
				var combArr = Array(targetArr.length)
				for (var i = 0; i < targetArr.length; i++) {
					if (flagArr[i]) {
						combArr[i] = targetArr[i]
					}
				}
				resultArr.push(combArr)
			}
		}
		return resultArr
	}
	const getFlagArrs = (m, n) => {
		var flagArrs = [],
			flagArr = [],
			isEnd = false
		for (var i = 0; i < m; i++) {
			flagArr[i] = i < n ? 1 : 0
		}
		flagArrs.push(flagArr.concat())
		// 当n不等于0并且m大于n的时候进入
		if (n && m > n) {
			while (!isEnd) {
				var leftCnt = 0
				for (var i = 0; i < m - 1; i++) {
					if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
						for (var j = 0; j < i; j++) {
							flagArr[j] = j < leftCnt ? 1 : 0
						}
						flagArr[i] = 0
						flagArr[i + 1] = 1
						var aTmp = flagArr.concat()
						flagArrs.push(aTmp)
						if (aTmp.slice(-n).join('').indexOf('0') == -1) {
							isEnd = true
						}
						break
					}
					flagArr[i] == 1 && leftCnt++
				}
			}
		}
		return flagArrs
	}
	const skuClick = (key1, key2) => {
		if (!data.process_attribute[key1].item[key2].disabled) {
			data.process_attribute[key1].item.map((item, index) => {
				item.actived = index == key2 ? !item.actived : false
			})
			skuCheck()
			getStockPrice()
		}
	}
	const skuCheck = () => {
		let sku = []
		data.process_attribute.map(attr => {
			let name = ''
			attr.item.map(item => {
				if (item.actived) {
					name = item.name
				}
			})
			sku.push(name)
		})
		data.stock = data.process_sku[sku.join(data.separator)].stock
		data.minprice = Math.min.apply(Math, data.process_sku[sku.join(data.separator)].prices)
		data.maxprice = Math.max.apply(Math, data.process_sku[sku.join(data.separator)].prices)
	}
	const getStockPrice = () => {
		data.process_attribute.map(attr => {
			attr.item.map(item => {
				item.disabled = false
			})
		})
		let count = 0
		let i = 0
		data.process_attribute.map((attr, index) => {
			let flag = false
			attr.item.map(item => {
				if (item.actived) {
					flag = true
				}
			})
			if (!flag) {
				count += 1
				i = index
			}
		})
		// 当只有一组规格没选时
		if (count == 1) {
			data.process_attribute[i].item.map(item => {
				let sku = []
				let text = item.name
				data.process_attribute.map((attr, index) => {
					if (index != i) {
						attr.item.map(item2 => {
							if (item2.actived) {
								sku.push(item2.name)
							}
						})
					} else {
						sku.push(text)
					}
				})
				if (data.process_sku[sku.join(data.separator)].stock == 0) {
					item.disabled = true
				}
			})
		}
		// 当所有规格都有选时
		if (count == 0) {
			data.process_attribute.map((attr, index) => {
				let i = index
				data.process_attribute[index].item.map(item => {
					if (!item.actived) {
						let sku = []
						let text = item.name
						data.process_attribute.map((list, index) => {
							if (index != i) {
								list.item.map(item2 => {
									if (item2.actived) {
										sku.push(item2.name)
									}
								})
							} else {
								sku.push(text)
							}
						})
						if (data.process_sku[sku.join(data.separator)].stock ==
							0) {
							item.disabled = true
						}
					}
				})
			})
		}
	}
	// 底部操作按钮触发
	const clickBtnOperate = (op) => {
		console.log('点击了操作按钮', op);
	};
	const delcart=(row)=>{
		let index = data.select_sku.findIndex(item=>{
			if(item.sku.name=row.sku.name){
				return true
			}
		})
		data.count_price=data.count_price-row.price
		data.select_sku.splice(index,1)
	}
	// 关闭商品规格弹框
	const close = () => {};
	onMounted(() => {
		getDiancan()
	});
	const getDiancan = () => {
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
			url: "getdiancan",
			method: "post",

		}).then((res) => {
			if (res.code) {
				data.goodsList = res.data;


			} else {
				ElNotification({
					title: '错误',
					message: res.message,
					type: 'error',
				})
			}
		})
	}
	const buysku = (item) => {
		data.current_goods=item
		service({
			url: "getSkudiancan",
			method: "post",
			data:item,
		}).then((res) => {
			if (res.code) {
				data.sku = res.data.sku;
				data.attribute = res.data.attribute
				data.process_attribute=[]
				data.process_sku= []
				data.stock= ''
				init()
				console.log(data.process_attribute)
				skuvisible.value=true

			} else {
				ElNotification({
					title: '错误',
					message: res.message,
					type: 'error',
				})
			}
		})
	}
	const submit = () => {
		let sku = []
		let isSelectSKU = data.process_attribute.every(attr => {
			let filter = attr.item.filter(v => v.actived)
			if (filter.length != 0) {
				sku.push(filter[0].name)
			}
			return filter.length != 0
		})
		if (isSelectSKU) {
			let sku_detail={}
			data.sku.forEach((item)=>{
				
				if(item.sku==sku.join(data.separator)){
					sku_detail=item
				}
			})
			data.count_price = data.count_price+sku_detail.price*data.num
			data.select_sku.push({
				goods:data.current_goods,
				sku:sku_detail,
				num:data.num,
				price:sku_detail.price*data.num
			})
			console.log(data.select_sku)
			skuvisible.value=false
			ElNotification({
				title: '加入购物车',
				message: `当前选择的为：${data.current_goods.product_name}${sku.join(data.separator)}`,
				type: 'success',
			})

		} else {
			ElNotification({
				title: '错误',
				message: res.message,
				type: 'error',
			})

		}
	}
	function toxiadan(){
		xiadanqiutaidialog.value=true
	}
	function xiadanFunction(){
		service({
			url: "addFoodzhangdan",
			method: "post",
			data:{
				qiutai_id:data.current_qiutai,
				zhangdan:data.select_sku
			}
		}).then((res) => {
			if (res.code) {
				data.select_sku=[]
				data.current_qiutai=""
				data.count_price=0
				data.num=0
				xiadanqiutaidialog.value=false
				ElNotification({
					title: '成功',
					message: "下单成功",
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
	function onChange(e) {
		console.log(e.catId)
	}
</script>

<style lang="less" scoped>
	.diancan-main {}

	.diancan {
		display: flex;
		// justify-content: space-between;
		overflow: hidden;

	}



	.shop {
		flex: 4;
		justify-content: flex-start;

		.bottom {
			margin-top: 13px;
			line-height: 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.button {
			padding: 0;
			min-height: auto;
		}

		.image {
			width: 100%;
			display: block;
			width: 12rem;
			height: 18.4375rem;
		}

		.el-card {
			width: 12rem;
			// width: 90%;
		}
	}

	.cart {
		flex: 1;
		justify-content: flex-end;
		min-width: 30rem;
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
			min-height: 85vh;
		}

		.goods {
			overflow: auto;
			max-height: calc(85vh - 44px);
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
</style>