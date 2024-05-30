import React, { useCallback, useEffect } from "react";
// import { add } from "../../services/curd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: "/mine",
      label: "我的",
      icon: <MailOutlined />,
    },
    {
      key: "/introduce",
      label: "Introduce",
      icon: <MailOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "company/a",
      label: "Company A",
      icon: <MailOutlined />,
      children: [
        {
          key: "g1",
          label: "Business",
          type: "group",
          children: [
            { key: "a1", label: "project 1" },
            { key: "a2", label: "project 2" },
          ],
        },
        {
          key: "g2",
          label: "Customer",
          type: "group",
          children: [
            { key: "a3", label: "project 3" },
            { key: "a4", label: "project 4" },
          ],
        },
      ],
    },
    {
      key: "company/b",
      label: "Company B",
      icon: <AppstoreOutlined />,
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
          ],
        },
      ],
    },

    {
      key: "company/c",
      label: "Company C",
      icon: <SettingOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "grp",
      label: "Group",
      type: "group",
      children: [
        { key: "13", label: "Vue" },
        { key: "14", label: "React" },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = useCallback(
    (e: any) => {
      console.log("click ", e);
      // if (e.key === "mine") {
      // 导航到/mine
      if (e.keyPath.length === 1) {
        navigate(e.key);
      } else {
        navigate(`${e.keyPath[1]}#id=${e.key}`);
        const element = document.getElementById(e.key);
        element?.scrollIntoView({ behavior: "smooth" });
        // navigate(`${e.keyPath[1]}/${e.key}`);
      }
      // }
    },
    [navigate]
  );

  const onSelect = useCallback((e: any) => {
    console.log("select ", e);
  }, []);

  useEffect(() => {
    // add().then((res) => {
    //   console.log(res, "home组件");
    // });
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.menu}>
        <Menu
          theme="light"
          onSelect={onSelect}
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
      <div className={styles.childWrapper}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
