import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Table, Breadcrumb, notification, Spin, Menu, message, Dropdown} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';

const getGymListUrl = restUrl.ADDR + 'survey/getGymList';
const delHealthUrl = restUrl.ADDR + 'health/delHealth';

class HealthLifeList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '菜品名称',
            width: 130,
            dataIndex: 'dish_title',
            key: 'name',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '供餐时段',
            dataIndex: 'dish_type',
            key: 'dish_type',
            width: 100,
        }, {
            title: '创建日期',
            width: 110,
            dataIndex: 'create_time',
            key: 'create_time',
            render: (text, record, index) => (
                text.substring(0, 10)
            )
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
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