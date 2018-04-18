import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, message, Avatar } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';
const Search = Input.Search;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';

class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
        };
    }

    componentWillMount = () => { 
    }

    componentDidMount = () => {
    }

    detailrouter = (id) => {
      return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/dish/editDish/${id}`
    }

    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

  render() {
    const { treeData_1, treeData_2, dataSource_1, dataSource_2, data_1, data_2, loading } = this.state;

    return (
    <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>就餐服务管理</Breadcrumb.Item>
            <Breadcrumb.Item>满意度调查管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>满意度调查管理</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
            
          </Spin>
        </div>
    </div>
    );
  }
}

Survey.contextTypes = {  
  router: React.PropTypes.object  
} 

export default Survey;