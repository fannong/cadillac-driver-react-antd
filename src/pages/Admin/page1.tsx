import React from "react";
import { Table } from "antd";

const Page1: React.FC = () => {
  function generateData(length: number) {
    const dataSource = [];
    for (let i = 1; i <= length; i++) {
      dataSource.push({
        key: i.toString(),
        name: "Name" + i,
        age: Math.floor(Math.random() * 50) + 20, // 随机生成一个20到70之间的年龄
        address: "Address" + i,
      });
    }
    return dataSource;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Table
      pagination={{
        position: ["bottomCenter"],
      }}
      dataSource={generateData(30)}
      columns={columns}
    />
  );
};

export default Page1;
