import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, Select, Divider, Button, Upload, notification, Steps, Spin, Tabs, message } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

import ZZEditor from 'Comps/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const getBusDetailUrl = restUrl.ADDR + 'company/getBusDetail';
const saveBusUrl = restUrl.ADDR + 'company/saveBus';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class EditNews extends React.Component {
    constructor(props) {
	    super(props);

	    this.state = {
	    	editorState: EditorState.createEmpty(),
	    	fileList: [],
	    	loading: true,
	    	submitLoading: false
	    };

	    this.saveEditorState = this.saveEditorState.bind(this);
    }

  componentDidMount = () => {
  	this.getBusInfo();
  }

  //获取bus详情
  getBusInfo = () => {
  	this.setState({
		loading: true
	});
  	ajax.getJSON(getBusDetailUrl, null, (data) => {
  		let backData = data.backData;
  		if(backData && backData !== ''){
  			backData = draftToHtml(JSON.parse(backData));
	    	const contentBlock = htmlToDraft(backData);
	    	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	      	const editorState = EditorState.createWithContent(contentState);

	      	this.setState({
				editorState
			});
	    }
		this.setState({
			loading: false
		});
  	});
  }

  	saveEditorState = (editorState) => {
  		this.setState({
			editorState,
		});
	}

	submitBus = () => {
		this.setState({
			submitLoading: true
		});
		let param = {};
		param.bus_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
		ajax.postJSON(saveBusUrl, JSON.stringify(param), (data) => {
			if(data.success){
				notification.open({
			        message: '班车信息更新成功！',
			        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
			    });
			}else {
				message.error(data.backMsg);
			}
			this.setState({
				submitLoading: false
			});
		});
	}

  render() {
  	let { 
  		editorState,  
  		loading, 
  		submitLoading,
	} = this.state;

    return (
    <div className="zui-content">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>班车信息管理</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
	    <Spin spinning={loading}>
		    <Row>
		    	<Col>
		    		<div className="ibox-title">
			            <h5>班车信息管理</h5>
			        </div>
			        <div className="ibox-content">			       
			    		<ZZEditor editorState={editorState} saveEditorState={this.saveEditorState} />
		  				<Divider></Divider>
		  				<div style={{textAlign: 'center'}}>
				    		<Button type="primary" loading={submitLoading} onClick={this.submitBus}>
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

const WrappedEditNews = Form.create()(EditNews);
EditNews.contextTypes = {  
     router:React.PropTypes.object  
} 

export default WrappedEditNews;
