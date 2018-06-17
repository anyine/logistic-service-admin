import React from 'react';
import {
    Form,
    Row,
    Col,
    Breadcrumb,
    Icon,
    Divider,
    Button,
    notification,
    Collapse,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Panel = Collapse.Panel;

const getLostInfoUrl = restUrl.ADDR + 'server/getLostInfo';
const saveLostUrl = restUrl.ADDR + 'server/saveLost';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class EditNews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState_1: EditorState.createEmpty(),
            editorState_2: EditorState.createEmpty(),
            editorState_3: EditorState.createEmpty(),
            editorState_4: EditorState.createEmpty(),
            editorState_5: EditorState.createEmpty(),
            editorState_6: EditorState.createEmpty(),
            editorState_7: EditorState.createEmpty(),
            editorState_8: EditorState.createEmpty(),
            editorState_9: EditorState.createEmpty(),
            fileList: [],
            loading: true,
            submitLoading_1: false,
            submitLoading_2: false,
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
        this.getLostInfo();
    }

    //获取失物招领详情
    getLostInfo = (id) => {
        let param = {};
        param.id = id;
        ajax.getJSON(getLostInfoUrl, param, (data) => {
            data = data.backData;
            data.map((item, index) => {
                if (item.lost_content && item.lost_content !== '') {
                    item.lost_content = draftToHtml(JSON.parse(item.lost_content));
                    const contentBlock = htmlToDraft(item.lost_content);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);

                    if (item.companyId === '1') {
                        this.setState({
                            editorState_1: editorState
                        });
                    } else if (item.companyId === '2') {
                        this.setState({
                            editorState_2: editorState
                        });
                    } else if (item.companyId === '3') {
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
                    }else if (item.companyId === '6') {
                        this.setState({
                            editorState_6: editorState
                        });
                    } else if (item.companyId === '7') {
                        this.setState({
                            editorState_7: editorState
                        });
                    } else if (item.companyId === '8') {
                        this.setState({
                            editorState_8: editorState
                        });
                    } else if (item.companyId === '9') {
                        this.setState({
                            editorState_9: editorState
                        });
                    } else {

                    }
                }
            });
            this.setState({
                loading: false
            });
        });
    }

    saveEditorState = (editorState, companyId) => {
        if (companyId === '1') {
            this.setState({
                editorState_1: editorState,
            });
        } else if (companyId === '2') {
            this.setState({
                editorState_2: editorState,
            });
        }
        else if (companyId === '3') {
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
        }
        else if (companyId === '7') {
            this.setState({
                editorState_7: editorState,
            });
        }
        else if (companyId === '8') {
            this.setState({
                editorState_8: editorState,
            });
        } else if (companyId === '9') {
            this.setState({
                editorState_9: editorState,
            });
        }else {

        }
    }

    submitLost = (companyId) => {
        let param = {};
        param.companyId = companyId;

        if (companyId === '1') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_1.getCurrentContent()));
            this.setState({
                submitLoading_1: true
            });
        } else if (companyId === '2') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_2.getCurrentContent()));
            this.setState({
                submitLoading_2: true
            });
        } else if (companyId === '3') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_3.getCurrentContent()));
            this.setState({
                submitLoading_3: true
            });
        } else if (companyId === '4') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_4.getCurrentContent()));
            this.setState({
                submitLoading_4: true
            });
        } else if (companyId === '5') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_5.getCurrentContent()));
            this.setState({
                submitLoading_5: true
            });
        } else if (companyId === '6') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_6.getCurrentContent()));
            this.setState({
                submitLoading_6: true
            });
        } else if (companyId === '7') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_7.getCurrentContent()));
            this.setState({
                submitLoading_7: true
            });
        } else if (companyId === '8') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_8.getCurrentContent()));
            this.setState({
                submitLoading_8: true
            });
        } else if (companyId === '9') {
            param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_9.getCurrentContent()));
            this.setState({
                submitLoading_9: true
            });
        }
        ajax.postJSON(saveLostUrl, JSON.stringify(param), (data) => {
            if (companyId === '1') {
                this.setState({
                    submitLoading_1: false
                });
            } else if (companyId === '2') {
                this.setState({
                    submitLoading_2: false
                });
            } else if (companyId === '3') {
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
                message: '便民信息更新成功！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
            });
        });
    }

    render() {
        let {
            editorState_1,
            editorState_2,
            editorState_3,
            editorState_4,
            editorState_5,
            editorState_6,
            editorState_7,
            editorState_8,
            editorState_9,
            loading,
            submitLoading_1,
            submitLoading_2,
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
                        <Breadcrumb.Item>便民信息</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Spin spinning={loading}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Collapse accordion defaultActiveKey={['1']}>
                                <Panel header="一楼食堂" key="1" forceRender={true}>
                                    <ZZEditor editorState={editorState_1} companyId={'1'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_1}
                                                onClick={this.submitLost.bind(null, '1')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="二楼食堂" key="2" forceRender={true}>
                                    <ZZEditor editorState={editorState_2} companyId={'2'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_2}
                                                onClick={this.submitLost.bind(null, '2')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓1号" key="3" forceRender={true}>
                                    <ZZEditor editorState={editorState_3} companyId={'3'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_3}
                                                onClick={this.submitLost.bind(null, '3')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓2号" key="4" forceRender={true}>
                                    <ZZEditor editorState={editorState_4} companyId={'4'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_4}
                                                onClick={this.submitLost.bind(null, '4')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="教师公寓" key="5" forceRender={true}>
                                    <ZZEditor editorState={editorState_5} companyId={'5'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_5}
                                                onClick={this.submitLost.bind(null, '5')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col span={12}>
                            <Collapse accordion defaultActiveKey={['1']}>
                                <Panel header="学生公寓3号" key="1" forceRender={true}>
                                    <ZZEditor editorState={editorState_6} companyId={'6'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_6}
                                                onClick={this.submitLost.bind(null, '6')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓4号" key="2" forceRender={true}>
                                    <ZZEditor editorState={editorState_7} companyId={'7'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_7}
                                                onClick={this.submitLost.bind(null, '7')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓5号" key="3" forceRender={true}>
                                    <ZZEditor editorState={editorState_8} companyId={'8'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_8}
                                                onClick={this.submitLost.bind(null, '8')}>
                                            确认
                                        </Button>
                                    </div>
                                </Panel>
                                <Panel header="学生公寓6号" key="4" forceRender={true}>
                                    <ZZEditor editorState={editorState_9} companyId={'9'}
                                              saveEditorState={this.saveEditorState}/>
                                    <Divider></Divider>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type="primary" loading={submitLoading_9}
                                                onClick={this.submitLost.bind(null, '9')}>
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

const WrappedEditNews = Form.create()(EditNews);
EditNews.contextTypes = {
    router: React.PropTypes.object
}

export default WrappedEditNews;
