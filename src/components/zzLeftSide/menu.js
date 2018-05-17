const Menu = [
	{
	// 	key: '1',
	// 	iconType: 'dashboard',
	// 	link: '/frame/home',
	// 	label: '首页'
	// }, {
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
				link: '/frame/dish/survey',
				label: '满意度调查管理'
			}, {
				key: '3_4',
				link: '/frame/dish/healthFood',
				label: '健康饮食信息管理'
			}, {
                key: '3_5',
                link: '/frame/dish/AddHealthFood',
                label: '新增健康饮食信息'
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
				link: '/frame/company/website',
				label: '就餐一二楼官网管理'
			}, {
				key: '4_2',
				link: '/frame/company/webSiteResident',
				label: '住宿一二三栋官网管理'
			}, {
				key: '4_3',
				link: '/frame/company/addServiceAndHoliday',
				label: '新增服务和节日信息'
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
				link: '/frame/residence/propertyInformation',
				label: '房源信息管理'
			}, {
				key: '5_2',
				link: '/frame/residence/survey',
				label: '满意度调查管理'
			}, {
				key: '5_3',
				link: '/frame/residence/healthLife',
				label: '健康生活信息管理'
			}, {
                key: '5_4',
                link: '/frame/residence/addHealthLife',
                label: '新增健康生活信息'
            }
		]
	}, {
		key: '2',
		iconType: 'solution',
		link: '',
		label: '失物招领',
		children: [
            {
                key: '2_1',
                link: '/frame/lost/',
                label: '失物招领列表'
            }
        ]
	}, {
        key: '7',
        iconType: 'rocket',
        link: '',
        label: '训练段动态',
        children: [
            {
                key: '7_1',
                link: '/frame/live/liveList',
                label: '动态列表'
            },
            {
                key: '7_2',
                link: '/frame/live/addLive',
                label: '新增动态'
            }
        ]
	}, {
		key: '6',
		iconType: 'credit-card',
		link: '',
		label: '联系我们',
		children: [
			{
				key: '6_1',
				link: '/frame/bus',
				label: '班车信息管理'
			}
		]
	}
];

export default Menu;