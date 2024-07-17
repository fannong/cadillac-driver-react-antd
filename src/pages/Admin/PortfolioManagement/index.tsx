import React, { useCallback, useState } from "react";
import { Button, Card, Col, Form, Image, Input, Row, Space, Upload } from "antd";

import type { UploadFile } from "antd";
import { upload } from "@/services/file";
import styles from "./index.module.less";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

const PortfolioManagement: React.FC = () => {
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  //   const [defaultFileList, setDefaultFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await form.validateFields();
      console.log(res, "sssrrr");
    } catch (error) {
      console.log(error, "error");
    }
  }, [form]);

  // useEffect(() => {
  //   setFileList([
  //     {
  //       uid: "-1",
  //       name: "image.png",
  //       status: "done",
  //       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //     },
  //   ]);
  // }, []);

  const customRequest = useCallback((options: any) => {
    console.log("options", options);
    const { file, onSuccess, onError } = options;
    console.log(options, "customRequest");
    const params = new FormData();
    params.append("file", file);
    upload(params)
      .then((res) => {
        onSuccess(res, file);
      })
      .catch((err) => {
        onError(err, file);
      });
  }, []);

  const handleFileChange = useCallback(
    (fieldKey: number, fileList: any) => {
      // debugger;
      // setFileList(fileList);
      console.log("fieldKey", fieldKey, fileList);
      const portfolios = form.getFieldValue("portfolios");
      const newPortfolios = [...portfolios];
      // 筛选出已经上传成功的图片
      const keys = fileList
        .filter((file: any) => file.status === "done")
        .map((file: any) => file.response.data.key);

      newPortfolios[fieldKey].imageKeys = keys;
      newPortfolios[fieldKey].image = fileList;
      form.setFieldValue("portfolios", newPortfolios);
    },
    [form]
  );

  const onPreview = useCallback(async (file: UploadFile) => {
    console.log("file", file);
    setVisible(true);
  }, []);

  return (
    <div className={styles.addPortfolio} style={{ padding: "20px" }}>
      <Form layout={"horizontal"} labelCol={{ span: 3 }} wrapperCol={{ span: 24 }} form={form}>
        <Form.List name="portfolios">
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {fields.map(({ key: fieldKey, name: fieldName, ...restField }) => (
                <Card
                  size="small"
                  key={fieldKey}
                  title={`Project ${fieldName + 1}`}
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
                    <Col span={24}>
                      <Form.Item
                        label="portfolio name"
                        rules={[{ required: editable }]}
                        name={[fieldName, "project"]}
                      >
                        {editable ? <Input></Input> : <span></span>}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="portfolio desc"
                        rules={[{ required: editable }]}
                        name={[fieldName, "description"]}
                      >
                        {editable ? <Input.TextArea></Input.TextArea> : <span></span>}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="portfolio images"
                        rules={[{ required: false }]}
                        name={[fieldName, "image"]}
                      >
                        {editable ? (
                          <Upload
                            maxCount={10}
                            fileList={form.getFieldValue(["portfolios", fieldName, "image"])}
                            // fileList={fileList}
                            listType="picture-card"
                            // defaultFileList={defaultFileList}
                            accept=".jpg,.jpeg,.png"
                            onChange={({ fileList }) => handleFileChange(fieldKey, fileList)}
                            customRequest={customRequest}
                            onPreview={onPreview}
                          >
                            <UploadOutlined />
                          </Upload>
                        ) : (
                          <Image
                            // width={200}
                            style={{ display: "none" }}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                            preview={{
                              visible,
                              scaleStep: 0.5,
                              src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                              onVisibleChange: (value) => {
                                setVisible(value);
                              },
                            }}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
              {editable ? (
                <Button type="primary" ghost onClick={() => add()} block>
                  + Add Portfolio
                </Button>
              ) : null}
            </div>
          )}
        </Form.List>
      </Form>
      <div className={styles.footer}>
        {editable ? (
          <Space>
            <Button onClick={() => setEditable(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit}>
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

export default PortfolioManagement;
