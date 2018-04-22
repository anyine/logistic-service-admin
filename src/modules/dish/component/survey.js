import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, Table, message, Avatar } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const getSurveyListUrl = restUrl.ADDR + 'survey/getSurveyList';

class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '满意程度',
            dataIndex: 'satisfaction',
            key: 'satisfaction',
        }, {
            title: '电话号码',
            dataIndex: 'telephone',
            key: 'telephone',
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
        };
    }

    componentWillMount = () => { 
    }

    componentDidMount = () => {
      this.getSurveyList();
    }

    getSurveyList = () => {
      this.setState({
        loading: true
      });
      ajax.getJSON(getSurveyListUrl, null, data => {
        if(data.success){
          let dataSource_1 = [], dataSource_2 = [];
          data = data.backData;
          data.map(item => {
            item.key = item.id;
            if(item.companyId === '1')
              dataSource_1.push(item);
            if(item.companyId === '2')
              dataSource_2.push(item);
          });
          this.setState({
            dataSource_1,
            dataSource_2
          });
        }
        this.setState({
          loading: false
        });
      });
    }

  render() {
    const { dataSource_1, dataSource_2, loading } = this.state;

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
            </Tabs>
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