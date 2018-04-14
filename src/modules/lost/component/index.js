import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, Select, Divider, Button, Upload, notification, Steps, Spin, Tabs } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

import ZZEditor from '../../../components/zzEditor/zzEditor';

// import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const getNewsDetailInfoUrl = restUrl.ADDR + 'News/getNewsDetail';
const saveNewsUrl = restUrl.ADDR + 'News/saveAPNews';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class EditNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	fileList: [],
    	loading: false,
    	submitLoading: false
    };
  }

  componentDidMount = () => {
  	// this.getNewsDetailInfo();
  }

  //获取产品详情
  getNewsDetailInfo = (id) => {
  	let param = {};
  	param.newsId = this.props.params.id;
  	ajax.getJSON(getNewsDetailInfoUrl, param, (data) => {
  		data =  data.backData;
  		data.news_content = draftToHtml(JSON.parse(data.news_content));
  		console.log('data.news_content === ', data.news_content);
    	const contentBlock = htmlToDraft(data.news_content);
    	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      	const editorState = EditorState.createWithContent(contentState);

      	const fileList = [{
			uid: -1,
			name: data.news_cover + '.png',
			status: 'done',
			url: restUrl.ADDR + 'UpLoadFile/' + data.news_cover + '.png'
	    }];

		this.setState({
			data,
			editorState,
			loading: false
		});
  	});
  }

    handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        this.setState({
		  		loading: true
		  	});
	        let param = {};
	        param.id = this.props.params.id;
	        param.news_title = values.news_title;
	        param.news_brief = values.news_brief;
	        param.news_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
	        param.news_cover = values.news_cover ? (values.news_cover.fileList.map((item, index) => {
	        	return item.response.data.id;
	        }).join(',')) : null;
	        console.log('handleSubmit  param === ', param);
	        
	        ajax.postJSON(saveNewsUrl, JSON.stringify(param), (data) => {
	        	this.setState({
			  		loading: false
			  	});
	        	notification.open({
			        message: '更新新闻成功！',
			        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
			    });
			    this.context.router.push('/frame/news/newsList');
	        });
	      }
	    });
    }

  	onEditorStateChange = (editorState) => {
		console.log(' editorState  getCurrentContent===  ', editorState.getCurrentContent());
		this.setState({
		  editorState,
		});
	}

	uploadImageCallBack = (file) => {
		console.log('uploadImageCallBack   file === ', file);
		return new Promise(
		    (resolve, reject) => {
		        const xhr = new XMLHttpRequest();
		        xhr.open('POST', restUrl.UPLOAD);
		        const data = new FormData();
	  			data.append('file', file);
		        xhr.send(data);
		      
			    xhr.addEventListener('load', () => {
			        const response = JSON.parse(xhr.responseText);
			        response.data.link = restUrl.ADDR + response.data.link;
			        console.log('response == ', response);
			        resolve(response);
			    });
			    xhr.addEventListener('error', () => {
			        const error = JSON.parse(xhr.responseText);
			        reject(error);
			    });
		    },
		);
	}

	handleChange = ({ fileList }) => this.setState({ fileList })

	callback = (key) => {
	  console.log(key);
	}

  render() {
  	let { data, editorState, fileList, loading, submitLoading } = this.state;
  	const { getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <div className="zui-cotent">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>失物招领</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
      	<div className="ibox-title">
            <h5>失物招领</h5>
        </div>
        <div className="ibox-content">
        	<Tabs defaultActiveKey="1" onChange={this.callback}>
			    <TabPane tab="一楼食堂" key="1">
			    	<Spin spinning={loading}>			
			      		<Row>
			      			<Col span={12}>
			      				<ZZEditor />
			      				<Divider></Divider>
			      				<div style={{textAlign: 'center'}}>
						    		<Button type="primary" loading={this.state.submitLoading}>
							        	确认
							        </Button>
							    </div>
			      			</Col>
			      		</Row>
				    </Spin>
			    </TabPane>
			    <TabPane tab="二楼食堂" key="2">
			    	<ZZEditor />
			    </TabPane>
			    <TabPane tab="学生公寓1号" key="3">Content of Tab Pane 3</TabPane>
			    <TabPane tab="学生公寓2号" key="4">Content of Tab Pane 4</TabPane>
			    <TabPane tab="教师公寓" key="5">Content of Tab Pane 5</TabPane>
			</Tabs>
	    </div>
      </div>
    );
  }
}

const WrappedEditNews = Form.create()(EditNews);
EditNews.contextTypes = {  
     router:React.PropTypes.object  
} 

export default WrappedEditNews;
