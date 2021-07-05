<template>
	<div>
		<Icon :icon="icon" />
	</div>
</template>

<script>
import { Icon } from './icon'
export default {
	components: {
		Icon
	},
	props: {
		icon: {
			type: String,
			default: ''
		}
	},
	setup() {
		return {}
	}
}
</script>
