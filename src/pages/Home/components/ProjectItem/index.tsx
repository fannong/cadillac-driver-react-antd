import React from "react";
import type { projectDetailProps } from "../../type";
import styles from "./index.module.less";

const ProjectItem: React.FC<projectDetailProps> = ({ detail }) => {
  return (
    <div className={styles.projectItem} id={detail.id}>
      <div>{detail.name}</div>
      <div>{detail.description}</div>
      <div>{detail.cover}</div>
    </div>
  );
};
export default ProjectItem;
