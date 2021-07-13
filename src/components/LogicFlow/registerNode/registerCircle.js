export default function registerStart(lf) {
	lf.register('circle', ({ CircleNode, CircleNodeModel, h }) => {
		class View extends CircleNode {}
		class Model extends CircleNodeModel {
			setAttributes() {
				const size = 20
				this.r = size
				// 设置自定义锚点
				this.anchorsOffset = [
					[size, 0],
					[-size, 0]
				]

				/* const circleOnlyAsTarget = {
					message: '结束节点不能作为连线的起点',
					validate: (source, target) => {
						const sourceData = lf.getNodeData(source.id)
						return sourceData.text.value !== '结束'
					}
				}

				this.sourceRules.push(circleOnlyAsTarget) */
			}
		}
		return {
			view: View,
			model: Model
		}
	})
}
