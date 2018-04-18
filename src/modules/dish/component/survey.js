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

const data = [
  {
    title: 'Ant Design Title 1',
    icon: 'smile-o'
  },
  {
    title: 'Ant Design Title 2',
    icon: 'meh-o'
  },
  {
    title: 'Ant Design Title 3',
    icon: 'meh-o'
  },
  {
    title: 'Ant Design Title 4',
    icon: 'frown-o'
  },
];

const pagination = {
  pageSize: 10,
  current: 1,
  total: data.length,
  onChange: (() => {}),
};

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
        <Spin spinning={loading}>
            <Row gutter={32}>
                <Col span={12}>
                    <div className="ibox-title">
                        <h5>一楼食堂</h5>
                    </div>
                    <div className="ibox-content">
                        <List
                            itemLayout="horizontal"
                            size="large"
                            pagination={pagination}
                            dataSource={data}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  title={<div>{item.title}<Divider type="vertical" />{item.title}</div>}
                                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                              </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="ibox-title">
                        <h5>二楼食堂</h5>
                    </div>
                    <div className="ibox-content">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                  title={<a href="https://ant.design">{item.title}</a>}
                                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                              </List.Item>
                            )}
                        />
                    </div>
                </Col>
            </Row>
        </Spin>
    </div>
    );
  }
}

Survey.contextTypes = {  
  router: React.PropTypes.object  
} 

export default Survey;