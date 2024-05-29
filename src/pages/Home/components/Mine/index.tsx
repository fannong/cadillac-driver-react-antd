import React from "react";
import styles from "./index.module.less";
import { Image } from "antd";

const Mine: React.FC = () => {
  return (
    <div className={styles.mine}>
      <div className={styles.avatar}>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
    </div>
  );
};
export default Mine;
