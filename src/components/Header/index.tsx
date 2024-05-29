import React from "react";
import Nav from "../Nav";
import styles from "./index.module.less";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Nav></Nav>
      <div>logo</div>
      <div>avatar</div>
    </div>
  );
};

export default Header;
