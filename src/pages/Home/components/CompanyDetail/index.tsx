import styles from "./index.module.less";
import React, { useMemo } from "react";
import ProjectItem from "../ProjectItem";
import type { projectDetailType } from "../../type";

const CompanyDetail: React.FC = () => {
  const projectList: projectDetailType[] = useMemo(() => {
    return [
      {
        id: "a1",
        time: "2021-09-01",
        name: "project1",
        description:
          "The engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problems",
        cover: "cover1",
        content: ["do something", "do some other thing"],
        skill: ["Vue", "Webpack", "Craco"],
      },
      {
        id: "a2",
        time: "2021-09-01",
        name: "project2",
        description: "description1",
        cover: "cover1",
        content: ["do something", "do some other thing"],
        skill: ["Vue", "Webpack", "Craco"],
      },
      {
        id: "a3",
        time: "2021-09-01",
        name: "project3",
        description: "description1",
        cover: "cover1",
        content: ["do something", "do some other thing"],
        skill: ["Vue", "Webpack", "Craco"],
      },
      {
        id: "a4",
        time: "2021-09-01",
        name: "project4",
        description: "description1",
        cover: "cover1",
        content: ["do something", "do some other thing"],
        skill: ["Vue", "Webpack", "Craco"],
      },
    ];
  }, []);
  return (
    <div className={styles.companyDetail}>
      {projectList.map((item, index) => {
        return <ProjectItem index={index} detail={item} />;
      })}
    </div>
  );
};

export default CompanyDetail;
