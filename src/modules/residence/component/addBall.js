import React from 'react';
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    InputNumber,
    Dropdown,
    Menu,
    Avatar,
    Select,
    Divider,
    Button,
    Upload,
    notification,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../residence.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const Option = Select.Option;

const getGymListUrl = restUrl.ADDR + 'survey/getGymList';
const saveBallUrl = restUrl.ADDR + 'Survey/saveAPBall';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

const ballList = [
    {
        value: '1',
        name: '羽毛球馆'
    }, {
        value: '2',
        name: '足球场'
    }, {
        value: '3',
        name: '篮球馆'
    }, {
        value: '4',
        name: '台球室'
    }, {
        value: '5',
        name: '乒乓球馆'
    }, {
        value: '6',
        name: '健身馆'
    }, {
        value: '7',
        name: '瑜伽馆'
    }
];

class AddBall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            loading: true,
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        const {options} = this.state;
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(getGymListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                const ballType = [];
                backData.map(item => {
                    ballType.push(item.ball_type);
                });
                ballList.map(item => {
                    options.push(<Option
                        key={item.value}
                        value={item.value}
                        disabled={ballType.findIndex((val => val === item.value)) > -1 ? true : false}
                    >{item.name}</Option>);
                })
                this.setState({
                    options,
                    loading: false
                });
            }
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})

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
                    if (data.success) {
                        notification.open({
                            message: '新增运动成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                    }
                });
            }
        });
    }

    render() {
        let {options, fileList, editorState} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

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
                                        rules: [{required: true, message: '运动类别不能为空!'}]
                                    })(
                                        <Select
                                        >
                                            {
                                                options.map(item => item)
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ZZEditor editorState={editorState} saveEditorState={this.saveEditorState}/>
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
    router: React.PropTypes.object
}

export default WrappedAddBall;
