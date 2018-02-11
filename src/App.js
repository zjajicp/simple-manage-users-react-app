import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.less';
import UserContainer from './UserContainer/UserContainer';
import { Layout } from 'antd';

const contentStyle = {
    padding: '16px',
    background: '#fff'
};

class App extends Component {
    render() {
        return (
            <Layout>
                <Layout.Content style={contentStyle}>
                    <UserContainer />
                </Layout.Content>
            </Layout>
        );
    }
}

export default App;
