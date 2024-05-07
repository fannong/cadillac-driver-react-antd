import React, { useCallback } from "react";
import styles from "./index.module.less";

import { BrowserRouter as Router, Outlet, useNavigate, Routes, Route } from "react-router-dom";

import type { MenuProps } from "antd";
import { Menu, Table } from "antd";
const Admin: React.FC = () => {
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    { label: "单独一级", key: "sing1", icon: null },
    getItem("Navigation One", "sub1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")]),

    getItem("Navigation Two", "sub2", null, [getItem("Option 5", "5"), getItem("Option 6", "6")]),
  ];

  const onClick: MenuProps["onClick"] = useCallback((e: any) => {
    console.log("click", e);
    switch (e.key) {
      case "sing1":
        navigate("/admin/sing1");
        break;
      case "1":
        navigate("/admin/page1");
        break;
      case "2":
        navigate("/admin/page2");
        break;
    }
  }, []);

  return (
    <div className={styles.admin}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <Outlet />
    </div>
  );
};

export default Admin;
