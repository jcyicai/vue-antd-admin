<template>
	<div class="jc-user-set">
		<div class="wrapper">
			<div class="jc-set-menu">
				<a-menu
					v-model:selectedKeys="selectedKeys"
					style="width: 220px"
					mode="inline"
					@click="handleClick"
				>
					<a-menu-item key="1">
						基本设置
					</a-menu-item>
					<a-menu-item key="2">
						安全设置
					</a-menu-item>
				</a-menu>
			</div>
			<div class="jc-set-content">
				<component :is="curMenuComponent"></component>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
import { BasicSet, SafeSet } from './components'

export default {
	name: 'UserSet',
	components: { BasicSet, SafeSet },
	setup() {
		// data
		const selectedKeys = ref(['1'])

		const curMenuComponent = computed(() => {
			return selectedKeys.value.indexOf('1') > -1 ? 'BasicSet' : 'SafeSet'
		})

		// methods
		const handleClick = (e) => {}

		return {
			selectedKeys,
			curMenuComponent,
			handleClick
		}
	}
}
</script>

<style lang="less" scoped>
.jc-user-set {
	padding: 20px;
	.wrapper {
		background: #fff;
		padding: 20px 0;
		display: flex;
		overflow-x: hidden;
		.jc-set-menu {
			.ant-menu {
				height: 100%;
			}
		}
		.jc-set-content {
			flex: 1 1;
			padding: 8px 40px;
		}
	}
}
</style>
