"use client";

import { useState } from "react";
import { Table, Button } from "antd";

const MyComponent = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    { key: 1, name: "Instance A", status: "Running" },
    { key: 2, name: "Instance B", status: "Stopped" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      render: (_, record) => (
        <Button onClick={() => setSelectedItem(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {`selectedItem is ${selectedItem.name}`}
      <div className="flex-grow">
        <Table dataSource={data} columns={columns} />
      </div>
      {selectedItem && (
        <div className="border-t p-4 bg-gray-100">
          <h3>Details for {selectedItem.name}</h3>
          <p>Status: {selectedItem.status}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
