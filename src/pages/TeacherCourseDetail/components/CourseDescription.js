import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../index.css'
import { Button } from 'antd';
class CourseDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
          <div>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <Button type="danger">Save</Button>
          </div>
        );
      }
}

export default CourseDescription;