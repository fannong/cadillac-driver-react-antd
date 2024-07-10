import styles from "./index.module.less";
import React, { useEffect,  useState } from "react";
import ProjectItem from "../ProjectItem";

import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getCompanyDetailById } from "@/services/company";
import { Col, Divider, Row } from "antd";
import type { CompanyDetailType } from "@/services/company";

const CompanyDetail: React.FC = () => {
  const [companyDetail, setCompanyDetail] = useState<CompanyDetailType | undefined>();
  const { id } = useParams();
  const { run } = useRequest(getCompanyDetailById, {
    manual: true,
    onSuccess: (res) => {
      console.log(res, "123132131232");

      setCompanyDetail(res.data);
    },
  });
  
  useEffect(() => {
    // console.log(id, "CompanyDetail");
    if (!id) {
      return;
    }
    run(id);
    // 获取当前路由参数
  }, [run, id]);


  // const projectList: projectDetailType[] = useMemo(() => {
  //   return [
  //     {
  //       id: "a1",
  //       time: "2021-09-01",
  //       name: "project1",
  //       description:
  //         "The engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problemsThe engineer and his son held frequent consultations concerning technical problems",
  //       cover: "cover1",
  //       content: ["do something", "do some other thing"],
  //       skill: ["Vue", "Webpack", "Craco"],
  //     },
  //     {
  //       id: "a2",
  //       time: "2021-09-01",
  //       name: "project2",
  //       description: "description1",
  //       cover: "cover1",
  //       content: ["do something", "do some other thing"],
  //       skill: ["Vue", "Webpack", "Craco"],
  //     },
  //     {
  //       id: "a3",
  //       time: "2021-09-01",
  //       name: "project3",
  //       description: "description1",
  //       cover: "cover1",
  //       content: ["do something", "do some other thing"],
  //       skill: ["Vue", "Webpack", "Craco"],
  //     },
  //     {
  //       id: "a4",
  //       time: "2021-09-01",
  //       name: "project4",
  //       description: "description1",
  //       cover: "cover1",
  //       content: ["do something", "do some other thing"],
  //       skill: ["Vue", "Webpack", "Craco"],
  //     },
  //   ];
  // }, []);
  return (
    <div className={styles.companyDetail}>
      <Row>
        <Col span={8}>
          <span>{`${companyDetail?.appointmentTime[0]}至${
            companyDetail?.appointmentTime![1]
          }`}</span>
        </Col>
        <Col span={8}>
          <span>{companyDetail?.position}</span>
        </Col>
      </Row>
      <Divider></Divider>
      {companyDetail && companyDetail?.projects
        ? companyDetail?.projects?.map((item: any, index: number) => {
            return <ProjectItem index={index} detail={item} />;
          })
        : null}
    </div>
  );
};

export default CompanyDetail;
