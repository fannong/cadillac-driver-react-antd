import React, { FC, useCallback } from "react";
import styles from "./index.module.less";
import { Form, Button, Input } from "antd-mobile";
import { login } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { cryptoPassword } from "../../utils";

const Login: FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleLogin = useCallback(async () => {
    const { name, password } = await form.getFieldsValue();
    if (!name || !password) return;
    const sha256Password = cryptoPassword(password);
    login(name, sha256Password).then((res) => {
      if (res.code === 200) {
        console.log(res.data, "res");
        localStorage.setItem("token", res.data.token);
        // 导航至首页
        const redirectUrl = localStorage.getItem("redirectUrl");
        if (redirectUrl) {
          navigate(redirectUrl);
          // 清除存储的 URL
          localStorage.removeItem("redirectUrl");
        } else {
          // 如果没有存储的 URL，导航至首页
          navigate("/");
        }
      } else {
        form.setFields([
          {
            name: "name",
            errors: [res.data.msg],
          },
        ]);
        console.log(res.data.msg, "res");
      }
    });

  }, [navigate, form]);

  return (
    <div className={styles.login}>
      <Form
        form={form}
        footer={
          <Button
            block
            color="primary"
            type="submit"
            size="large"
            onClick={handleLogin}
          >
            登录
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
      </Form>
    </div>
  );
};

export default Login;
