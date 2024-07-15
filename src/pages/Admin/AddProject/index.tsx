import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import { createCompany, getCompanyList } from "@/services/company";
// import type { UploadFile } from "antd";
import { upload } from "@/services/file";
import MyEditor from "@/components/wangEditor";

const AddProject: React.FC = () => {
  const [form] = Form.useForm();

  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [editable, setEditable] = useState<boolean>(false);
  const { loading, run: runSubmit } = useRequest(createCompany, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
      message.success("更新成功");
      setEditable(false);
    },
    onError: (err) => {
      console.log(err);
      message.error(err.message);
    },
  });

  const { data: companyList } = useRequest(getCompanyList, {
    onSuccess: (res) => {
      const formattedRes = res.data.map((item: any) => {
        return {
          ...item,
          appointmentTime: item.appointmentTime?.map((date: string) => dayjs(date)),
        };
      });
      form.setFieldsValue({ companies: formattedRes });
    },
  });

  useEffect(() => {
    console.log(companyList, "ccc");
  }, [companyList]);

  const handleSubmit = useCallback(async () => {
    // 必须使用try catch包裹，否则页面会报错
    try {
      const values = await form.validateFields();
      const companies = values.companies;
      console.log(values);
      const newItems = JSON.parse(JSON.stringify(companies));
      newItems.forEach((item: any) => {
        item.appointmentTime = item.appointmentTime?.map((time: any) => {
          return dayjs(time).format("YYYY-MM-DD");
        });
      });
      runSubmit(newItems);
    } catch (err) {}
  }, [form, runSubmit]);

  const userOptions = [
    { value: "p5", label: "p5" },
    { value: "p6", label: "p6" },
    { value: "p6a", label: "p6a" },
  ];
  const handleFinish = useCallback((values: any) => {
    console.log(values, "values");
  }, []);

  const handleBeforeUpload = useCallback((file: any) => {
    console.log(file, "handleBeforeUpload");
  }, []);

  const handleRemove = useCallback((file: any) => {
    console.log(file, "handleRemove");
  }, []);

  const handleUploadChange = useCallback((info: any) => {
    // console.log(info, "handleUploadChange");
    // setFileList(info.fileList);
    // if (info.fileList.length > 0) {
    //   const params = new FormData();
    //   params.append("file", info.file.originFileObj);
    //   upload(params);
    // } else {
    // }
  }, []);

  const customRequest = useCallback(
    (options: any, key: number) => {
      const { file, onSuccess, onError } = options;
      console.log(options, "customRequest");
      const params = new FormData();
      params.append("file", file);
      upload(params)
        .then((res) => {
          onSuccess(res, file);
          const companies = form.getFieldValue("companies");
          const newCompanies = [...companies];
          // const projectIndex = newCompanies.findIndex((item: any) => item.key === key);
          newCompanies[key]["icon"] = res.data.key;
          form.setFieldsValue({
            companies: newCompanies,
          });
        })
        .catch((err) => {
          onError(err, file);
        });
      // setFileList(options);
    },
    [form]
  );

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
        scrollToFirstError
        onFinish={handleFinish}
        disabled={!editable}
        layout={"vertical"}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name="dynamic_form_complex"
        initialValues={{ companied: companyList }}
      >
        <Form.List
          rules={[
            {
              validator: (rule, items) => {
                if (!items) {
                  return Promise.reject(new Error("Company list is empty"));
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
          name="companies"
        >
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {/* {JSON.stringify(errors)} */}
              {fields.map(({ name: fieldName, key: fieldKey, ...resetFieldProps }) => (
                <Card
                  size="small"
                  style={{ border: "1px solid lightgray" }}
                  title={`Company ${fieldName + 1}`}
                  key={fieldKey}
                  extra={
                    editable && (
                      <CloseOutlined
                        onClick={() => {
                          remove(fieldName);
                        }}
                      />
                    )
                  }
                >
                  <Row gutter={[12, 8]}>
                    <Col span={8}>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.reject(new Error("Missing company name"));
                              } else {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                        label="Company Name"
                        name={[fieldName, "companyName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            validator: (_, value) => {
                              if (!value || !value.length) {
                                return Promise.reject(new Error("can not be empty"));
                              } else {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                        label="Position"
                        name={[fieldName, "position"]}
                      >
                        <Select allowClear options={userOptions} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            validator: (_, value) => {
                              if (!value || !value.length) {
                                return Promise.reject(new Error("can not be empty"));
                              } else {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                        name={[fieldName, "appointmentTime"]}
                        label="Appointment Time"
                      >
                        <DatePicker.RangePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        label="Company Icon"
                        name={[fieldName, "icon"]}
                        rules={[
                          {
                            required: true,
                            validator: (_, value) => {
                              console.log(value, "Company Icon");
                              if (!value) {
                                return Promise.reject(new Error("can not be empty"));
                              } else {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                      >
                        <Upload
                          maxCount={1}
                          listType="picture-card"
                          defaultFileList={
                            form.getFieldValue(["companies", fieldName, "icon"])
                              ? [
                                  {
                                    uid: "-1",
                                    name: "image.png",
                                    status: "done",
                                    url: form.getFieldValue(["companies", fieldName, "icon"]),
                                  },
                                ]
                              : []
                          }
                          accept=".jpg,.jpeg,.png"
                          customRequest={(options) => customRequest(options, fieldKey)}
                          onChange={handleUploadChange}
                          onRemove={handleRemove}
                          // fileList={fileList}
                          beforeUpload={handleBeforeUpload}
                        >
                          <UploadOutlined />
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Col span={24}> */}
                  {/* Nest Form.List */}
                  <Form.Item label="Project List">
                    <Form.List name={[fieldName, "projects"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map(({name: subFieldName, key: subFieldKey}) => (
                            <Card key={subFieldKey}>
                              <Row gutter={[12, 8]}>
                                <Col span={8}>
                                  <Form.Item
                                    validateTrigger={["onChange", "onBlur"]}
                                    // rules={[{ required: true }]}
                                    label="Project Name"
                                    name={[subFieldName, "projectName"]}
                                  >
                                    <Input placeholder="Project Name" />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item label="Used Skill" name={[subFieldName, "usedSkill"]}>
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
                                    name={[subFieldName, "projectDesc"]}
                                  >
                                    <Input.TextArea placeholder="Project Description" />
                                  </Form.Item>
                                </Col>
                                <Col span={24}>
                                  <Form.Item
                                    label="Job Responsibility"
                                    name={[subFieldName, "jobDesc"]}
                                  >
                                    {editable ? (
                                      <MyEditor></MyEditor>
                                    ) : (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: form.getFieldValue([
                                            "companies",
                                            fieldName,
                                            "projects",
                                            subFieldName,
                                            "jobDesc",
                                          ]),
                                        }}
                                      ></div>
                                    )}
                                  </Form.Item>
                                </Col>
                              </Row>

                              {editable ? (
                                <CloseOutlined
                                  style={{ position: "absolute", top: "10px", right: "10px" }}
                                  onClick={() => {
                                    subOpt.remove(subFieldName);
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
                    {/* <Form.ErrorList errors={errors} /> */}
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
      <div></div>
      <div className={styles.footer}>
        {editable ? (
          <Space>
            <Button onClick={() => setEditable(false)}>Cancel</Button>
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              Submit
            </Button>
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
