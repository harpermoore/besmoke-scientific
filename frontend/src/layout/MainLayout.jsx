import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Collapse, Flex, Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { NavLink } from "react-router";



const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, disabled) {
  return {
    key,
    icon,
    disabled,
    label,
  };
}


const items = [
  getItem('Product Overview', '1', <NavLink to="/"><PieChartOutlined /></NavLink>, false),
  getItem('Inventory Reports', '2', <NavLink to="/InventoryReports"><DesktopOutlined /></NavLink>, false),
];


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState('1');



  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div 
          className="demo-logo-vertical"
          style={{display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 8}}
          >
            {collapsed ? <img src='/icon-sm.png' width="20" /> : <img src='/logo-sm.png' width="84%" />}
          </div>
        <Menu 
        theme="dark" s
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