import React from 'react';
import { Form, Row, Col, Icon, Input, Select, Divider, Button, notification, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../company.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const Option = Select.Option;

const saveAPServiceUrl = restUrl.ADDR + 'company/saveAPService';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

class AddServiceAndHoliday extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount = () => {
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
                values.service_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                console.log('handleSubmit  param === ', values);

                ajax.postJSON(saveAPServiceUrl, JSON.stringify(values), (data) => {
                    if(data.success){
                        notification.open({
                            message: '更新信息成功！',
                            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                        });
                        // this.context.router.push('/frame/dish/healthFood');
                    }
                });
            }
        });
    }

    render() {
        let { fileList, editorState } = this.state;
        const { getFieldDecorator, setFieldsValue } = this.props.form;

        return (
            <div className="zui-content">
                <div className="ibox-title">
                    <h5>新增服务和节日信息</h5>
                </div>
                <div className="ibox-content">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="公司"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('companyId', {
                                        rules: [{ required: false }],
                                        initialValue: '1'
                                    })(
                                        <Select
                                        >
                                            <Option value={'1'}>一楼食堂</Option>
                                            <Option value={'2'}>二楼食堂</Option>
                                            <Option value={'3'}>学生公寓1号</Option>
                                            <Option value={'4'}>学生公寓2号</Option>
                                            <Option value={'5'}>教师公寓</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="类别"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('service_type', {
                                        rules: [{ required: false }],
                                        initialValue: '服务资讯'
                                    })(
                                        <Select
                                        >
                                            <Option value={'服务资讯'}>服务资讯</Option>
                                            <Option value={'节日活动'}>节日活动</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="名称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('service_title', {
                                        rules: [{ required: true, message: '名称不能为空!' }],
                                    })(
                                        <Input placeholder="" />
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
                </div>
            </div>
        );
    }
}

const WrappedAddServiceAndHoliday = Form.create()(AddServiceAndHoliday);
AddServiceAndHoliday.contextTypes = {
    router:React.PropTypes.object
}

export default WrappedAddServiceAndHoliday;
