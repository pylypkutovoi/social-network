import React from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, NotificationOutlined, MessageOutlined, TeamOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const Navbar: React.FC = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<MessageOutlined />}>
        <Link to="/dialogs">
          Messages
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<TeamOutlined />}>
        <Link to="/users">
          Users
        </Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<NotificationOutlined />} title="Other" >
        <Menu.Item key="4">
          <Link to="/news" >
            News
          </Link></Menu.Item>
        <Menu.Item key="5">
          <Link to="/music">
            Music
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/settings">
            Settings
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default Navbar;