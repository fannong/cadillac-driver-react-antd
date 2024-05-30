import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import dayjs from "dayjs";

const AddProject: React.FC = () => {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState<boolean>(false);

  const userOptions = [
    { value: "p5", label: "前端开发工程师" },
    { value: "p6", label: "高级前端开发工程师" },
    { value: "p6a", label: "资深前端开发工程师" },
  ];

  const initValue = {
    items: [
      {
        company: "22",
        position: ["p5"],
        appointmentTime: [dayjs("2024-05-13"), dayjs("2024-05-14")],
        Projects: [
          {
            projectName: "123",
            usedSkill: ["Vue"],
            projectDesc: "钱少事多离家远",
            jobs: "1、切图；2、打旭比",
          },
        ],
      },
    ],
  };
  
  const skillOptionList = [
    "Vue",
    "React",
    "Angular",
    "Webpack",
    "NodeJs",
    "TypeScript",
    "ElementJs",
    "Antd",
    "Antd Mobile",
  ].map((item) => {
    return { label: item, value: item };
  });

  return (
    <div className={styles.addProject}>
      <Form
        disabled={!editable}
        layout={"vertical"}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name="dynamic_form_complex"
        autoComplete="off"
        initialValues={initValue}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {fields.map((field) => (
                <Card
                  size="small"
                  style={{ border: "1px solid lightgray" }}
                  title={`Company ${field.name + 1}`}
                  key={field.key}
                  extra={
                    editable && (
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    )
                  }
                >
                  <Row gutter={[12, 8]}>
                    <Col span={8}>
                      <Form.Item label="Company Name" name={[field.name, "company"]}>
                        {/* {editable ? ( */}
                        <Input />
                        {/* ) : (
                          <span>{initValue.items[field.name].company}</span>
                        )} */}
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item label="Position" name={[field.name, "position"]}>
                        <Select mode="tags" options={userOptions} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={[field.name, "appointmentTime"]} label="Appointment Time">
                        <DatePicker.RangePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Col span={24}> */}
                  {/* Nest Form.List */}
                  <Form.Item label="Project List">
                    <Form.List name={[field.name, "Projects"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Card key={subField.key}>
                              <Row gutter={[12, 8]}>
                                <Col span={8}>
                                  <Form.Item
                                    label="Project Name"
                                    name={[subField.name, "projectName"]}
                                  >
                                    <Input placeholder="Project Name" />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item label="Used Skill" name={[subField.name, "usedSkill"]}>
                                    <Select
                                      allowClear
                                      mode="tags"
                                      options={skillOptionList}
                                      placeholder="Used Skill"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item
                                    // noStyle
                                    label="Project Description"
                                    name={[subField.name, "projectDesc"]}
                                  >
                                    <Input.TextArea placeholder="Project Description" />
                                  </Form.Item>
                                </Col>
                                <Col span={24}>
                                  <Form.Item
                                    label="Job Responsibility"
                                    name={[subField.name, "jobs"]}
                                  >
                                    <Input.TextArea placeholder="Job Responsibility" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              {editable ? (
                                <CloseOutlined
                                  style={{ position: "absolute", top: "10px", right: "10px" }}
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              ) : null}
                            </Card>
                          ))}
                          {editable ? (
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Project
                            </Button>
                          ) : null}
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                  {/* </Col> */}
                </Card>
              ))}
              {editable ? (
                <Button type="primary" ghost onClick={() => add()} block>
                  + Add Company
                </Button>
              ) : null}
            </div>
          )}
        </Form.List>

        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
      </Form>
      <div className={styles.footer}>
        {editable ? (
          <Space>
            <Button onClick={() => setEditable(false)}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" onClick={() => setEditable(true)}>
              Edit
            </Button>
          </Space>
        )}
      </div>
    </div>
  );
};

export default AddProject;
