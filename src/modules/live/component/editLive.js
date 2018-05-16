import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const Option = Select.Option;

const getLiveDetailUrl = restUrl.ADDR + 'health/getLiveDetail';
const saveLiveUrl = restUrl.ADDR + 'health/saveLive';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

class EditLive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            fileList: [],
            editorState: EditorState.createEmpty(),
            loading: false
        };
    }

    componentDidMount = () => {
        this.getLiveDetail();
    }

    getLiveDetail = () => {
        this.setState({
            loading: true
        });
        let param = {};
        param.id = this.props.params.id;
        ajax.getJSON(getLiveDetailUrl, param, data => {
            if(data.success){
                let backData = data.backData;
                if(backData.live_content && backData.live_content !== ''){
                    backData.live_content = draftToHtml(JSON.parse(backData.live_content));
                    const contentBlock = htmlToDraft(backData.live_content);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);

                    this.setState({
                        editorState
                    });
                }

                let health_cover = backData.live_cover.split(',');
                let photoList = [];
                if(health_cover[0] !== ''){
                    health_cover.map((photo, index) => {
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
                backData.live_cover = photoList;

                this.setState({
                    data: backData,
                    fileList: photoList,
                    loading: false
                });
            }else {
                
            }
        });
    }

    handleChange = ({ fileList }) => {
        let {data} = this.state;
        data.live_cover = fileList;
        this.setState({ 
            fileList,
            data
        });
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    saveEditorState = (editorState) => {
        this.setState({
            editorState
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = this.props.params.id;
                values.live_cover = values.live_cover.map((item, index) => {
                    return item.response.data.id;
                }).join(',');
                values.live_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                console.log('handleSubmit  param === ', values);

                ajax.postJSON(saveLiveUrl, JSON.stringify(values), (data) => {
                    if(data.success){
                        notification.open({
                            message: '修改动态信息成功！',
                            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                        });
                    }
                });
            }
        });
    }

    render() {
        let { data, fileList, editorState, loading } = this.state;
        const { getFieldDecorator, setFieldsValue } = this.props.form;

        return (
            <div className="zui-content">
                <div className="ibox-title">
                    <h5>修改动态信息</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="封面图片"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('live_cover', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{ required: true, message: '封面图片不能为空!' }],
                                            initialValue: data.live_cover
                                        })(
                                            <Upload
                                                action={restUrl.UPLOAD}
                                                listType={'picture'}
                                                className='upload-list-inline'
                                                onChange={this.handleChange}
                                            >
                                                {fileList.length >= 1 ? null : <Button><Icon type="upload" /> 上传</Button>}
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="名称"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('live_title', {
                                            rules: [{ required: true, message: '名称不能为空!' }],
                                            initialValue: data.live_title
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="说明"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('live_desc', {
                                            rules: [{ required: true, message: '说明不能为空!' }],
                                            initialValue: data.live_desc
                                        })(
                                            <Input.TextArea autosize={{minRows: 4, maxRows: 6}} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ZZEditor editorState={editorState} saveEditorState={this.saveEditorState} />
                                </Col>
                            </Row>
                            <Divider></Divider>
                            <Row type="flex" justify="center">
                                <Col>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}

const WrappedEditLive = Form.create()(EditLive);
EditLive.contextTypes = {
    router:React.PropTypes.object
}

export default WrappedEditLive;
