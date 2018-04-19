import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, message, Avatar } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';
const Search = Input.Search;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';

const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {}),
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class HealthLifeList extends React.Component {
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
            <Breadcrumb.Item>宿舍公寓管理</Breadcrumb.Item>
            <Breadcrumb.Item>健康生活信息管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>健康生活信息列表</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
            <List
    itemLayout="vertical"
    size="large"
    pagination={pagination}
    dataSource={listData}
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
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