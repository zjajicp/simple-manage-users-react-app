import React from 'react';
import propTypes from 'prop-types';
import UserForm from '../UserForm/UserForm';
import UserView from '../UserView/UserView';
import { pure } from 'recompose';

import './styles.css';

const getFormValue = (form, fieldName) => {
    return form[fieldName] && form[fieldName].value;
};

const UserList = (props) => {
    return (
        <div className="user-list">
            {!props.users.length && <div className="center">No users added</div>}
            {
                props.users.map(user => (
                    <div key={user.id} className="user-list-item margin-bottom">
                        {
                            user.editing ?
                                <UserForm
                                    formData={user.formData}
                                    onChange={fields => {
                                        props.onUserFormChange(user, fields)
                                    }}
                                    onSubmit={fields => {
                                        props.onUserFormSubmit(user, fields);
                                    }}
                                    onCancel={() => {
                                        props.onUserFormCancel(user)
                                    }}
                                /> :
                                <UserView
                                    onClose={() => {
                                        props.onRemoveUser(user)
                                    }}
                                    firstName={getFormValue(user.formData, 'firstName')}
                                    lastName={getFormValue(user.formData, 'lastName')}
                                    email={getFormValue(user.formData, 'email')}
                                    onClick={() => {
                                        props.onUserViewClick(user);
                                    }}
                                />
                        }
                    </div>
                ))
            }
        </div>
    );
};
UserList.defaultProps = {
    users: []
};
UserList.propTypes = {
    onUserViewClick: propTypes.func.isRequired,
    onRemoveUser: propTypes.func.isRequired,
    onUserFormSubmit: propTypes.func.isRequired,
    onUserFormChange: propTypes.func.isRequired,
    users: propTypes.arrayOf(propTypes.shape({
        formData: propTypes.object,
        editing: propTypes.bool
    }))
};

export default pure(UserList);