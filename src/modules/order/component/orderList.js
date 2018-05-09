import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Table, Icon, Divider, Breadcrumb, Menu, Dropdown, Spin, Badge, Tabs, Upload, Button} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../order.less';

import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const TabPane = Tabs.TabPane;
//获取公司信息
const getCompanyListUrl = restUrl.ADDR + 'company/GetCompanyList';
//更新公司文化
const updateComCultureUrl = restUrl.ADDR + 'company/updateComCulture';
//更新公司相册
const updateComPhotoUrl = restUrl.ADDR + 'company/updateComPhoto';


class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data_1: {},
            editorState_1: EditorState.createEmpty(),
            editorState_2: EditorState.createEmpty(),
            fileList: [],
            loading: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getCompanyInfo();
    }

    getCompanyInfo = () => {
        ajax.getJSON(getCompanyListUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => {
                    let editorState = EditorState.createEmpty();
                    if(item.culture && item.culture !== '') {
                        item.culture = draftToHtml(JSON.parse(item.culture));
                        const contentBlock = htmlToDraft(item.culture);
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        editorState = EditorState.createWithContent(contentState);
                    }
                    if(item.companyId === '1') {
                        this.setState({
                            data_1: item,
                            editorState_1: editorState
                        });
                    }
                });
            }
        });
    }

    updateComCulture = (companyId) => {
        let param = {};
        param.companyId = companyId;
        param.culture = JSON.stringify(convertToRaw(this.state.editorState_1.getCurrentContent()));
        ajax.postJSON(updateComCultureUrl, JSON.stringify(param), (data) => {
            if (data.success) {
                alert('保存成功~');
            }
        });
    }


    detailrouter = (id) => {
        return `/frame/order/orderDetailInfo/${id}`
    }

    handleChange = ({fileList}) => this.setState({fileList})

    saveEditorState = (editorState, companyId) => {
        if (companyId === '1') {
            this.setState({
                editorState_1: editorState,
            });
        } else if (companyId === '2') {
            this.setState({
                editorState_2: editorState,
            });
        } else {

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
                                        <ZZEditor editorState={editorState_1} companyId={'1'}
                                                  saveEditorState={this.saveEditorState}/>
                                        <Divider/>
                                        <Row>
                                            <Col>
                                                <Button type="primary" onClick={this.updateComCulture.bind(null, '1')}>保存</Button>
                                            </Col>
                                        </Row>
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
                                                <Icon type="upload"/> 上传
                                            </Button>
                                        </Upload>
                                        <Divider/>
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