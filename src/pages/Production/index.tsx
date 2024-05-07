import styles from "./index.module.less";
import React from "react";
import { Tabs, SideBar } from "antd-mobile";
import FnIcon from "../../components/fnIcon";

const Production: React.FC = () => {
  const tabs = [
    { title: "simple" },
    { title: "个人优势" },

    {
      title: (
        <div style={{ display: "flex" }}>
          <FnIcon name="right" />
          小鹏汽车
        </div>
      ),
    },
    { title: "1111" },
    { title: "222" },
    { title: "333" },
    { title: "444" },
    { title: "掌握技能" },
  ];
  return (
    <div className={styles.production}>
      <SideBar className={styles.SideBar}>
        {tabs.map((tab, index) => {
          return <SideBar.Item title={tab.title} key={index}></SideBar.Item>;
        })}
      </SideBar>
      <Tabs>
        <Tabs.Tab title="项目一" key="fruits">
          项目一
        </Tabs.Tab>
        <Tabs.Tab title="项目二" key="vegetables">
          项目二
        </Tabs.Tab>
        <Tabs.Tab title="项目三" key="animals">
          项目三
        </Tabs.Tab>
        <Tabs.Tab title="项目四" key="animals">
          项目四
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default Production;
