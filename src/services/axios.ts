import axios from "axios";

const instance = axios.create({
  //   baseURL: "http://127.0.0.1:3000",
  baseURL: "/api",
});
const csrfInstance = axios.create({
  baseURL: "/api",
});
let csrfToken: string | null = null;

// 请求拦截器
instance.interceptors.request.use(
  async (config) => {
    // 如果没有CSRF令牌，获取它
    if (!csrfToken) {
      console.log(csrfToken, "csrfToken");
      const tokenResponse = await csrfInstance.get("/csrf");
      csrfToken = tokenResponse.data._csrf;
    }

    // 将CSRF令牌添加到请求头
    config.headers["X-CSRF-Token"] = csrfToken;

    // 获取认证Token
    // const authToken = localStorage.getItem("authToken");

    // // 如果存在认证Token，将其添加到请求头
    // if (authToken) {
    //   config.headers["Authorization"] = `Bearer ${authToken}`;
    // }

    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 如果响应中包含新的CSRF令牌，更新它
    if (response.data._csrf && response.data._csrf !== csrfToken) {
      csrfToken = response.data._csrf;
    }

    // 处理响应数据
    return response;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default instance;
