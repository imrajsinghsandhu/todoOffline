import React, {useState} from "react";
import {Form, Row, Col, Button, Input} from 'antd';
import {PlusCircleFilled, ArrowRightOutlined, SearchOutlined} from '@ant-design/icons';

const TodoForm = ({onFormSubmit}) => {
    // React hook
    const [form] = Form.useForm();

    const onFinish = () => {
        onFormSubmit({
            title: form.getFieldValue('title'),
            done: false,
            tag: form.getFieldValue('tag'),
        });

        console.log(form.getFieldValue('title'));
        console.log(form.getFieldValue("tag"));
        // resets the input field by default
        form.resetFields();
    }

    return (
        <Col>

        <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        className="todo-form"
        >
            <Row
            gutter={20}
            >
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item
                        name={'title'}
                        rules={[{ required: true, message: "This field is required"}]}
                        >
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>
                    <Form.Item
                        name={'tag'}
                        rules={[{ required: true, message: "This field is required"}]}
                        >
                        <Input placeholder="Your tag?" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled/>
                    </Button>
                </Col>
            </Row>
        </Form> 
    </Col>
    )
}

export default TodoForm;
