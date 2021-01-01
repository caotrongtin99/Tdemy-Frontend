import React from 'react';
import { Comment, Icon, Form, Button, List, Input, Rate } from 'antd';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} actions={[<Rate character={<Icon type="heart" />} value={props.rating} allowHalf />]} />}
  />
);

export default CommentList;