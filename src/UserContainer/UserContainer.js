import React from 'react';
import UserList from '../userList/UserList';
import { Button, Row, Col, message, Tooltip } from 'antd';
import './styles.css';

const notify = description => {
    message.success(description);
};

export default class UserContainer extends React.Component {
    state = {
        users: []
    };

    handleAddUser = () => {
        this.setState({
            users: this.state.users.concat({
                formData: undefined,
                editing: true,
                saved: false,
                id: (new Date()).valueOf()
            })
        });
    };

    handleUserSave = (user) => {
        this.setState({
            users: this.state.users.map(item => item.id === user.id ? ({
                ...item,
                saved: true,
                editing: false
            }) : item)
        }, () => {
            notify(user.saved ? 'User edited' : 'New user added');
        });
    };

    handleUserFormCancel = (user) => {
        const newUsers = user.saved ?
            this.state.users.map(item => item.id === user.id ? ({
                id: item.id,
                saved: item.saved,
                formData: item.originalForm,
                editing: false
            }) : item) :
            this.state.users.filter(item => item.id !== user.id);

        this.setState({
            users: newUsers
        });
    };

    alreadyExists = (email) =>
        !!this.state.users.find(user => user.formData && user.formData.email && user.formData.email.value === email);

    handleUserFormChange = (user, fields) => {
        this.setState({
            users: this.state.users.map(item => item.id === user.id ? ({
                ...item,
                formData: {
                    ...item.formData,
                    ...(fields.email ? ({
                        email: {
                            ...fields.email,
                            errors: this.alreadyExists(fields.email.value) ? [{
                                field: 'email',
                                message: 'User already exists with this email'
                            }] : fields.email.errors
                        }

                    }) : fields),
                }
            }) : item)
        });
    };

    handleUserViewClick = (user) => {
        this.setState({
            users: this.state.users.map(item => item.id === user.id ? ({
                ...item,
                editing: true,
                originalForm: item.formData
            }) : item)
        });
    };

    handleUserRemove = (user) => {
        this.setState({
            users: this.state.users.filter(item => item.id !== user.id)
        }, () => {
            notify('User removed');
        });
    };

    render() {
        return (
            <React.Fragment>
                <Row type="flex" justify="end" className="add-button-row">
                    <Col span={24} className="align-right">
                        <Tooltip placement="bottom" title="Click to add new user">
                            <Button
                                className="add-button"
                                size="large"
                                type="primary"
                                onClick={this.handleAddUser}
                            >
                                Add user
                            </Button>

                        </Tooltip>
                    </Col>
                </Row>
                <Row className="margin-top">
                    <UserList
                        onRemoveUser={this.handleUserRemove}
                        onUserViewClick={this.handleUserViewClick}
                        onUserFormChange={this.handleUserFormChange}
                        onUserFormCancel={this.handleUserFormCancel}
                        onUserFormSubmit={this.handleUserSave}
                        users={this.state.users}
                    />
                </Row>
            </React.Fragment>
        );
    }
}