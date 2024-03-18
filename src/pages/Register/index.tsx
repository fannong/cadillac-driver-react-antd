import React, { FC, useCallback } from "react";
import styles from "./index.module.less";
import { Form, Button, Input } from "antd-mobile";
import { register } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { cryptoPassword } from "../../utils";

const Login: FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { loading, run: runRegister } = useRequest(register, {
    manual: true,
    onSuccess: (res) => {
      if (res.data.code === 200) {
        console.log(res.data.data, "res");
        localStorage.setItem("token", res.data.data.token);
        // 导航至首页
        navigate("/");
      } else {
        form.setFields([
          {
            name: "name",
            errors: ["账号已存在"],
          },
        ]);
        console.log(res.data.msg, "res");
      }
    },
  });

  const handleRegister = useCallback(async () => {
    const { name, password, confirmPassword } = await form.getFieldsValue();

    if (!name || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      console.log("两次输入的密码不一致");
      form.setFields([
        {
          name: "confirmPassword",
          errors: ["两次输入的密码不一致"],
        },
      ]);
      return;
    }

    const sha256Password = cryptoPassword(password);

    runRegister(name, sha256Password);
  }, [runRegister, cryptoPassword, form]);

  return (
    <div className={styles.login}>
      <Form
        form={form}
        onFinish={handleRegister}
        footer={
          <Button
            block
            color="primary"
            type="submit"
            loading={loading}
            size="large"
          >
            注册
          </Button>
        }
        layout="horizontal"
      >
        <Form.Item
          rules={[
            { required: true, message: "用户名不能为空" },
            { min: 2, message: "用户名长度不能少于2个字符" },
            { max: 10, message: "用户名长度不能超过10个字符" },
          ]}
          name="name"
          label="用户"
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "密码不能为空" },
            { min: 8, message: "密码长度不能少于8位" },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "密码必须是数字和字母的组合",
            },
          ]}
          name="password"
          label="密码"
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "确认密码不能为空" },
            { min: 8, message: "确认密码长度不能少于8位" },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "确认密码必须是数字和字母的组合",
            },
          ]}
          name="confirmPassword"
          label="确认密码"
        >
          <Input type="password" placeholder="请再次输入密码" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
