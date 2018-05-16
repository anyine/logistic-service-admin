import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Menu, Breadcrumb, Dropdown, notification, Spin, Tabs, message, Table, Modal } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getLiveListUrl = restUrl.ADDR + 'health/getLiveList';
const delLiveUrl = restUrl.ADDR + 'health/delLive';

class LiveList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '动态标题',
            dataIndex: 'live_title',
            key: 'live_title',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        },{
            title: '描述',
            dataIndex: 'live_desc',
            key: 'live_desc',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}} /></a>,
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <Link to={this.editrouter(record.id)}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a onClick={() => this.onDelete(record.id)}>删除</a>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <a className="ant-dropdown-link">操作</a>
                </Dropdown>
            ),
        }];

        this.state = {
            loading: false,
            dataSource: []
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
            if(data.success){
                let backData = data.backData;
                backData.map(item => {
                    item.key = item.id;
                });
                this.setState({
                    dataSource: backData,
                    loading: false
                });
            }
        });
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/live/editLive/${id}`
    }

    onDelete = (key) => {
        Modal.confirm({
            title: '提示',
            content: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = key;
                ajax.postJSON(delLiveUrl, JSON.stringify(param), data => {
                    if(data.success){
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                        });
                        this.getList();
                        this.forceUpdate();
                    }else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        const { loading, dataSource } = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>训练段动态</Breadcrumb.Item>
                        <Breadcrumb.Item>动态列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>动态列表</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Table
                            bordered={true}
                            dataSource={dataSource}
                            columns={this.columns}
                        />
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