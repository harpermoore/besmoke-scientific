import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { NavLink } from "react-router";


const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem('Product Overview', '1', <NavLink to="/"><PieChartOutlined /></NavLink>),
  getItem('Inventory Reports', '2', <NavLink to="/InventoryReports"><DesktopOutlined /></NavLink>),
  getItem('Documents', '3', <FileOutlined />),
];


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState('1');



  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu 
        theme="dark" 
        defaultSelectedKeys={['1']} 
        mode="inline" 
        items={items} 
        selectedKeys={[selectedPage]}
        onClick={item=>setSelectedPage(item.key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 36px' }}>
         < Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Assignment BioXCell ©{new Date().getFullYear()} Created by Harper Moore
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;