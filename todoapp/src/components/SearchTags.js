/**
 * Search bar for tags
 */

import React, { useState } from "react";
import { Row, Col, Button, Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchTags = ({ onSubmit }) => {
  const [inputText, setInputText] = useState("");
  const [form] = Form.useForm();

  // handles the change in text
  // then we can send the inputText as data to the next desired page
  const inputHandler = (input) => {
    setInputText(input);
  };

  /**
   * Search function for the search bar. Will run when button is pressed.
   */
  const onSearch = () => {
    onSubmit({
      tag: form.getFieldValue("tag"),
    });
    console.log("we have searched something");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onSearch}
      layout="horizontal"
      className="search-box-tag"
    >
      <Row gutter={12}>
        <Col>
          {/* the search bar */}
          <Form.Item
            name="tag"
            rules={[{ required: true, message: "Please input a Tag!" }]}
          >
            <Input placeholder="Search for a Tag..." onChange={inputHandler} />
          </Form.Item>
        </Col>
        <Col>
          {/* the button for the search bar */}
          <Button type="primary" htmlType="submit" block>
            <SearchOutlined shape="circle" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchTags;
