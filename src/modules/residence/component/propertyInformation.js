import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../residence.less';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;
const Option = Select.Option;

const saveNewsUrl = restUrl.ADDR + 'News/saveAPNews';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class PropertyInfomation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount = () => {
  }


  render() {
  	let { editorState, fileList } = this.state;

    return (
      <div className="zui-cotent addNews">
      	<div className="ibox-title">
            <h5>添加新闻</h5>
        </div>
        <div className="ibox-content">
	      	
	    </div>
      </div>
    );
  }
}

PropertyInfomation.contextTypes = {  
     router:React.PropTypes.object  
} 

export default PropertyInfomation;
