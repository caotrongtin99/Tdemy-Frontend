import React from 'react';
import { Button, Modal, Form, Input, Upload, Icon, Spin } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, uploadVideoToCloud, uploading} = this.props;
            const { getFieldDecorator } = form;
            return (
                    <Modal
                        visible={visible}
                        title="Create a chapter"
                        okText="Create"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                    <Spin spinning={uploading}>
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
                                    <input type="file" placeholder="choose video" name="file" onChange={(e) => uploadVideoToCloud(e)} />
                                )}
                            </Form.Item>
                        </Form>
                    </Spin>
                    </Modal>
            );
        }
    },
);

export default CollectionCreateForm;