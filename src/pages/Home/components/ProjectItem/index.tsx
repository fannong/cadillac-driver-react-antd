import styles from "./index.module.less";
import React from "react";
import type { projectDetailProps } from "../../type";
import { Col, Divider, Row, Tag } from "antd";

const ProjectItem: React.FC<projectDetailProps> = ({ detail }) => {
  const title = (title: string) => {
    return <span className={styles.title}>{title}:</span>;
  };

  return (
    <div className={styles.projectItem} id={detail.id}>
      <Row>
        <Col span={24}>
          {title("project name")}
          <span>{detail.projectName}</span>
        </Col>

        <Col span={24}>
          {title("description")}
          <div className={styles.description}>{detail.projectDesc}</div>
        </Col>
        <Col span={24}>
          {title("work content")}
          {/* <div className={styles.work_content_wrapper}>
            {detail.content.map((item, index) => {
              return (
                <div className={styles.work_content}>
                  <span className={styles.work_content_item_inx}>{index + 1}</span>
                  <span>{item}</span>
                </div>
              );
            })}
          </div> */}
        </Col>
        <Col span={24}>
          {title("used skill")}
          <div>
            {detail.usedSkill?.map((item) => {
              return <Tag>{item} </Tag>;
            })}
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      {/* <div>{detail.name}</div>
      <div>{detail.description}</div>
      <div>{detail.cover}</div> */}
    </div>
  );
};
export default ProjectItem;
