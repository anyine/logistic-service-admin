import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Table, Icon, Divider, Breadcrumb, Menu, Dropdown, Spin, Popconfirm, Tabs, Upload, Button} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../company.less';

import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {message, Modal, notification} from "antd/lib/index";

const TabPane = Tabs.TabPane;
//获取公司信息
const getCompanyListUrl = restUrl.ADDR + 'company/GetCompanyList';
//更新公司文化
const updateComCultureUrl = restUrl.ADDR + 'company/updateComCulture';
//更新公司相册
const updateComPhotoUrl = restUrl.ADDR + 'company/updateComPhoto';
//获取公司服务信息
const getServiceListUrl = restUrl.ADDR + 'company/GetServiceList';
const delServiceUrl = restUrl.ADDR + 'company/delService';

class Website2 extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '名称',
            dataIndex: 'service_title',
            key: 'name',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
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
                              <Link to={this.editrouter(record.id)}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a onClick={() => this.onDelete(record.key)}>删除</a>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <a className="ant-dropdown-link">操作</a>
                </Dropdown>
            ),
        }];

        this.state = {
            data_1: {},
            data_2: {},
            data_3: {},
            editorState_1: EditorState.createEmpty(),
            editorState_2: EditorState.createEmpty(),
            editorState_3: EditorState.createEmpty(),
            service_1: [],
            service_2: [],
            service_3: [],
            holiday_1: [],
            holiday_2: [],
            holiday_3: [],
            fileList_1: [],
            fileList_2: [],
            fileList_3: [],
            loading: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getCompanyInfo();
        this.getServiceList();
    }

    getCompanyInfo = () => {
        ajax.getJSON(getCompanyListUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => {
                    let editorState = EditorState.createEmpty();
                    let photos = item.photo.split(',');
                    let photoList = [];
                    if(photos[0] !== ''){
                        photos.map((photo, index) => {
                            photoList.push({
                                uid: photo,
                                name: photo + '.png',
                                status: 'done',
                                url: restUrl.BASE_HOST + 'UpLoadFile/' + photo + '.png',
                                response: {
                                    data: {
                                        id: photo
                                    }
                                }
                            });
                        });
                    }
                    if(item.culture && item.culture !== '') {
                        item.culture = draftToHtml(JSON.parse(item.culture));
                        const contentBlock = htmlToDraft(item.culture);
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        editorState = EditorState.createWithContent(contentState);
                    }
                    if(item.companyId === '3') {
                        this.setState({
                            data_1: item,
                            editorState_1: editorState,
                            fileList_1: photoList
                        });
                    } else if(item.companyId === '4') {
                        this.setState({
                            data_2: item,
                            editorState_2: editorState,
                            fileList_2: photoList
                        });
                    } else if(item.companyId === '5') {
                        this.setState({
                            data_3: item,
                            editorState_3: editorState,
                            fileList_3: photoList
                        });
                    }
                });
            }
        });
    }

    //获取公司服务信息
    getServiceList = () => {
        ajax.getJSON(getServiceListUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                let service_1 = [], service_2 = [], service_3 = [];
                let holiday_1 = [], holiday_2 = [], holiday_3 = [];
                backData.map(item => {
                    item.key = item.id;
                    if(item.companyId === '3'){
                        if(item.service_type === '服务资讯'){
                            service_1.push(item);
                        }else if(item.service_type === '节日活动'){
                            holiday_1.push(item);
                        }
                    }else if(item.companyId === '4'){
                        if(item.service_type === '服务资讯'){
                            service_2.push(item);
                        }else if(item.service_type === '节日活动'){
                            holiday_2.push(item);
                        }
                    }else if(item.companyId === '5'){
                        if(item.service_type === '服务资讯'){
                            service_3.push(item);
                        }else if(item.service_type === '节日活动'){
                            holiday_3.push(item);
                        }
                    }
                });
                this.setState({
                    service_1,
                    service_2,
                    service_3,
                    holiday_1,
                    holiday_2,
                    holiday_3
                });
            }
        });
    }

    updateComCulture = (companyId) => {
        let param = {};
        param.companyId = companyId;
        if(companyId === '3'){
            param.culture = JSON.stringify(convertToRaw(this.state.editorState_1.getCurrentContent()));
        }else if(companyId === '4') {
            param.culture = JSON.stringify(convertToRaw(this.state.editorState_2.getCurrentContent()));
        }else if(companyId === '5') {
            param.culture = JSON.stringify(convertToRaw(this.state.editorState_3.getCurrentContent()));
        }
        param.culture = JSON.stringify(convertToRaw(this.state.editorState_1.getCurrentContent()));
        ajax.postJSON(updateComCultureUrl, JSON.stringify(param), (data) => {
            if (data.success) {
                alert('保存成功~');
            }
        });
    }

    updateComPhoto = (companyId) => {
        const { fileList_1, fileList_2, fileList_3 } = this.state;
        let param = {};
        param.companyId = companyId;
        if(companyId === '3'){
            param.photo = fileList_1.map((item, index) => {
                return item.response.data.id;
            }).join(',');
        }else if(companyId === '4'){
            param.photo = fileList_2.map((item, index) => {
                return item.response.data.id;
            }).join(',');
        }else if(companyId === '5'){
            param.photo = fileList_3.map((item, index) => {
                return item.response.data.id;
            }).join(',');
        }
        
        ajax.postJSON(updateComPhotoUrl, JSON.stringify(param), (data) => {
            if (data.success) {
                alert('保存成功~');
            }
        });
    }

    editrouter = (id) => {
        return `/frame/company/editServiceAndHoliday/${id}`
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
                ajax.postJSON(delServiceUrl, JSON.stringify(param), data => {
                    if(data.success){
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                        });
                        this.getServiceList();
                        this.forceUpdate();
                    }else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    handleChange = (fileList, companyId) => {
        console.log('fileList == ', fileList);
        if(companyId === '3'){
            this.setState({
                fileList_1: fileList.fileList
            });
        }else if(companyId === '4'){
            this.setState({
                fileList_2: fileList.fileList
            });
        }else if(companyId === '5'){
            this.setState({
                fileList_3: fileList.fileList
            });
        }
    }

    saveEditorState = (editorState, companyId) => {
        if (companyId === '3') {
            this.setState({
                editorState_1: editorState,
            });
        } else if (companyId === '4') {
            this.setState({
                editorState_2: editorState,
            });
        } else if (companyId === '5') {
            this.setState({
                editorState_3: editorState,
            });
        }
    }

    render() {
        let {
            editorState_1,
            editorState_2,
            editorState_3,
            fileList_1,
            fileList_2,
            fileList_3,
            service_1,
            service_2,
            service_3,
            holiday_1,
            holiday_2,
            holiday_3,
            loading,
            submitLoading_1,
            submitLoading_2,
        } = this.state;
        console.log('fileList_1 === ', fileList_1);
        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>宿舍公寓官网管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>宿舍公寓官网管理</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="学生公寓1号官网" key="1" forceRender={true}>
                                <Tabs defaultActiveKey="1_1">
                                    <TabPane tab="企业文化" key="1_1">
                                        <ZZEditor editorState={editorState_1} companyId={'3'}
                                                  saveEditorState={this.saveEditorState}/>
                                        <Divider/>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button type="primary" onClick={this.updateComCulture.bind(null, '3')}>保存</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="服务资讯" key="1_2">
                                        <Table 
                                          bordered={true} 
                                          dataSource={service_1} 
                                          columns={this.columns}
                                        />
                                    </TabPane>
                                    <TabPane tab="企业相册" key="1_3">
                                        <Upload
                                            action={restUrl.UPLOAD}
                                            listType={'picture'}
                                            fileList={fileList_1}
                                            className='upload-list-inline'
                                            multiple
                                            onChange={(fileList) => this.handleChange(fileList, '3')}
                                        >
                                            <Button>
                                                <Icon type="upload"/> 上传
                                            </Button>
                                        </Upload>
                                        <Divider/>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button type="primary" onClick={this.updateComPhoto.bind(null, '3')}>保存</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="节日活动" key="1_4">
                                        <Table 
                                          bordered={true} 
                                          dataSource={holiday_1} 
                                          columns={this.columns}
                                        />
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                            <TabPane tab="学生公寓2号官网" key="2" forceRender={true}>
                                <Tabs defaultActiveKey="1_1">
                                    <TabPane tab="企业文化" key="1_1">
                                        <ZZEditor editorState={editorState_2} companyId={'4'}
                                                  saveEditorState={this.saveEditorState}/>
                                        <Divider/>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button type="primary" onClick={this.updateComCulture.bind(null, '4')}>保存</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="服务资讯" key="1_2">
                                        <Table 
                                          bordered={true} 
                                          dataSource={service_2} 
                                          columns={this.columns}
                                        />
                                    </TabPane>
                                    <TabPane tab="企业相册" key="1_3">
                                        <Upload
                                            action={restUrl.UPLOAD}
                                            listType={'picture'}
                                            fileList={fileList_2}
                                            className='upload-list-inline'
                                            multiple
                                            onChange={(fileList) => this.handleChange(fileList, '4')}
                                        >
                                            <Button>
                                                <Icon type="upload"/> 上传
                                            </Button>
                                        </Upload>
                                        <Divider/>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button type="primary" onClick={this.updateComPhoto.bind(null, '4')}>保存</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="节日活动" key="1_4">
                                        <Table 
                                          bordered={true} 
                                          dataSource={holiday_2} 
                                          columns={this.columns}
                                        />
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                            <TabPane tab="教师公寓官网" key="3" forceRender={true}>
                                <Tabs defaultActiveKey="1_1">
                                    <TabPane tab="企业文化" key="1_1">
                                        <ZZEditor editorState={editorState_3} companyId={'5'}
                                                  saveEditorState={this.saveEditorState}/>
                                        <Divider/>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button type="primary" onClick={this.updateComCulture.bind(null, '5')}>保存</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="服务资讯" key="1_2">
                                        <Table 
                                          bordered={true} 
                                          dataSource={service_3} 
                                          columns={this.columns}
                                        />
                                    </TabPane>
                                    <TabPane tab="企业相册" key="1_3">
                                        <Upload
                                            action={restUrl.UPLOAD}
                                            listType={'picture'}
                                            fileList={fileList_3}
                                            className='upload-list-inline'
                                            multiple
                                            onChange={(fileList) => this.handleChange(fileList, '5')}
                                        >
                                            <Button>
                                                <Icon type="upload"/> 上传
                                            </Button>
                                        </Upload>
                                        <Divider/>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button type="primary" onClick={this.updateComPhoto.bind(null, '5')}>保存</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="节日活动" key="1_4">
                                        <Table 
                                          bordered={true} 
                                          dataSource={holiday_3} 
                                          columns={this.columns}
                                        />
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                        </Tabs>
                    </Spin>
                </div>
            </div>
        );
    }
}

Website2.contextTypes = {
    router: React.PropTypes.object
}

export default Website2;