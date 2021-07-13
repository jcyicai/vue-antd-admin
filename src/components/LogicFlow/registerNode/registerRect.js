export default function registerUser(lf) {
	lf.register('rect', ({ RectNode, RectNodeModel, h }) => {
		class View extends RectNode {}
		class Model extends RectNodeModel {
			setAttributes() {
				this.width = 80
				this.height = 40
				// 设置自定义锚点
				this.anchorsOffset = [
					[80 / 2, 0],
					[-80 / 2, 0]
				]

				/* const circleOnlyAsTarget = {
					message: '',
					validate: (source, target) => {
						const targetData = lf.getNodeData(target.id)
						const edgeData = lf.getGraphData().edges || []
						let curSourceId = null
						const targetIds = []
						for (let i = 0; i < edgeData.length; i++) {
							if (edgeData[i].targetNodeId === source.id) {
								curSourceId = edgeData[i].sourceNodeId
								break
							}
						}

						edgeData.forEach((item) => {
							if (curSourceId && item.sourceNodeId === curSourceId) {
								targetIds.push(item.targetNodeId)
							}
						})

						if (targetData.text.value === '开始') {
							circleOnlyAsTarget.message = '开始节点不能作为连线的终点'
							return false
						} else if (curSourceId && curSourceId === target.id) {
							circleOnlyAsTarget.message = '无法连接'
							return false
						} else if (targetIds.includes(target.id)) {
							circleOnlyAsTarget.message = '相邻节点无法连接'
							return false
						} else {
							return true
						}
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
