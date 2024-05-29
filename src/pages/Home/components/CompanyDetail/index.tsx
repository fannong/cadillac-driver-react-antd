import React, { useMemo } from "react";
import ProjectItem from "../ProjectItem";
import type { projectDetailType } from "../../type";

const CompanyDetail: React.FC = () => {
  const projectList: projectDetailType[] = useMemo(() => {
    return [
      {
        id: "a1",
        name: "project1",
        description: "description1",
        cover: "cover1",
      },
      {
        id: "a2",
        name: "project2",
        description: "description1",
        cover: "cover1",
      },
      {
        id: "a3",
        name: "project3",
        description: "description1",
        cover: "cover1",
      },
      {
        id: "a4",
        name: "project4",
        description: "description1",
        cover: "cover1",
      },
    ];
  }, []);
  return (
    <div style={{ height: "400px", background: "lightgray", overflow: "scroll" }}>
      {/* <div id="a1" style={{ height: "400px" }}> */}
      {projectList.map((item) => {
        return <ProjectItem detail={item} />;
      })}
      {/* </div> */}
    </div>
  );
};

export default CompanyDetail;
