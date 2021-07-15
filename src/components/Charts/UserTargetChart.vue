<template>
	<div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
import chartResize from './hooks/resize'
import { ref, onMounted, onBeforeMount, onBeforeUnmount, onActivated, onDeactivated } from 'vue'

export default {
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		id: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '300px'
		}
	},
	setup(props) {
		// data
		const chart = ref(null)

		// methods
		const initChart = () => {
			chart.value = echarts.init(document.getElementById(props.id))
			chart.value.setOption({
				backgroundColor: '#fff',
				title: {
					text: ''
				},
				tooltip: {},
				radar: {
					axisName: {
						textStyle: {
							color: '#666'
						}
					},
					indicator: [
						{ name: '引用', max: 100 },
						{ name: '口碑', max: 100 },
						{ name: '产量', max: 100 },
						{ name: '贡献', max: 100 },
						{ name: '热度', max: 100 }
					]
				},
				series: [
					{
						type: 'radar',
						data: [
							{
								name: '占比',
								value: [50, 75, 20, 55, 30],
								itemStyle: {
									color: '#188FFD'
								},
								lineStyle: {
									color: '#188FFD'
								}
							}
						]
					}
				]
			})
		}

		const { resizeHandler, initListener, destroyListener, resize } = chartResize(chart.value)

		// lifecycle
		onMounted(() => {
			initChart()
			initListener(chart.value)
		})

		onBeforeMount(() => {
			if (!chart.value) {
				return
			}
			chart.value.dispose()
			chart.value = null
		})

		onActivated(() => {
			if (!resizeHandler.value) {
				initListener(chart.value)
			}
			resize(chart.value)
		})

		onBeforeUnmount(() => {
			destroyListener()
		})

		onDeactivated(() => {
			destroyListener()
		})

		return {
			chart,
			initChart,
			resize,
			resizeHandler,
			initListener,
			destroyListener
		}
	}
}
</script>
