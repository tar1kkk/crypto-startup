import React from 'react';
import {Layout} from "antd";

function AppContent(props) {
    const contentStyle = {
        textAlign: 'center',
        minHeight: 'calc(100vh - 60px)',
        color: '#fff',
        backgroundColor: '#001529',
    };

    return (
        <Layout.Content style={contentStyle}>Content</Layout.Content>
    );
}

export default AppContent;