import { Table } from "antd";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { ALL_USERS } from "../../utils/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [rowData, setRowData] = useState({});
  const navigate = useNavigate();

  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
      render: (row) => <a href={`mailto:${row}`}>{row}</a>,
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: "Phone",
      render: (row) => <a href={`tel:${row}`}>{row}</a>,
    },
    {
      dataIndex: "company_name",
      key: "company_name",
      title: "Company Name",
    },
    {
      dataIndex: "address",
      key: "address",
      title: "Address",
    },
    {
      dataIndex: "city",
      key: "city",
      title: "City",
    },
    {
      dataIndex: "region",
      key: "region",
      title: "Region",
    },
    {
      dataIndex: "",
      title: "Quotations",
      render: (row) => (
        <div>
          <button
          onClick={() => {
            navigate(`/users/${row?.id}`)
            // setShowOrderDetails(true);
            // setRowData(row)
          }}
          className="bg-(--main-blue-color) text-white rounded-md p-2">
            Details
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="px-2.5">
        <Breadcrumb
          navigationData={[
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Users" },
          ]}
        />
      </div>

      <div className="p-4">
        <Table columns={columns} dataSource={ALL_USERS} rowKey="id" />
      </div>
    </div>
  );
}
