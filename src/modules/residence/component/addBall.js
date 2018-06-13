import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../residence.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const Option = Select.Option;

const saveBallUrl = restUrl.ADDR + 'Survey/saveAPBall';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

class AddBall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount = () => {
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    saveEditorState = (editorState) => {
        this.setState({
            editorState
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.ball_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                console.log('handleSubmit  param === ', values);

                ajax.postJSON(saveBallUrl, JSON.stringify(values), (data) => {
                    if(data.success){
                        notification.open({
                            message: '新增运动成功！',
                            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                        });
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
                    <h5>新增运动信息</h5>
                </div>
                <div className="ibox-content">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="运动类别"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ball_type', {
                                        rules: [{ required: false }],
                                        initialValue: '1'
                                    })(
                                        <Select
                                        >
                                            <Option value={'1'}>羽毛球馆</Option>
                                            <Option value={'2'}>足球场</Option>
                                            <Option value={'3'}>篮球馆</Option>
                                            <Option value={'4'}>台球室</Option>
                                            <Option value={'5'}>乒乓球馆</Option>
                                            <Option value={'6'}>健身馆</Option>
                                            <Option value={'7'}>瑜伽馆</Option>
                                        </Select>
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

const WrappedAddBall = Form.create()(AddBall);
AddBall.contextTypes = {
    router:React.PropTypes.object
}

export default WrappedAddBall;
