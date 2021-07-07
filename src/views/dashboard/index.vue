<template>
	<div class="dashboard-container">
		<div class="home-header">
			<div class="header-left">
				<div class="header-avatar">
					<a-avatar :size="70" :src="avatarUrl">
						<template #icon><UserOutlined /></template>
					</a-avatar>
				</div>
				<div class="header-content">
					<div class="content-title"> {{ timeToFix }}，Jason Chen </div>
					<div class="content-info">综合管理部 | 前端开发工程师</div>
				</div>
			</div>
			<div class="header-right">
				<div class="stat-item">
					<a-statistic title="待办任务" :value="999" />
				</div>
				<div class="stat-item">
					<a-statistic title="已办任务" :value="999" />
				</div>
				<div class="stat-item">
					<a-statistic title="已发任务" :value="999" />
				</div>
			</div>
		</div>

		<a-row :gutter="20" class="home-main">
			<a-col :span="16" class="home-left">
				<a-card class="project-box" title="进行中的项目" :loading="projectLoading">
					<template #extra>
						<a href="#">更多</a>
					</template>
					<a-card-grid class="project-item" v-for="(item, index) in projectData" :key="index">
						<a-card :bordered="false">
							<a-card-meta :title="item.title">
								<template #description>{{ item.content }}</template>
							</a-card-meta>
							<div class="card-footer">
								<div>{{ item.userName }}</div>
								<div>{{ item.date }}</div>
							</div>
						</a-card>
					</a-card-grid>
				</a-card>
				<a-card class="pending-box" title="待办任务" :loading="pendingLoading">
					<template #extra>
						<a href="#">更多</a>
					</template>
					<a-list item-layout="horizontal" :data-source="pendingData">
						<template #renderItem="{ item }">
							<a-list-item>
								<a-list-item-meta :description="item.content">
									<template #title>
										<a href="#">{{ item.title }}</a>
									</template>
									<template #avatar>
										<a-avatar
											src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
										/>
									</template>
								</a-list-item-meta>
							</a-list-item>
						</template>
					</a-list>
				</a-card>
			</a-col>
			<a-col :span="8" class="home-right">
				<a-card class="chart-box" title="活动指数">
					<div>
						<Chart />
					</div>
				</a-card>
				<a-card class="black-box" title="黑名单">
					<div>
						<ul>
							<li>上海虎扑体育有限公司</li>
							<li>北京百度科技有限公司</li>
							<li>深圳腾讯科技有限公司</li>
						</ul>
					</div>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import { timeFix } from '@/utils'
import Chart from '@/components/Charts/UserTargetChart'
import { UserOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
export default {
	name: '',
	components: { Chart, UserOutlined },
	setup() {
		const timeFormat = timeFix()
		const timeToFix = ref(timeFormat)
		const avatarUrl = ref(require('@/assets/images/user.png'))
		const projectLoading = ref(false)
		const pendingLoading = ref(false)
		const projectData = reactive([
			{ title: '阿里', content: 'this is a test', userName: 'Jason Chen', date: '2021-07-07' },
			{ title: '百度', content: 'this is a test', userName: 'Jason Chen', date: '2021-07-07' },
			{ title: '腾讯', content: 'this is a test', userName: 'Jason Chen', date: '2021-07-07' },
			{ title: '携程', content: 'this is a test', userName: 'Jason Chen', date: '2021-07-07' },
			{ title: '美团', content: 'this is a test', userName: 'Jason Chen', date: '2021-07-07' },
			{ title: '饿了么', content: 'this is a test', userName: 'Jason Chen', date: '2021-07-07' }
		])
		const pendingData = reactive([
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' },
			{ title: '项目申请', content: 'this is a test' }
		])
		return {
			timeToFix,
			avatarUrl,
			projectLoading,
			pendingLoading,
			projectData,
			pendingData
		}
	}
}
</script>

<style lang="less" scoped>
.dashboard-container {
	.home-header {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 24px 24px 16px;
		.header-left {
			display: flex;
			.header-avatar {
				.el-avatar {
					width: 72px;
					height: 72px;
				}
			}
			.header-content {
				margin-left: 24px;
				.content-title {
					padding: 8px 0 12px;
					color: rgba(0, 0, 0, 0.85);
					font-weight: 500;
					font-size: 20px;
					line-height: 28px;
				}
				.content-info {
					color: rgba(0, 0, 0, 0.45);
					font-size: 14px;
				}
			}
		}
		.header-right {
			display: flex;
			.stat-item {
				padding: 0 40px;
				position: relative;
				.stat-title {
					margin-bottom: 4px;
					color: rgba(0, 0, 0, 0.45);
					font-size: 14px;
				}
				.stat-num {
					color: rgba(0, 0, 0, 0.85);
					font-size: 24px;
					line-height: 1.5;
					text-align: right;
					font-variant: tabular-nums;
					font-feature-settings: 'tnum';
				}
				&:after {
					position: absolute;
					top: 12px;
					right: 0;
					width: 1px;
					height: 40px;
					background-color: #e8e8e8;
					content: '';
				}
				&:last-child:after {
					width: 0;
				}
			}
		}
	}

	.home-main {
		display: flex;
		padding: 20px;
		.home-left {
			.project-box {
				.project-item {
					cursor: pointer;
					.card-footer {
						display: flex;
						justify-content: space-between;
						color: rgba(0, 0, 0, 0.45);
						margin-top: 8px;
					}
				}
			}

			.pending-box {
				margin-top: 14px;
			}
		}
		.home-right {
			.chart-box {
				margin-bottom: 20px;
			}
			.black-box {
				ul {
					padding: 0 14px;
					li {
						color: rgba(0, 0, 0, 0.65);
						font-size: 14px;
						padding: 12px 0;
					}
				}
			}
		}
	}
}
</style>
