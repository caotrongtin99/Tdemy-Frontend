import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import {connect} from 'react-redux';
import {courseActions} from '../../../actions/courseActions'
import htmlToDraft from 'html-to-draftjs';
import '../index.css'
import { Button } from 'antd';
class CourseDescription extends Component {
    constructor(props) {
        super(props);
        const html = this.props.currentCourse.description || '<div></div>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.state = {
            editorState,
          };
        }
      }

    onEditorStateChange = (editorState) => {

        this.setState({
            editorState,
        });
    };

    onUpdateDescription = () => {
      const {currentCourse} = this.props;
      const value = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
      const course = {
        id: currentCourse.id,
        description: value,
      }
      
      this.props.dispatch(courseActions.updateCourse(course));
    }

    render() {
        const { editorState, editorContents } = this.state;
        console.log("=========editor state --------", editorContents)
        return (
          <div>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              rawContentState={editorContents}
              onEditorStateChange={this.onEditorStateChange}
            />
            <Button type="danger" onClick={this.onUpdateDescription}>Save</Button>
          </div>
        );
      }
}
const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  currentCourse: state.teacherCourse.data.currentCourse,
  alert: state.alert
})
export default connect(mapStateToProps)(CourseDescription);
