import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, Form, Input, Space, Table } from "antd";
import type { TableProps } from "antd";
import styles from "./index.module.less";
import ArticleDetail from "./components/ArticleDetail";

interface RecordType {
  title: string;
  category: string;
}

const ArticleManagement: React.FC = () => {
  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  //   const [action, setAction] = useState<"view" | "edit">("view");
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setDataSource([
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
      { title: "title", category: "category" },
    ]);
  }, []);

  const handleClickView = useCallback(() => {
    // setAction("view");
    setModalVisible(true);
  }, []);
  //   const handleClickEdit = useCallback(() => {
  //     // setAction("edit");
  //   }, []);
  const handleClickDelete = useCallback(() => {}, []);

  const handleFinish = (values: any) => {
    // onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    // onReset();
  };

  const columns: TableProps<RecordType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "category",
      //   width
      dataIndex: "category",
    },
    {
      title: "action",
      fixed: "right",
      //   width: 180,
      render: (text: string, record: any) => {
        return (
          <Space>
            <Button type="link" onClick={handleClickView}>
              view
            </Button>
            {/* <Button type="link" onClick={handleClickEdit}>
              edit
            </Button> */}
            <Button type="link" onClick={handleClickDelete}>
              delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className={styles.articleWrapper}>
      <div className={styles.articleForm}>
        <Form className={styles.articleForm} form={form} onFinish={handleFinish}>
          <Form.Item className={styles.formItem} label="title" name="title">
            <Input />
          </Form.Item>
          <Form.Item className={styles.formItem} label="title" name="title">
            <Input />
          </Form.Item>
          <Form.Item className={styles.formItem} label="title" name="title">
            <Input />
          </Form.Item>

          <div
            style={{ marginBottom: "24px" }}
            className={`${styles.formAction} ${styles.formItem}`}
          >
            <Space>
              <Button onClick={handleReset}>Reset</Button>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Space>
          </div>
        </Form>
      </div>
      <Divider></Divider>
      <div className={styles.tableAction}>
        <Button type="primary">Add Article</Button>
      </div>
      <Table
        scroll={{ y: 360 }}
        className={styles.articleTable}
        dataSource={dataSource}
        columns={columns}
      ></Table>
      {modalVisible ? (
        <ArticleDetail
          maskClosable={false}
          onClose={() => setModalVisible(false)}
          detail={{}}
          open={modalVisible}
        ></ArticleDetail>
      ) : null}
    </div>
  );
};

export default ArticleManagement;
