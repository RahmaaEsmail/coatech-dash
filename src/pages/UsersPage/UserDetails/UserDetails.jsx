import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import BanelDetails from "../../../components/Home/Banels/BanelsDetails/BanelDetails";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { ALL_USERS, Orders } from "../../../utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchSpecificUser } from "../../../features/usersSlice";


export default function UserDetails() {
    const {user_id} = useParams();
    const navigate = useNavigate();
  const [rowData, setRowData] = useState({});
  const [showUserDetailsModal, setShowUSerDetailsModal] = useState(false);
  const {specific_user , specific_user_loading} = useSelector(state => state?.users);
  const dispatch  = useDispatch();

  const columns = [
    {
      dataIndex: "user_id",
      key: "user_id",
      title: "#",
      render:(row) => <p className="font-semibold">{row}</p>
    },
    {
      dataIndex:"user_name",
      key:"user_name",
      title:"User Name"
    },
    {
      dataIndex:"user_email",
      key:"user_email",
      title:"Email",
      render:(row) => <a href={`mailto:${row}`}>{row}</a>
    },
    {
      dataIndex:"address",
      key:"address",
      title:"Address"
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
      title: "Actions",
      render: (row) => (
        <div className="flex gap-1 items-center">
          <button
            onClick={() => {
             navigate(`/user_quotations/${row?.user_id}`)
              setRowData(row);
            }}
            className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white transition"
          >
            Quotations
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
    dispatch(handleFetchSpecificUser({user_id}))
  }, [dispatch , user_id])

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
        <Table scroll={{x :"max-content"}} loading={specific_user_loading} columns={columns} dataSource={specific_user?.data} />
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
          loading={specific_user_loading}
          scroll={{ x: "max-content" }}
          columns={user_columns}
          dataSource={specific_user?.data}
        />
      </Modal>

      {/* <BanelDetails
        open={showDetailsModal}
        setOpen={setShowDetailsModal}
        item={specific_user?.qoutes}
      /> */}
    </div>
  );
}
