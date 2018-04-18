import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, Select, Divider, Button, Upload, notification, Steps, Spin, Tabs } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../residence.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const getResidenceInfoUrl = restUrl.ADDR + 'server/getResidenceInfo';
const saveResidenceUrl = restUrl.ADDR + 'server/saveResidence';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};


class PropertyInfomation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        editorState_3: EditorState.createEmpty(),
        editorState_4: EditorState.createEmpty(),
        editorState_5: EditorState.createEmpty(),
        fileList: [],
        loading: true,
        submitLoading_1: false,
        submitLoading_2: false,
        submitLoading_3: false,
        submitLoading_4: false,
        submitLoading_5: false,
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
        if(item.residence_content && item.residence_content !== ''){
          item.residence_content = draftToHtml(JSON.parse(item.residence_content));
          const contentBlock = htmlToDraft(item.residence_content);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);

            if(item.companyId === '3'){
              this.setState({
            editorState_3: editorState
          });
            } else if(item.companyId === '4'){
              this.setState({
            editorState_4: editorState
          });
            } else if(item.companyId === '5'){
              this.setState({
            editorState_5: editorState
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
      if(companyId === '3') {
        this.setState({
        editorState_3: editorState,
      });
      }
      else if(companyId === '4') {
        this.setState({
        editorState_4: editorState,
      });
      }else if(companyId === '5') {
        this.setState({
        editorState_5: editorState,
      });
      }else {

      }
  }

  submitResidence = (companyId) => {
    let param = {};
    param.companyId = companyId;

    if(companyId === '3'){
      param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_3.getCurrentContent()));
      this.setState({
        submitLoading_3: true
      });
    }else if(companyId === '4'){
      param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_4.getCurrentContent()));
      this.setState({
        submitLoading_4: true
      });
    }else if(companyId === '5'){
      param.residence_content = JSON.stringify(convertToRaw(this.state.editorState_5.getCurrentContent()));
      this.setState({
        submitLoading_5: true
      });
    }
    console.log('param === ', param);
    ajax.postJSON(saveResidenceUrl, JSON.stringify(param), (data) => {
      if(companyId === '3'){
        this.setState({
          submitLoading_3: false
        });
      }else if(companyId === '4'){
        this.setState({
          submitLoading_4: false
        });
      }else if(companyId === '5'){
        this.setState({
          submitLoading_5: false
        });
      }
      notification.open({
            message: '房屋信息更新成功！',
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        });
    });
  }


  render() {
    let { 
      editorState_3, 
      editorState_4, 
      editorState_5, 
      loading, 
      submitLoading_3,
      submitLoading_4,
      submitLoading_5,
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
          <Col span={8}>
            <div className="ibox-title">
                  <h5>学生公寓1号</h5>
              </div>
              <div className="ibox-content">
              <ZZEditor editorState={editorState_3} companyId={'3'} saveEditorState={this.saveEditorState} />
                <Divider></Divider>
                <div style={{textAlign: 'center'}}>
                <Button type="primary" loading={submitLoading_3} onClick={this.submitResidence.bind(null, '3')}>
                    确认
                  </Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ibox-title">
                  <h5>学生公寓2号</h5>
              </div>
              <div className="ibox-content">
              <ZZEditor editorState={editorState_4} companyId={'4'} saveEditorState={this.saveEditorState} />
              <Divider></Divider>
              <div style={{textAlign: 'center'}}>
                <Button type="primary" loading={submitLoading_4} onClick={this.submitResidence.bind(null, '4')}>
                    确认
                  </Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="ibox-title">
                  <h5>教师公寓</h5>
              </div>
              <div className="ibox-content">
              <ZZEditor editorState={editorState_5} companyId={'5'} saveEditorState={this.saveEditorState} />
                <Divider></Divider>
                <div style={{textAlign: 'center'}}>
                <Button type="primary" loading={submitLoading_5} onClick={this.submitResidence.bind(null, '5')}>
                    确认
                  </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
    );
  }
}

PropertyInfomation.contextTypes = {  
     router:React.PropTypes.object  
} 

export default PropertyInfomation;
