import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Table, Icon, Divider, Breadcrumb, Menu, Dropdown, Spin, Badge, Tabs, Upload, Button  } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../order.less';

import ZZEditor from '../../../components/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const TabPane = Tabs.TabPane;
const getUserListUrl = restUrl.ADDR + 'Order/getOrderList';


class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      fixed: 'left',
      width: 200,
      render: (text, record, index) => (
          <Link to={this.detailrouter(record.id)}>{text}</Link>
      )
    }, {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record, index) => {
        if(record.state === 0){
          return (
            <Badge status="warning" text="待支付" />
          )
        }else if(record.state === 1){
          return (
            <Badge status="processing" text="已支付" />
          )
        }else if(record.state === 2){
          return (
            <Badge status="success" text="已完成" />
          )
        }else if(record.state === -1){
          return (
            <Badge status="default" text="已取消" />
          )
        }else {
          return (
            <Badge status="error" text="异常状态" />
          )
        }
      }
    }, {
      title: '预订人',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '预订电话',
      dataIndex: 'telephone',
      key: 'telephone',
    }, {
      title: '预订地址',
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => (
          <div>{record.province + record.city + record.county + record.area}</div>
      )
    }, {
      title: '安装时间',
      dataIndex: 'installDate',
      key: 'installDate',
    }, {
      title: '支付金额',
      dataIndex: 'payMoney',
      key: 'payMoney',
    }, {
      title: <a><Icon type="setting" style={{fontSize: 18}} /></a>,
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record, index) => <Dropdown 
          overlay={<Menu>
        <Menu.Item>
          <Link to={this.detailrouter(record.id)}>详情</Link>
        </Menu.Item>
        <Menu.Item>
          <a>完成订单</a>
        </Menu.Item>
      </Menu>}
        >
          <a className="ant-dropdown-link">操作</a>
        </Dropdown>,
    }];

    this.state = {
        editorState_1: EditorState.createEmpty(),
        editorState_2: EditorState.createEmpty(),
        fileList: [],
        loading: false
    };
  }

  componentWillMount = () => { 
  }

  componentDidMount = () => { 
    var param = {};
    // ajax.getJSON(getUserListUrl, null, (data) => {
    //   data =  eval('(' + data.backData + ')');
    //   console.log('UserList === ', data);
    //   data.map(function(item, index){
    //     item.key = index;
    //   });
    //   this.setState({
    //     dataSource: data,
    //     loading: false
    //   });
    // });
  }

  detailrouter = (id) => {
    return `/frame/order/orderDetailInfo/${id}`
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  saveEditorState = (editorState, companyId) => {
        if(companyId === '1'){
            this.setState({
                editorState_1: editorState,
            });
        }else if(companyId === '2') {
            this.setState({
                editorState_2: editorState,
            });
        }else {

        }
    }

  render() {
    let { 
        editorState_1, 
        editorState_2,
        loading, 
        submitLoading_1,
        submitLoading_2,
    } = this.state;

    return (
      <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>就餐一二楼官网管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>就餐一二楼官网管理</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
              <Tabs defaultActiveKey="1">
                    <TabPane tab="一楼食堂官网" key="1">
                        <Tabs defaultActiveKey="1_1">
                            <TabPane tab="企业文化" key="1_1">
                                <ZZEditor editorState={editorState_1} companyId={'1'} saveEditorState={this.saveEditorState} />
                            </TabPane>
                            <TabPane tab="服务咨询" key="1_2">
                            </TabPane>
                            <TabPane tab="企业相册" key="1_3">
                                <Upload
                                    action={restUrl.UPLOAD}
                                    listType={'picture'}
                                    className='upload-list-inline'
                                    onChange={this.handleChange}
                                >
                                  <Button>
                                    <Icon type="upload" /> 上传
                                  </Button>
                                </Upload>
                                <Divider />
                                <Row>
                                    <Col>
                                        <Button type="primary">保存</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="节日活动" key="1_4">
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="二楼食堂官网" key="2">
                    </TabPane>
              </Tabs>
          </Spin>
        </div>
      </div>
    );
  }
}

OrderList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default OrderList;