import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, message, Avatar } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getHealthListUrl = restUrl.ADDR + 'health/getHealthList';

class HealthLifeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listData_1: [],
            listData_2: [],
            listData_3: [],
            pagination_1: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            pagination_2: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            pagination_3: {
                pageSize: 10,
                current: 1,
                total: 0
            }
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        let param = {};
        ajax.getJSON(getHealthListUrl, param, data => {
            if(data.success){
                let backData = data.backData;
                let listData_1 = [];
                let listData_2 = [];
                let listData_3 = [];
                backData.map((item, index) => {
                    if(item.companyId === '3'){
                        listData_1.push(item);
                    }else if(item.companyId === '4'){
                        listData_2.push(item);
                    }else if(item.companyId === '5'){
                        listData_3.push(item);
                    }
                });
                this.setState({
                    listData_1,
                    listData_2,
                    listData_3,
                    pagination_1: {
                      total: listData_1.length
                    },
                    pagination_2: {
                        total: listData_2.length
                    },
                    pagination_3: {
                        total: listData_3.length
                    },
                });
            }
        });
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/dish/editDish/${id}`
    }

    render() {
        const { loading, listData_1, listData_2, listData_3, pagination_1, pagination_2, pagination_3 } = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>就餐服务管理</Breadcrumb.Item>
                        <Breadcrumb.Item>健康饮食信息管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>健康生活信息列表</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="学生公寓1号" key="1">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_1}
                                    dataSource={listData_1}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo" src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'} />}
                                        >
                                            <List.Item.Meta
                                                title={<a href={item.href}>{item.health_title}</a>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time}
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓2号" key="2">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_2}
                                    dataSource={listData_2}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo" src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'} />}
                                        >
                                            <List.Item.Meta
                                                title={<a href={item.href}>{item.health_title}</a>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time}
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="教师公寓" key="3">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_3}
                                    dataSource={listData_3}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo" src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'} />}
                                        >
                                            <List.Item.Meta
                                                title={<a href={item.href}>{item.health_title}</a>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time}
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        </Tabs>
                    </Spin>
                </div>
            </div>
        );
    }
}

HealthLifeList.contextTypes = {
    router: React.PropTypes.object
}

export default HealthLifeList;