import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Tree, Table, Icon, List, Switch, Divider, Breadcrumb, Badge, notification, Menu, Dropdown, Popconfirm, Spin, Tabs, message, Modal } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';
const delDsihUrl = restUrl.ADDR + 'server/delDish';

class DishList extends React.Component {
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
            title: '是否今日推荐',
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
            treeData_1: [],
            treeData_2: [],
            dataSource_1: [],
            dataSource_2: [],
            data_1: [],
            data_2: [],
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
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const fullDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
          console.log('fullDate === ', fullDate);
          data.map(function(item, index){
            item.key = index;
            if(item.is_online === 1 && item.update_time.substring(0, 10) !== fullDate)
                item.is_online = 0;
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
            data_1: dataSource_1,
            data_2: dataSource_2,
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

    editrouter = (id) => {
        return `/frame/dish/editDish/${id}`
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
                ajax.postJSON(delDsihUrl, JSON.stringify(param), data => {
                    if(data.success){
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                        });
                        this.getDishList();
                        this.forceUpdate();
                    }else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    loadTreeNode = (treeData) => {
        return treeData.map((item) => {
            if(item.children && item.children.length > 0){
                return (
                  <TreeNode key={item.key} title={<span style={{fontSize: 14, color: '#000'}}>{item.title}</span>}>
                    {this.loadTreeNode(item.children)}
                  </TreeNode>
                );
            }
            return (
                <TreeNode
                    key={item.key} 
                    title={item.title} 
                />
            );
        });
    }

    onTypeSelect = (selectedKeys, e, companyId) => {
        console.log('selectedKeys ====11=== ', selectedKeys);
        console.log('e ====11=== ', e);
        if(e.selected){
            if(companyId === '1'){
                const data_1 = [...this.state.data_1];
                this.setState({ dataSource_1: data_1.filter(item => {
                        if('早餐午餐晚餐'.indexOf(selectedKeys[0]) > -1)
                            return item.dish_type === selectedKeys[0]
                        else
                            return item.id === selectedKeys[0]
                    })
                });
            }else if(companyId === '2'){
                const data_2 = [...this.state.data_2];
                this.setState({ dataSource_2: data_2.filter(item => {
                        if('早餐午餐晚餐'.indexOf(selectedKeys[0]) > -1)
                            return item.dish_type === selectedKeys[0]
                        else
                            return item.id === selectedKeys[0]
                    }) });  
            }else {}
        }
    }

  render() {
    const { treeData_1, treeData_2, dataSource_1, dataSource_2, data_1, data_2, loading } = this.state;
    const today_data_1 = {
        am: data_1.filter(item => item.dish_type === '早餐' && item.is_online === 1),
        pm: data_1.filter(item => item.dish_type === '午餐' && item.is_online === 1),
        nm: data_1.filter(item => item.dish_type === '晚餐' && item.is_online === 1)
    };
    const today_data_2 = {
        am: data_2.filter(item => item.dish_type === '早餐' && item.is_online === 1),
        pm: data_2.filter(item => item.dish_type === '午餐' && item.is_online === 1),
        nm: data_2.filter(item => item.dish_type === '晚餐' && item.is_online === 1)
    };

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
                <Row gutter={32}>
                  <Col span={3}>
                    <div style={{marginTop: 10, color: '#000', fontSize: 16}}>所有菜品</div>
                    <Divider />
                    <Tree
                        showLine
                        defaultExpandAll
                        onSelect={(selectedKeys, e) => {
                            this.onTypeSelect(selectedKeys, e, '1');
                        }}
                    >
                        {this.loadTreeNode(treeData_1)}
                    </Tree>
                  </Col>
                  <Col span={15}>
                    <div style={{marginTop: 10, color: '#000', fontSize: 16}}>菜单列表</div>
                    <Divider />
                    <Table 
                      bordered={true} 
                      dataSource={dataSource_1} 
                      columns={this.columns}
                    />
                  </Col>
                  <Col span={6}>
                    <div style={{marginTop: 10, color: '#000', fontSize: 16}}>今日菜单</div>
                    <Divider />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<Badge count={today_data_1.am.length}><span>早餐</span></Badge>} key="1">
                            <List
                                itemLayout="horizontal"
                                dataSource={today_data_1.am}
                                renderItem={item => (
                                  <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.dish_img + '.png' } style={{width: 70, height: 50}} />}
                                        title={item.dish_title}
                                        description={item.dish_content}
                                    />
                                  </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab={<Badge count={today_data_1.pm.length}><span>午餐</span></Badge>} key="2">
                            <List
                                itemLayout="horizontal"
                                dataSource={today_data_1.pm}
                                renderItem={item => (
                                  <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.dish_img + '.png' } style={{width: 70, height: 50}} />}
                                        title={item.dish_title}
                                        description={item.dish_content}
                                    />
                                  </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab={<Badge count={today_data_1.nm.length}><span>晚餐</span></Badge>} key="3">
                            <List
                                itemLayout="horizontal"
                                dataSource={today_data_1.nm}
                                renderItem={item => (
                                  <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.dish_img + '.png' } style={{width: 70, height: 50}} />}
                                        title={item.dish_title}
                                        description={item.dish_content}
                                    />
                                  </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="二楼食堂" key="2">
                <Row gutter={32}>
                  <Col span={3}>
                    <div style={{marginTop: 10, color: '#000', fontSize: 16}}>所有菜品</div>
                    <Divider />
                    <Tree
                        showLine
                        defaultExpandAll
                        onSelect={(selectedKeys, e) => {
                            this.onTypeSelect(selectedKeys, e, '2');
                        }}
                    >
                        {this.loadTreeNode(treeData_2)}
                    </Tree>
                  </Col>
                  <Col span={15}>
                    <div style={{marginTop: 10, color: '#000', fontSize: 16}}>菜单列表</div>
                    <Divider />
                    <Table
                      bordered={true}
                      dataSource={dataSource_2}
                      columns={this.columns}
                  />
                  </Col>
                  <Col span={6}>
                    <div style={{marginTop: 10, color: '#000', fontSize: 16}}>今日菜单</div>
                    <Divider />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<Badge count={today_data_2.am.length}><span>早餐</span></Badge>} key="1">
                            <List
                                itemLayout="horizontal"
                                dataSource={today_data_2.am}
                                renderItem={item => (
                                  <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.dish_img + '.png' } style={{width: 70, height: 50}} />}
                                        title={item.dish_title}
                                        description={item.dish_content}
                                    />
                                  </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab={<Badge count={today_data_2.pm.length}><span>午餐</span></Badge>} key="2">
                            <List
                                itemLayout="horizontal"
                                dataSource={today_data_2.pm}
                                renderItem={item => (
                                  <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.dish_img + '.png' } style={{width: 70, height: 50}} />}
                                        title={item.dish_title}
                                        description={item.dish_content}
                                    />
                                  </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab={<Badge count={today_data_2.nm.length}><span>晚餐</span></Badge>} key="3">
                            <List
                                itemLayout="horizontal"
                                dataSource={today_data_2.nm}
                                renderItem={item => (
                                  <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.dish_img + '.png' } style={{width: 70, height: 50}} />}
                                        title={item.dish_title}
                                        description={item.dish_content}
                                    />
                                  </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
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

DishList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default DishList;