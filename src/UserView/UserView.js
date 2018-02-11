import React from 'react';
import propTypes from 'prop-types';
import { Row, Col, Card, Icon, Tooltip } from 'antd';
import { pure } from 'recompose';

import './styles.css';

const layout = {
    xs: 24,
    sm: 12,
    lg: 8,
    className: 'user-view-item'
};

const iconStyle = {
    fontSize: '18px'
};

const UserView = ({ firstName, lastName, email, onClick, onClose }) => (
    <Card hoverable onClick={onClick}>
        <Row type="flex" align="middle">
            <Col span={22}>
                <Row type="flex" gutter={16} align="middle">
                    <Col {...layout}>
                        <div className="margin-bottom">
                            First name
                        </div>
                        <strong>{firstName}</strong>
                    </Col>
                    <Col {...layout}>
                        <div className="margin-bottom">Last name</div>
                        <strong>{lastName}</strong>
                    </Col>
                    <Col {...layout}>
                        <div className="margin-bottom">Email</div>
                        <strong>{email}</strong>
                    </Col>
                </Row>
            </Col>
            <Col span={2} className="center">
                <Tooltip title="Remove user">
                    <Icon
                        style={iconStyle}
                        onClick={(evt) => {
                            evt.stopPropagation();
                            onClose();
                        }} type="close" size="large"
                    />
                </Tooltip>
            </Col>
        </Row>
    </Card>
);

UserView.propTypes = {
    firstName: propTypes.string,
    lastName: propTypes.string,
    email: propTypes.string,
    onClick: propTypes.func,
    onClose: propTypes.func
};

export default pure(UserView);