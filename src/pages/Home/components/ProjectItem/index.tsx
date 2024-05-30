import styles from "./index.module.less";
import React from "react";
import type { projectDetailProps } from "../../type";
import { Col, Divider, Row, Tag } from "antd";

const ProjectItem: React.FC<projectDetailProps> = ({ index, detail }) => {
  const title = (title: string) => {
    return <span className={styles.title}>{title}:</span>;
  };

  return (
    <div className={styles.projectItem} id={detail.id}>
      {index === 0 ? (
        <Row>
          <Col span={8}>
            <span>work Time: 2020-now</span>
          </Col>
          <Col span={8}>
            <span>job: front-end engineer</span>
          </Col>
        </Row>
      ) : null}
      {index === 0 ? <Divider /> : null}

      <Row>
        <Col span={24}>
          {title("project name")}
          <span>{detail.name}</span>
        </Col>
        {/* <Col span={8}>
          {title("title")}
          <span>{detail.name}</span>
        </Col> */}
        <Col span={24}>
          {title("description")}
          <div className={styles.description}>{detail.description}</div>
        </Col>
        <Col span={24}>
          {title("work content")}
          <div className={styles.work_content_wrapper}>
            {detail.content.map((item, index) => {
              return (
                <div className={styles.work_content}>
                  <span className={styles.work_content_item_inx}>{index + 1}、</span>
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={24}>
          {title("used skill")}
          <div>
            {detail.skill?.map((item) => {
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
