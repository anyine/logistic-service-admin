import React from 'react';
import {
    Row,
    Col,
    Breadcrumb,
    Icon,
    Divider,
    Button,
    notification,
    Collapse,
    Spin,
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../residence.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Panel = Collapse.Panel;

const getResidenceInfoUrl = restUrl.ADDR + 'server/getResidenceInfo';
const saveResidenceUrl = restUrl.ADDR + 'server/saveResidence';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};


class PropertyInfomation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState_3: EditorState.createEmpty(),
            editorState_4: EditorState.createEmpty(),
            editorState_5: EditorState.createEmpty(),
            editorState_6: EditorState.createEmpty(),
            editorState_7: EditorState.createEmpty(),
            editorState_8: EditorState.createEmpty(),
            editorState_9: EditorState.createEmpty(),
            loading: true,
            submitLoading_3: false,
            submitLoading_4: false,
            submitLoading_5: false,
            submitLoading_6: false,
            submitLoading_7: false,
            submitLoading_8: false,
            submitLoading_9: false,
        };

        this.saveEditorState = this.saveEditorState.bind(this);
    }

    componentDidMount = () => {
        this.getResidenceInfo();
    }

    //获取房屋详情
    getResidenceInfo = (id) => {
        let param = {};
        param.id = id;
        ajax.getJSON(getResidenceInfoUrl, param, (data) => {
            data = data.backData;
            data.map((item, index) => {
                if (item.residence_content && item.residence_content !== '') {
                    item.residence_content = draftToHtml(JSON.parse(item.residence_content));
                    const contentBlock = htmlToDraft(item.residence_content);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);

                    if (item.companyId === '3') {
                        this.setState({
                            editorState_3: editorState
                        });
                    } else if (item.companyId === '4') {
                        this.setState({
                            editorState_4: editorState
                        });
                    } else if (item.companyId === '5') {
                        this.setState({
                            editorState_5: editorState
                        });
                    } else if (item.companyId === '6') {
                        this.setState({
                            editorState_6: editorState
                        });
                    }else if (item.companyId === '7') {
                        this.setState({
                            editorState_7: editorState
                        });
                    }else if (item.companyId === '8') {
                        this.setState({
                            editorState_8: editorState
                        });
                    }else if (item.companyId === '9') {
                        this.setState({
                            editorState_9: editorState
                        });
                    }else {

                    }
                }
            });
            this.setState({
                loading: false
            });
        });
    }

    saveEditorState = (editorState, companyId) => {
        if (companyId === '3') {
            this.setState({
                editorState_3: editorState,
            });
        }
        else if (companyId === '4') {
            this.setState({
                editorState_4: editorState,
            });
        } else if (companyId === '5') {
            this.setState({
                editorState_5: editorState,
            });
        }  else if (companyId === '6') {
            this.setState({
                editorState_6: editorState,
            });
        }  else if (companyId === '7') {
            this.setState({
                editorState_7: editorState,
            });
        }  else if (companyId === '8') {
            this.setState({
                editorState_8: editorState,
            });
        }  else if (companyId === '9') {
            this.setState({
                editorState_9: editorState,
            });
        } else {

        }
    }

    submitResidence = (companyId) => {
        let param = {};
        param.companyId = companyId;

        if (companyId === '3') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_3.getCurrentContent()));
            this.setState({
                submitLoading_3: true
            });
        } else if (companyId === '4') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_4.getCurrentContent()));
            this.setState({
                submitLoading_4: true
            });
        } else if (companyId === '5') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_5.getCurrentContent()));
            this.setState({
                submitLoading_5: true
            });
        } else if (companyId === '6') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_6.getCurrentContent()));
            this.setState({
                submitLoading_6: true
            });
        } else if (companyId === '7') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_7.getCurrentContent()));
            this.setState({
                submitLoading_7: true
            });
        } else if (companyId === '8') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_8.getCurrentContent()));
            this.setState({
                submitLoading_8: true
            });
        } else if (companyId === '9') {
            param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_9.getCurrentContent()));
            this.setState({
                submitLoading_9: true
            });
        }
        console.log('param === ', param);
        ajax.postJSON(saveResidenceUrl, JSON.stringify(param), (data) => {
            if (companyId === '3') {
                this.setState({
                    submitLoading_3: false
                });
            } else if (companyId === '4') {
                this.setState({
                    submitLoading_4: false
                });
            } else if (companyId === '5') {
                this.setState({
                    submitLoading_5: false
                });
            } else if (companyId === '6') {
                this.setState({
                    submitLoading_6: false
                });
            } else if (companyId === '7') {
                this.setState({
                    submitLoading_7: false
                });
            } else if (companyId === '8') {
                this.setState({
                    submitLoading_8: false
                });
            } else if (companyId === '9') {
                this.setState({
                    submitLoading_9: false
                });
            }
            notification.open({
                message: '房屋信息更新成功！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
            });
        });
    }


    render() {
        let {
            editorState_3,
            editorState_4,
            editorState_5,
            editorState_6,
            editorState_7,
            editorState_8,
            editorState_9,
            loading,
            submitLoading_3,
            submitLoading_4,
            submitLoading_5,
            submitLoading_6,
            submitLoading_7,
            submitLoading_8,
            submitLoading_9,
        } = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>房屋信息管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Spin spinning={loading}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Collapse accordion defaultActiveKey={['1']}>
                                <Panel header="学生公寓1号" key="1" forceRender={true}>
                                    <ZZEditor editorState={editorState_3} companyId={'3'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_3}
                                                onClick={this.submitResidence.bind(null, '3')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓2号" key="2" forceRender={true}>
                                    <ZZEditor editorState={editorState_4} companyId={'4'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_4}
                                                onClick={this.submitResidence.bind(null, '4')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="教师公寓" key="3" forceRender={true}>
                                    <ZZEditor editorState={editorState_5} companyId={'5'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_5}
                                                onClick={this.submitResidence.bind(null, '5')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓3号" key="4" forceRender={true}>
                                    <ZZEditor editorState={editorState_6} companyId={'6'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_6}
                                                onClick={this.submitResidence.bind(null, '6')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col span={12}>
                            <Collapse accordion defaultActiveKey={['1']}>
                                <Panel header="学生公寓4号" key="1" forceRender={true}>
                                    <ZZEditor editorState={editorState_7} companyId={'7'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_7}
                                                onClick={this.submitResidence.bind(null, '7')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓5号" key="2" forceRender={true}>
                                    <ZZEditor editorState={editorState_8} companyId={'8'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_8}
                                                onClick={this.submitResidence.bind(null, '8')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓6号" key="3" forceRender={true}>
                                    <ZZEditor editorState={editorState_9} companyId={'9'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_9}
                                                onClick={this.submitResidence.bind(null, '9')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

PropertyInfomation.contextTypes = {
    router: React.PropTypes.object
}

export default PropertyInfomation;
