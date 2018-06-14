import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Table, Breadcrumb, notification, Spin, Menu, message, Dropdown} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';
import {Modal} from "antd/lib/index";

const getGymListUrl = restUrl.ADDR + 'survey/getGymList';
const delBallUrl = restUrl.ADDR + 'survey/delBall';

class HealthLifeList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '运动名称',
            width: 130,
            dataIndex: 'ball_type',
            key: 'ball_type',
            render: (text, record, index) => {
                let name;
                if(record.ball_type === '1'){
                    name = '羽毛球馆';
                }else if(record.ball_type === '2'){
                    name = '足球场';
                }else if(record.ball_type === '3'){
                    name = '篮球馆';
                }else if(record.ball_type === '4'){
                    name = '台球室';
                }else if(record.ball_type === '5'){
                    name = '乒乓球馆';
                }else if(record.ball_type === '6'){
                    name = '健身馆';
                }else if(record.ball_type === '7'){
                    name = '瑜伽馆';
                }
                return (
                <Link to={this.editrouter(record.id)}>{name}</Link>
            )}
        }, {
            title: '创建日期',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (text, record, index) => (
                text.substring(0, 10)
            )
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
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
            dataSource: [],
            loading: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        const {dataSource} = this.state;
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(getGymListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                backData.map((item, index) => {
                    item.key = index;
                    dataSource.push(item);
                });
                this.setState({
                    dataSource,
                    loading: false
                });
            }
        });
    }

    editrouter = (id) => {
        return `/frame/residence/editBall/${id}`
    }

    onDelete = (key) => {
        let {dataSource} = this.state;
        Modal.confirm({
            title: '提示',
            content: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = key;
                ajax.postJSON(delBallUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        dataSource = dataSource.filter((item) => item.id !== key);
                        this.setState({
                            dataSource
                        });
                    } else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    editrouter = (id) => {
        return `/frame/residence/editBall/${id}`
    }

    render() {
        const {loading, dataSource} = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>宿舍公寓管理</Breadcrumb.Item>
                        <Breadcrumb.Item>运动场馆列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>运动场馆列表</h5>
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

HealthLifeList.contextTypes = {
    router: React.PropTypes.object
}

export default HealthLifeList;