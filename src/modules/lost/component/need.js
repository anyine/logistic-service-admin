import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Icon,
    Menu,
    Breadcrumb,
    Spin,
    Tabs,
    Table
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const TabPane = Tabs.TabPane;
const getLiveListUrl = restUrl.ADDR + 'Survey/getNeedList';

class LiveList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '电话号码',
            dataIndex: 'telephone',
            key: 'telephone'
        }, {
            title: '建议内容',
            dataIndex: 'suggestion',
            key: 'suggestion',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }];

        this.state = {
            loading: false,
            dataSource_1: [],
            dataSource_2: [],
            dataSource_3: [],
            dataSource_4: [],
            dataSource_5: [],
            dataSource_6: [],
            dataSource_7: [],
            dataSource_8: [],
            dataSource_9: []
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
        ajax.getJSON(getLiveListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                let dataSource_1 = [],
                    dataSource_2 = [],
                    dataSource_3 = [],
                    dataSource_4 = [],
                    dataSource_5 = [],
                    dataSource_6 = [],
                    dataSource_7 = [],
                    dataSource_8 = [],
                    dataSource_9 = [];
                backData.map(item => {
                    item.key = item.id;
                    if (item.companyId === '1') dataSource_1.push(item);
                    else if (item.companyId === '2') dataSource_2.push(item);
                    else if (item.companyId === '3') dataSource_3.push(item);
                    else if (item.companyId === '4') dataSource_4.push(item);
                    else if (item.companyId === '5') dataSource_5.push(item);
                    else if (item.companyId === '6') dataSource_6.push(item);
                    else if (item.companyId === '7') dataSource_7.push(item);
                    else if (item.companyId === '8') dataSource_8.push(item);
                    else if (item.companyId === '9') dataSource_9.push(item);
                });
                this.setState({
                    dataSource_1,
                    dataSource_2,
                    dataSource_3,
                    dataSource_4,
                    dataSource_5,
                    dataSource_6,
                    dataSource_7,
                    dataSource_8,
                    dataSource_9,
                    loading: false
                });
            }
        });
    }

    render() {
        const {
            loading,
            dataSource_1,
            dataSource_2,
            dataSource_3,
            dataSource_4,
            dataSource_5,
            dataSource_6,
            dataSource_7,
            dataSource_8,
            dataSource_9,
        } = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>便民信息</Breadcrumb.Item>
                        <Breadcrumb.Item>提出你的需求</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>提出你的需求</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="一楼食堂" key="1">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_1}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="二楼食堂" key="2">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_2}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓1号" key="3">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_3}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓2号" key="4">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_4}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="教师公寓" key="5">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_5}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓3号" key="6">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_6}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓4号" key="7">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_7}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓5号" key="8">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_8}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="学生公寓6号" key="9">
                                <Table
                                    bordered={true}
                                    dataSource={dataSource_9}
                                    columns={this.columns}
                                />
                            </TabPane>
                        </Tabs>
                    </Spin>
                </div>
            </div>
        );
    }
}

LiveList.contextTypes = {
    router: React.PropTypes.object
}

export default LiveList;