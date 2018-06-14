import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, message, Button} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getHealthListUrl = restUrl.ADDR + 'health/getHealthList';
const delHealthUrl = restUrl.ADDR + 'health/delHealth';

class HealthLifeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listData_1: [],
            listData_2: [],
            listData_3: [],
            listData_4: [],
            listData_5: [],
            listData_6: [],
            listData_7: [],
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
            },
            pagination_4: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            pagination_5: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            pagination_6: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            pagination_7: {
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
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(getHealthListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                let listData_1 = [];
                let listData_2 = [];
                let listData_3 = [];
                let listData_4 = [];
                let listData_5 = [];
                let listData_6 = [];
                let listData_7 = [];
                backData.map((item, index) => {
                    if (item.companyId === '3') {
                        listData_1.push(item);
                    } else if (item.companyId === '4') {
                        listData_2.push(item);
                    } else if (item.companyId === '5') {
                        listData_3.push(item);
                    } else if (item.companyId === '6') {
                        listData_2.push(item);
                    } else if (item.companyId === '7') {
                        listData_3.push(item);
                    } else if (item.companyId === '8') {
                        listData_2.push(item);
                    } else if (item.companyId === '9') {
                        listData_3.push(item);
                    }
                });
                this.setState({
                    listData_1,
                    listData_2,
                    listData_3,
                    listData_4,
                    listData_5,
                    listData_6,
                    listData_7,
                    pagination_1: {
                        total: listData_1.length
                    },
                    pagination_2: {
                        total: listData_2.length
                    },
                    pagination_3: {
                        total: listData_3.length
                    },
                    pagination_4: {
                        total: listData_4.length
                    },
                    pagination_5: {
                        total: listData_5.length
                    },
                    pagination_6: {
                        total: listData_6.length
                    },
                    pagination_7: {
                        total: listData_7.length
                    },
                    loading: false
                });
            }
        });
    }

    delHealth = id => {
        this.setState({
            loading: true
        });
        let param = {};
        param.id = id;
        ajax.postJSON(delHealthUrl, JSON.stringify(param), data => {
            if (data.success) {
                this.setState({
                    loading: false
                }, () => {
                    this.getList();
                });

            } else {

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
        const {
            loading,
            listData_1,
            listData_2,
            listData_3,
            listData_4,
            listData_5,
            listData_6,
            listData_7,
            pagination_1,
            pagination_2,
            pagination_3,
            pagination_4,
            pagination_5,
            pagination_6,
            pagination_7
        } = this.state;

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
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
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
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
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
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓3号" key="4">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_4}
                                    dataSource={listData_4}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓4号" key="5">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_5}
                                    dataSource={listData_5}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓5号" key="6">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_6}
                                    dataSource={listData_6}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓6号" key="7">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={pagination_7}
                                    dataSource={listData_7}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            extra={<img style={{width: 180, height: 120}} alt="logo"
                                                        src={restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'}/>}
                                        >
                                            <List.Item.Meta
                                                title={<Link
                                                    to={'/frame/residence/editHealth/' + item.id}>{item.health_title}</Link>}
                                                description={item.health_desc}
                                            />
                                            {item.create_time} <Button
                                            onClick={this.delHealth.bind(null, item.id)}>删除</Button>
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