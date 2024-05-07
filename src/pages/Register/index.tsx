import React, { useState, FC, useCallback, useEffect } from "react";
import styles from "./index.module.less";
import { Toast, Form, Button, Input } from "antd-mobile";
import { validateEmail, register } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { cryptoPassword } from "../../utils";

const Login: FC = () => {
  const navigate = useNavigate();
  const sendAgainGap = 10;
  const [form] = Form.useForm();

  // 倒计时
  const countDownInterval = useCallback((timerId: any) => {
    setCountdown((pre) => {
      if (pre === 0) {
        clearInterval(timerId);
        // localStorage.removeItem("sendTime");
        return 0;
      }
      return pre - 1;
    });
  }, []);

  // 处理刷新页面后，如果验证码发送时间未超过间隔规定，继续倒计时
  useEffect(() => {
    const sendTime = localStorage.getItem("sendTime");
    let timerId: any;
    if (sendTime) {
      const now = Date.now();
      const diff = Math.floor((now - Number(sendTime)) / 1000);
      if (diff < sendAgainGap) {
        setCountdown(sendAgainGap - diff);
      }
      timerId = setInterval(() => {
        countDownInterval(timerId);
      }, 1000);
    }
    // eslint-disable-next-line
  }, []);

  const [countdown, setCountdown] = useState(0);

  const { loading: isValidating, run: runValidator } = useRequest(validateEmail, {
    manual: true,
    onSuccess: (res) => {
      console.log("发送验证码", res);
    },
    onError: (err) => {
      console.log("发送验证码", err);
    },
  });

  const { loading, run: runRegister } = useRequest(register, {
    manual: true,
    onSuccess: (res) => {
      if (res.data.code === 200) {
        console.log(res.data.data, "res");
        Toast.show({
          content: "注册成功",
        });
        localStorage.setItem("token", res.data.data.token);
        // 导航至首页
        navigate("/login");
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
    const { name, password, confirmPassword, email, code } = await form.getFieldsValue();

    if (!name || !password || !confirmPassword) return;

    if (!localStorage.getItem("sendTime")) {
      form.setFields([
        {
          name: "code",
          errors: ["请先获取验证码"],
        },
      ]);
      return;
    }
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

    runRegister({
      username: name,
      password: sha256Password,
      email,
      code,
    });
    localStorage.removeItem("sendTime");
  }, [runRegister, form]);

  // 点击发送验证码按钮
  const handleSendValidator = useCallback(async () => {
    const { email } = await form.getFieldsValue();

    if (!email || countdown > 0) return;
    localStorage.setItem("sendTime", String(Date.now()));
    setCountdown(sendAgainGap);
    let timerId = setInterval(() => {
      countDownInterval(timerId);
    }, 1000);

    runValidator(email);
  }, [countDownInterval, runValidator, form, countdown]);

  return (
    <div className={styles.login}>
      <Form
        form={form}
        onFinish={handleRegister}
        footer={
          <Button block color="primary" type="submit" loading={loading} size="large">
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
        <Form.Item
          rules={[
            { required: true, message: "邮箱不能为空" },
            {
              type: "email",
              message: "请输入有效的邮箱地址",
            },
          ]}
          name="email"
          label="邮箱"
        >
          <Input placeholder="请输入验证邮箱" />
        </Form.Item>

        <Form.Item
          name="code"
          label="验证码"
          extra={
            <div className={styles.extraPart}>
              <Button disabled={isValidating} fill="none" onClick={handleSendValidator}>
                {countdown > 0 ? `${countdown}秒后重新发送` : "获取验证码"}
              </Button>
            </div>
          }
        >
          <Input placeholder="请输入验证码" clearable />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
