import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Button, Layout as LayoutAtd, Menu, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { navConfig } from "./router";
import { LogoutOutlined } from "@ant-design/icons";
import AuthContext from "./hooks/useAuth";
import { MAP_TITLE_PAGE, ROUTE } from "./constants";
import { useSessionStorage } from "./hooks/useSessionStorage";
const { Header, Sider, Content } = LayoutAtd;

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const path = useLocation().pathname;
  const accessToken = useSessionStorage("token", null);
  useEffect(() => {
    if (!accessToken?.[0]) {
      handleGotoLogin();
    } else {
      if (path === ROUTE.MAIN) {
        navigate(ROUTE.LIST_TEMPLATE);
      }
    }
  }, [accessToken]);

  const handleGotoLogin = () => {
    navigate(ROUTE.LOGIN);
  };
  const handleLogout = () => {
    logout(handleGotoLogin);
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      {accessToken?.[0] && (
        <LayoutAtd style={{ minHeight: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
              {navConfig.map((item) => (
                <Menu.Item key={item.path}>
                  <item.icon />
                  <span>{item.title}</span>
                  <Link to={item.path} />
                </Menu.Item>
              ))}
              <Menu.Item onClick={handleLogout}>
                <LogoutOutlined />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <LayoutAtd>
            <Header>
              <Space>
                <Button
                  type="default"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  size="middle"
                ></Button>
                {path === ROUTE.DETAIL_TEMPALTE && (
                  <Button
                    type="default"
                    icon={<LeftOutlined />}
                    onClick={() => navigate(ROUTE.LIST_TEMPLATE)}
                    size="middle"
                  ></Button>
                )}

                <span style={{ color: "#d9d9d9" }}>
                  &nbsp;{MAP_TITLE_PAGE[path || ""]}
                </span>
              </Space>
            </Header>
            <Content>
              <Outlet />
            </Content>
          </LayoutAtd>
        </LayoutAtd>
      )}
    </div>
  );
};

export default Layout;
