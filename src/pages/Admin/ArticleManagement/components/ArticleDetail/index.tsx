import React, { useCallback, useMemo, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import type { ModalProps } from "antd";
import MyEditor from "@/components/wangEditor";
import RichText from "@/components/Prims";
import styles from "./index.module.less";

interface ArticleDetailProps extends ModalProps {
  onClose: () => void;
  detail: any;
}

const ArticleDetail: React.FC<ArticleDetailProps> = (props) => {
  const { onClose, detail, ...resetProps } = props;
  const [editable, setEditable] = useState(false);

  const handleCancel = useCallback(() => {
    setEditable(false);
  }, []);

  const footerRender = useMemo(() => {
    if (editable) {
      return (
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary">Save</Button>
        </Space>
      );
    } else {
      return (
        <Button type="primary" onClick={() => setEditable(true)}>
          Edit
        </Button>
      );
    }
  }, [handleCancel, editable]);

  return (
    <Modal
      onCancel={onClose}
      wrapClassName={styles["article-wrapper"]}
      footer={footerRender}
      width={1200}
      classNames={{ header: styles["article-header"], body: styles["article-body"] }}
      style={{ top: "20px", overflowY: "auto" }}
      title="article detail"
      {...resetProps}
    >
      <Form initialValues={detail}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item labelCol={{ span: 4 }} name="title" label="title">
              {editable ? <Input></Input> : <span>{detail.title}</span>}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item labelCol={{ span: 4 }} label="category">
              {editable ? <Select></Select> : <span></span>}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item labelCol={{ span: 2 }} label="content">
              {editable ? <MyEditor></MyEditor> : <RichText content=""></RichText>}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ArticleDetail;
