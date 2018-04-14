import React from 'react';
import restUrl from 'RestUrl';
import './zzEditor.less';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ZZEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createEmpty()
		};
	}

	componentWillMount = () => {
		const { editorState } = this.props;
		if(editorState){
			this.setState({editorState});
		}
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

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	}

    render() {
	  	console.log('editor this.props === ', this.props);
	  	const { editorState } = this.state;

	    return (
			<Editor
				localization={{ locale: 'zh' }}
				wrapperClassName="wysiwyg-wrapper"
				editorState={editorState}
				onEditorStateChange={this.onEditorStateChange}
				toolbar={{
				    image: {
				    	previewImage: true,
				        uploadCallback: this.uploadImageCallBack,
				        alt: { present: true, mandatory: false },
				    },
				}}
			/>
	    );
	}
}

export default ZZEditor;
