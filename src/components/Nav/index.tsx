import React, { useMemo } from "react";
import styles from "./index.module.less";
const Nav: React.FC = () => {
  const navList = useMemo(() => {
    return [
      {
        name: "home",
        path: "/",
      },
      {
        name: "production",
        path: "/production",
      },
      {
        name: "designs",
        path: "/designs",
      },
      {
        name: "history",
        path: "/history",
      },
    ];
  }, []);
  return (
    // 添加样式 ul不显示点
    // 添加样式 li不显示点

    <div className={styles.nav}>
      <ul>
        {navList.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Nav;
