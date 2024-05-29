import "./App.css";
import React, { useEffect, FC } from "react";
import routes from "./routes";
import { useRequest } from "ahooks";
import { tokenValid } from "../src/services/user";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { TabBar } from "antd-mobile";
// import {
//   AppOutline,
//   MessageOutline,
//   MessageFill,
//   UnorderedListOutline,
//   UserOutline,
// } from "antd-mobile-icons";
import Header from "./components/Header";

// const tabs = [
//   {
//     key: "blogCenter",
//     title: "学习日记",
//     icon: <UserOutline />,
//   },
//   {
//     key: "todo",
//     title: "曾繁戎",
//     icon: <UnorderedListOutline />,
//     // badge: "5",
//   },

//   {
//     key: "home",
//     title: "首页",
//     icon: <AppOutline />,
//     badge: 5,
//   },
//   {
//     key: "message",
//     title: "谢宝莹",
//     icon: (active: boolean) => (active ? <MessageFill /> : <MessageOutline />),
//     // badge: "99+",
//   },
//   {
//     key: "personalCenter",
//     title: "照片",
//     icon: <UserOutline />,
//   },
// ];

// const TabBarComponent: FC = () => {
//   const hideOnRoutes = ["/login", "/register", "/admin"]; // 在这些路由上隐藏TabBar

//   return !hideOnRoutes.includes(window.location.pathname) &&
//     !window.location.pathname.includes("admin") ? (
//     <TabBar safeArea className="App-Tab-Bar">
//       {tabs.map((item) => (
//         <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} />
//       ))}
//     </TabBar>
//   ) : null;
// };

const App: FC = () => {
  const { run: tokenValidRun } = useRequest(tokenValid, {
    manual: true,
    onSuccess: (res) => {
      if (res.code !== 200) {
        localStorage.setItem("redirectUrl", window.location.pathname);

        window.location.href = "/login";
      } else {
        console.log("token有效");
      }
    },
  });

  useEffect(() => {
    if (window.location.pathname === "/login" || window.location.pathname === "/register") return;
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectUrl", window.location.pathname);
      window.location.href = "/login";
    } else {
      tokenValidRun(token);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <Router>
        <Routes>
          {routes.map((item) => (
            <Route path={item.path} element={item.element}>
              {item.children &&
                item.children.map((child, index) => (
                  <Route key={index} path={child.path} element={child.element} />
                ))}
            </Route>
          ))}
        </Routes>
      </Router>
      {/* 底部导航 */}
      {/* <TabBarComponent /> */}
    </>
  );
};

export default App;
