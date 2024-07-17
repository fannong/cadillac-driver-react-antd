import React, { useCallback } from "react";
import styles from "./index.module.less";
import { Outlet, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  // type MenuItem = Required<MenuProps>["items"][number];
  // function getItem(
  //   label: React.ReactNode,
  //   key: React.Key,
  //   icon?: React.ReactNode,
  //   children?: MenuItem[],
  //   type?: "group"
  // ): MenuItem {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //     type,
  //   } as MenuItem;
  // }

  const items: MenuProps["items"] = [
    { label: "Companies", key: "addProject", icon: null },
    { label: "Articles", key: "article", icon: null },
    { label: "Portfolio", key: "portfolio", icon: null },
    // getItem("Navigation One", "sub1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")]),
    // getItem("Navigation Two", "sub2", null, [getItem("Option 5", "5"), getItem("Option 6", "6")]),
  ];

  const onClick: MenuProps["onClick"] = useCallback(
    (e: any) => {
      switch (e.key) {
        case "addProject":
          navigate("/admin/addProject");
          break;
        case "article":
          navigate("/admin/article");
          break;
        case "portfolio":
          navigate("/admin/portfolio");
          break;
        case "2":
          navigate("/admin/page2");
          break;
      }
    },
    [navigate]
  );

  return (
    <div className={styles.admin}>
      <div className={styles.menu}>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["addProject"]}
          // defaultOpenKeys={["addProject"]}
          mode="inline"
          items={items}
        />
      </div>
      <div className={styles.adminChild}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
