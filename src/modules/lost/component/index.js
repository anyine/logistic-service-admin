import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, Select, Divider, Button, Upload, notification, Steps, Spin, Tabs } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

import ZZEditor from '../../../components/zzEditor/zzEditor';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const getLostInfoUrl = restUrl.ADDR + 'server/getLostInfo';
const saveLostUrl = restUrl.ADDR + 'server/saveLost';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
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
  	this.getLostInfo();
  }

  //获取失物招领详情
  getLostInfo = (id) => {
  	let param = {};
  	param.id = id;
  	ajax.getJSON(getLostInfoUrl, param, (data) => {
  		data = data.backData;
  		data.map((item, index) => {
  			if(item.lost_content && item.lost_content !== ''){
	  			item.lost_content = draftToHtml(JSON.parse(item.lost_content));
	  			console.log('companyId === ', item.companyId);
	  			console.log('lost_content === ', item.lost_content);
		    	const contentBlock = htmlToDraft(item.lost_content);
		    	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		      	const editorState = EditorState.createWithContent(contentState);

		      	if(item.companyId === '1'){
		      		this.setState({
						editorState_1: editorState
					});
		      	} else if(item.companyId === '2'){
		      		this.setState({
						editorState_2: editorState
					});
		      	} else if(item.companyId === '3'){
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
  		if(companyId === '1'){
  			this.setState({
				editorState_1: editorState,
			});
  		}else if(companyId === '2') {
  			this.setState({
				editorState_2: editorState,
			});
  		}
  		else if(companyId === '3') {
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

	submitLost = (companyId) => {
		let param = {};
		param.companyId = companyId;

		if(companyId === '1'){
			param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_1.getCurrentContent()));
			this.setState({
				submitLoading_1: true
			});
		}else if(companyId === '2'){
			param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_2.getCurrentContent()));
			this.setState({
				submitLoading_2: true
			});
		}else if(companyId === '3'){
			param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_3.getCurrentContent()));
			this.setState({
				submitLoading_3: true
			});
		}else if(companyId === '4'){
			param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_4.getCurrentContent()));
			this.setState({
				submitLoading_4: true
			});
		}else if(companyId === '5'){
			param.lost_content = JSON.stringify(convertToRaw(this.state.editorState_5.getCurrentContent()));
			this.setState({
				submitLoading_5: true
			});
		}
		console.log('param === ', param);
		ajax.postJSON(saveLostUrl, JSON.stringify(param), (data) => {
			if(companyId === '1'){
				this.setState({
					submitLoading_1: false
				});
			}else if(companyId === '2'){
				this.setState({
					submitLoading_2: false
				});
			}else if(companyId === '3'){
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
		        message: '失误招领信息更新成功！',
		        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
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
  		loading, 
  		submitLoading_1,
  		submitLoading_2,
  		submitLoading_3,
  		submitLoading_4,
  		submitLoading_5,
	} = this.state;

    return (
    <div className="zui-content">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>失物招领</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
	    <Spin spinning={loading}>
		    <Row gutter={16}>
		    	<Col span={8}>
		    		<div className="ibox-title">
			            <h5>一楼食堂</h5>
			        </div>
			        <div className="ibox-content">			       
			    		<ZZEditor editorState={editorState_1} companyId={'1'} saveEditorState={this.saveEditorState} />
		  				<Divider></Divider>
		  				<div style={{textAlign: 'center'}}>
				    		<Button type="primary" loading={submitLoading_1} onClick={this.submitLost.bind(null, '1')}>
					        	确认
					        </Button>
					    </div>				
				    </div>
		    	</Col>
		    	<Col span={8}>
		    		<div className="ibox-title">
			            <h5>二楼食堂</h5>
			        </div>
			        <div className="ibox-content">
			    		<ZZEditor editorState={editorState_2} companyId={'2'} saveEditorState={this.saveEditorState} />
	      				<Divider></Divider>
	      				<div style={{textAlign: 'center'}}>
				    		<Button type="primary" loading={submitLoading_2} onClick={this.submitLost.bind(null, '2')}>
					        	确认
					        </Button>
					    </div>
				    </div>
		    	</Col>
		    	<Col span={8}>
		    		<div className="ibox-title">
			            <h5>学生公寓1号</h5>
			        </div>
			        <div className="ibox-content">
			    		<ZZEditor editorState={editorState_3} companyId={'3'} saveEditorState={this.saveEditorState} />
	      				<Divider></Divider>
	      				<div style={{textAlign: 'center'}}>
				    		<Button type="primary" loading={submitLoading_3} onClick={this.submitLost.bind(null, '3')}>
					        	确认
					        </Button>
					    </div>
				    </div>
		    	</Col>
	    	</Row>
	    	<Row gutter={16} style={{marginTop: 16}}>
		    	<Col span={8}>
		    		<div className="ibox-title">
			            <h5>学生公寓2号</h5>
			        </div>
			        <div className="ibox-content">
			    		<ZZEditor editorState={editorState_4} companyId={'4'} saveEditorState={this.saveEditorState} />
		  				<Divider></Divider>
		  				<div style={{textAlign: 'center'}}>
				    		<Button type="primary" loading={submitLoading_4} onClick={this.submitLost.bind(null, '4')}>
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
				    		<Button type="primary" loading={submitLoading_5} onClick={this.submitLost.bind(null, '5')}>
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
