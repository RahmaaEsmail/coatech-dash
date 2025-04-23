import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import BanelDetails from "../../../components/Home/Banels/BanelsDetails/BanelDetails";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { ALL_USERS, Orders } from "../../../utils/data";
import { useParams } from "react-router-dom";


export default function UserDetails() {
    const {user_id} = useParams();
    const [filteredData , setFilteredData] = useState([]);
    const [filteredUsers , setFilteredUsers] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const userData = JSON.parse(localStorage?.getItem("COATECH_USER_DATA")) || [];
  const [showUserDetailsModal, setShowUSerDetailsModal] = useState(false);
  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "Quotation Number",
      render:(row) => <p className="font-semibold">{row}</p>
    },
    {
      dataIndex: "created_at",
      key: "created_at",
      title: "Submitted At",
      render: (value) => (
        <p>
          {new Date(value).toLocaleDateString()}{" "}
          {new Date(value).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      ),
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      render: (row) => (
        <div
          className={`flex justify-center w-9 h-9 rounded-full items-center border border-gray-200 ${
            row ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {row ? (
            <div className="flex justify-center items-center bg-green-100 text-green-700 whitespace-nowrap p-2 rounded-lg">
              Support Reply
            </div>
          ) : (
            <div className="flex justify-center items-center bg-gray-100 text-gray-700 whitespace-nowrap p-2 rounded-lg">
              Pending
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Response Time",
      dataIndex: "response_time",
      key: "response_time",
      render:(row) => <p>{row ? row :"--"}</p>
    },
    {
      title: "Actions",
      render: (row) => (
        <div className="flex gap-1 items-center">
          <button
            onClick={() => {
              setShowDetailsModal(true);
              setRowData(row);
            }}
            className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white transition"
          >
            Details
          </button>

          <button
          onClick={() => {
            setShowUSerDetailsModal(true);
            setRowData(row);
          }}
          className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white transition"
        >
          User Details
        </button>
        </div>
      ),
    },
  ];

  const user_columns = [
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
  ];

  useEffect(() => {
    setFilteredData(Orders?.filter(order => order?.user_id == user_id))
  } , [user_id])

  useEffect(() => {
    setFilteredUsers(ALL_USERS?.filter(user => user?.id == user_id))
  } , [rowData])
  return (
    <div>
      <div className="px-2.5">
        <Breadcrumb
          navigationData={[
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Users" , route :"/users"},
            {id:3,name:"Details"}
          ]}
        />
      </div>
      <div className="p-2 rounded-md  mt-3">
        <Table scroll={{x :"max-content"}} columns={columns} dataSource={filteredData} />
      </div>

      <Modal
        width={800}
        title="User Info"
        open={showUserDetailsModal}
        onClose={() => setShowUSerDetailsModal(false)}
        onCancel={() => setShowUSerDetailsModal(false)}
        footer={null}
      >
        <Table
          scroll={{ x: "max-content" }}
          columns={user_columns}
          dataSource={filteredUsers}
        />
      </Modal>

      <BanelDetails
        open={showDetailsModal}
        setOpen={setShowDetailsModal}
        item={rowData}
      />
    </div>
  );
}
