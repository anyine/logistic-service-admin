const Menu = [
	{
		key: '1',
		iconType: 'dashboard',
		link: '/frame/home',
		label: '首页'
	}, {
		key: '3',
		iconType: 'table',
		link: '',
		label: '就餐服务管理',
		children: [
			{
				key: '3_1',
				link: '/frame/dish/dishList',
				label: '菜单列表'
			}, {
				key: '3_2',
				link: '/frame/dish/addDish',
				label: '添加菜单'
			}, {
				key: '3_3',
				link: '/frame/dish/brandAdmin',
				label: '满意度调查管理'
			}, {
				key: '3_4',
				link: '/frame/dish/brandAdmin',
				label: '健康饮食信息管理'
			}
		]
	}, {
		key: '4',
		iconType: 'line-chart',
		link: '',
		label: '企业官网管理',
		children: [
			{
				key: '4_1',
				link: '/frame/order/orderList',
				label: '就餐一二楼官网管理'
			}, {
				key: '4_2',
				link: '/frame/order/orderList',
				label: '住宿一二三栋官网管理'
			}
		]
	}, {
		key: '5',
		iconType: 'credit-card',
		link: '',
		label: '宿舍公寓管理',
		children: [
			{
				key: '5_1',
				link: '/frame/news/caseList',
				label: '房源信息管理'
			}, {
				key: '5_2',
				link: '/frame/news/addCase',
				label: '满意度调查管理'
			}, {
				key: '5_3',
				link: '/frame/news/newsList',
				label: '健康生活信息管理'
			}
		]
	}, {
		key: '2',
		iconType: 'solution',
		link: '/frame/lost/',
		label: '失物招领'
	}, {
		key: '6',
		iconType: 'credit-card',
		link: '',
		label: '联系我们',
		children: [
			{
				key: '6_1',
				link: '/frame/news/caseList',
				label: '班车信息管理'
			}
		]
	}
];

export default Menu;