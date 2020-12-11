import React from 'react';
import { Button, Modal, Form, Input, Upload, Icon } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a chapter"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input chapter title!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Resource" extra="Choose your video">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> Click to upload
                                     </Button>
                                </Upload>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default CollectionCreateForm;