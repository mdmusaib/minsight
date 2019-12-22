import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
const { Sider } = Layout;

class   Sidebar extends React.Component {

    render() {
        let sidebarList = (
            this.props.sidebarList.map( (element, index) => {
            return (
                <Menu.Item key={index} >
                    <Icon type="user"/>
                    <Link to = {{ pathname: element }} >
                        <span 
                        style = {{ top: '3px',position: 'absolute',left: '54px',fontSize: '12px' }}>
                                {element.toUpperCase()}
                        </span>
                    </Link>
                </Menu.Item> 
            )
        })

        );

        return (
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0 
                    }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} >
                        {sidebarList}
                    </Menu>
                </Sider>
            </Layout>
        )
    }
}

export default Sidebar;