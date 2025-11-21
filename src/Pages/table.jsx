import '../Style/table.css';

import React from "react";

import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";; // import your custom css

const StationTable = () => {
  const data = [
    { key: 1, name: "Kaithalkuchi - (QLAT4)", locations: 46, devices: 130, maintenanceDue: 4, alerts: 12, warnings: 2492 },
    { key: 2, name: "Guwahati - (GHTI2)", locations: 38, devices: 112, maintenanceDue: 6, alerts: 15, warnings: 2180 },
    { key: 3, name: "Tinsukia - (TSK9)", locations: 25, devices: 90, maintenanceDue: 2, alerts: 7, warnings: 1654 },
    { key: 4, name: "Jorhat - (JHT6)", locations: 41, devices: 123, maintenanceDue: 5, alerts: 9, warnings: 2103 },
    { key: 5, name: "Tezpur - (TZP5)", locations: 29, devices: 97, maintenanceDue: 3, alerts: 11, warnings: 1780 },
    { key: 6, name: "Silchar - (SLC8)", locations: 33, devices: 105, maintenanceDue: 4, alerts: 10, warnings: 1922 },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a href="#" className="station-link">
          {text}
        </a>
      ),
    },
    { title: "Locations", dataIndex: "locations", key: "locations" },
    { title: "Devices", dataIndex: "devices", key: "devices" },
    { title: "Maintenance Due", dataIndex: "maintenanceDue", key: "maintenanceDue" },
    { title: "Alerts", dataIndex: "alerts", key: "alerts" },
    { title: "Warnings", dataIndex: "warnings", key: "warnings" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} className="action-edit" />
          <Button type="text" icon={<DeleteOutlined />} className="action-delete" />
          <Button type="text" icon={<InfoCircleOutlined />} className="action-info" />
        </Space>
      ),
    },
  ];

  return (
    <div className="station-page p-5">
      {/* Top Header */}
      <div className="station-header">
        <h2>Station</h2>
        <div className="station-header-buttons">
          <Button shape="circle" icon={<PlusOutlined />} className="circle-btn" />
          <Button shape="circle" icon={<ReloadOutlined />} className="circle-btn" />
          <Button className="download-btn">Download Configuration</Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="station-table-container">
        <div className="station-table-card">
          <div className="station-table-title">
            <h3>Listing</h3>
          </div>

          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 6 }}
            bordered
            className="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default StationTable;
