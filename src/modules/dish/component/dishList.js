import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Tree, Table, Icon, Switch, Divider, Breadcrumb, notification, Menu, Dropdown, Popconfirm, Spin, Tabs, message } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '菜品名称',
            dataIndex: 'dish_title',
            key: 'name',
            render: (text, record, index) => (
                <Link to={this.detailrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '菜品描述',
            dataIndex: 'dish_content',
            key: 'dish_content',
        }, {
            title: '供餐时段',
            dataIndex: 'dish_type',
            key: 'dish_type',
        }, {
            title: '是否推荐',
            dataIndex: 'is_online',
            key: 'is_online',
            render: (text, record, index) => (
                <Switch 
                    checked={record.is_online ? true : false} 
                    onChange={ checked => {
                        this.onOnlineChange(record, checked, index);
                    }} />
            )
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
                              <Link to={this.detailrouter(record.id)}>详情</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Popconfirm 
                                    title="确定要删除吗?" 
                                    cancelText="取消"
                                    okText="确定"
                                    placement="leftTop"
                                    onConfirm={() => this.onDelete(record.key)}
                                >
                                    <a href="#">删除</a>
                                </Popconfirm>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <a className="ant-dropdown-link">操作</a>
                </Dropdown>
            ),
        }];

        this.state = {
            treeData_1: [],
            treeData_2: [],
            dataSource_1: [],
            dataSource_2: [],
            visible: false,
            loading: true,
        };
    }

    componentWillMount = () => { 
        const treeData = () =>{
            return [{
                key: '早餐',
                title: '早餐',
                children: []
            }, {
                key: '午餐',
                title: '午餐',
                children: []
            }, {
                key: '晚餐',
                title: '晚餐',
                children: []
            }];
        };

        this.setState({
            treeData_1: treeData(),
            treeData_2: treeData()
        });
    }

    componentDidMount = () => {
        this.getDishList();
    }

    onOnlineChange = (record, checked, index) => {
        let {dataSource_1, dataSource_2} = this.state;
        let param = {};
        param.id = record.id;
        param.is_online = checked ? 1 : 0;
        ajax.postJSON(onlineStateChangeUrl, param, (data) => {
            if(record.companyId === '1'){
                dataSource_1[index].is_online = param.is_online;
                this.setState({
                    dataSource_1
                });
            }else if(record.companyId === '2'){
                dataSource_2[index].is_online = param.is_online;
                this.setState({
                    dataSource_2
                });
            }
            notification.open({
                message: '更新菜品状态成功！',
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            });
        });
    }

    getDishList = () => {
        let { treeData_1, treeData_2 } = this.state;

        ajax.getJSON(getDishListUrl, null, (data) => {
        if(data.success){ 
          data =  data.backData;
          let dataSource_1 = [], dataSource_2 = [];
          data.map(function(item, index){
            item.key = index;
            if(item.companyId === '1'){
              dataSource_1.push(item);
              treeData_1.map((tree_1) => {
                if(tree_1.key === item.dish_type) {
                    tree_1.children.push({
                        key: item.id,
                        title: item.dish_title
                    });
                }
              });
            }else if(item.companyId === '2'){
                dataSource_2.push(item);
                treeData_2.map((tree_2) => {
                if(tree_2.key === item.dish_type) {
                    tree_2.children.push({
                        key: item.id,
                        title: item.dish_title
                    });
                }
              });
            }else {

            }
          });
          console.log('treeData_1 =222== ', treeData_1);
          console.log('treeData_2 =222== ', treeData_2);
          this.setState({
            treeData_1,
            treeData_2,
            dataSource_1,
            dataSource_2,
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
          message.warning(data.backMsg);
        }
      });
    }

    detailrouter = (id) => {
      return `/frame/dish/dishDetailInfo/${id}`
    }

    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    loadTreeNode = (treeData) => {
        return treeData.map((item) => {
          if(item.children && item.children.length > 0){
            return (
              <TreeNode key={item.key} title={item.title}>
                {this.loadTreeNode(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode key={item.key} title={item.title} />; 
        });
    }

  render() {
    const { treeData_1, treeData_2, dataSource_1, dataSource_2, loading } = this.state;

    return (
    <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
            <Breadcrumb.Item>菜品列表</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>所有菜单</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="一楼食堂" key="1">
                <Row gutter={16}>
                  <Col span={6}>
                    <h4>所有菜品</h4>
                    <Divider />
                    <Tree
                        showLine
                        defaultExpandAll
                    >
                        {this.loadTreeNode(treeData_1)}
                    </Tree>
                  </Col>
                  <Col span={18}>
                    <h4>菜单列表</h4>
                    <Divider />
                    <Table 
                      bordered={true} 
                      dataSource={dataSource_1} 
                      columns={this.columns}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="二楼食堂" key="2">
                <Row gutter={16}>
                  <Col span={6}>
                    <h4>所有菜品</h4>
                    <Divider />
                    <Tree
                        showLine
                        defaultExpandAll
                    >
                        {this.loadTreeNode(treeData_2)}
                    </Tree>
                  </Col>
                  <Col span={18}>
                    <h4>菜单列表</h4>
                    <Divider />
                    <Table 
                      bordered={true} 
                      dataSource={dataSource_2} 
                      columns={this.columns}
                    />
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Spin>
        </div>
    </div>
    );
  }
}

ProductList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default ProductList;