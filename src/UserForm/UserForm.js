import React from 'react';
import { Form, Row, Input, Button, Col, Card } from 'antd';
import { pure, compose } from 'recompose';

import './styles.css';


const getSubmitHandler = (props) => (evt) => {
    evt.preventDefault();
    props.form.validateFieldsAndScroll((err, fields) => {
        if (!err) {
            props.onSubmit(fields);
        }
    });
};

const layout = {
    xs: 24,
    sm: 24,
    lg: 8
};

const UserForm = ({ form, onSubmit, onCancel }) => (
    <Card>
        <Form className="user-form" layout="inline" onSubmit={getSubmitHandler({ onSubmit, form })}>
            <Row gutter={16} type="flex">
                <Col {...layout}>
                    <Form.Item label="First name">
                        {form.getFieldDecorator('firstName', {
                            rules: [{
                                required: true,
                                type: 'string',
                                message: 'First name is required'
                            }]
                        })(<Input placeholder="eg. James" />)}
                    </Form.Item>
                </Col>

                <Col {...layout}>
                    <Form.Item label="Last name">
                        {form.getFieldDecorator('lastName', {
                            rules: [{
                                required: true,
                                type: 'string',
                                message: 'Last name is required'
                            }]
                        })(<Input placeholder="eg. Bond" />)}
                    </Form.Item>

                </Col>

                <Col {...layout}>
                    <Form.Item label="email">
                        {form.getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                type: 'email',
                                message: 'Not valid email'
                            }]
                        })(<Input placeholder="eg. jamesbond@gmail.com" />)}
                    </Form.Item>
                </Col>
            </Row>

            <Row type="flex" justify="end" gutter={16} className="margin-top">
                <Col>
                    <Button size="large" type="primary" htmlType="submit">Save</Button>
                </Col>

                <Col>
                    <Button size="large" onClick={onCancel}>Cancel</Button>
                </Col>
            </Row>

        </Form>
    </Card>
);

export default compose(
    Form.create({
        onFieldsChange(props, fields) {
            props.onChange(fields)
        },
        mapPropsToFields(props) {
            const formData = props.formData || {};
            return {
                firstName: Form.createFormField(formData.firstName),
                lastName: Form.createFormField(formData.lastName),
                email: Form.createFormField(formData.email)
            };
        }
    }),
    pure
)(UserForm)
