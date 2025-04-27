import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import BanelDetails from "../../components/Home/Banels/BanelsDetails/BanelDetails";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Orders } from "../../utils/data";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchUsersQuotations } from "../../features/usersSlice";
import { configs } from "../../configs";

export default function HomePage() {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const userData = JSON.parse(localStorage?.getItem(configs.COATECH_USER_PROFILE)) || [];
  const [showUserDetailsModal, setShowUSerDetailsModal] = useState(false);
  const [allOrders, setAllOrders] = useState(
    JSON.parse(localStorage?.getItem("All_admin_quotations")) || Orders
  );
  const dispatch = useDispatch();
  const {users_quotations , users_quotations_loading} = useSelector(state => state?.users)

  const columns = [
    {
      dataIndex: "qoute_id",
      key: "qoute_id",
      title: "Quotation Number",
      render: (row) => <p className="font-semibold">{row}</p>,
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
      dataIndex: "",
      key: "",
      render: (row) => (
        <div
          className={`flex justify-center w-9 h-9 rounded-full items-center border border-gray-200 ${
            row?.admin_id ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {row?.admin_id != null ? (
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
      key: "updated_at",
      dataIndex: "updated_at",
      render: (row) => {
        if (!row) return <p>--</p>;
        return (
          <p>
          {new Date(row).toLocaleDateString()}{" "}
          {new Date(row).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        );
      },
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

          {/* {userData?.admin_role !== "user" && <button
            onClick={() => {
              setShowStatusModal(true);
              setRowData(row);
            }}
            className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white transition"
          >
            Edit
          </button>} */}

          {/* <button
          onClick={() => {
            setShowUSerDetailsModal(true);
            setRowData(row);
          }}
          className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white transition"
        >
          User Details
        </button> */}
        </div>
      ),
    },
  ];

  function handleEditStatus() {
    const updatedOrders = allOrders.map((order) =>
      order.id === rowData.id ? { ...order, response: selectedStatus } : order
    );

    setAllOrders(updatedOrders);
    localStorage.setItem("All_admin_quotations", JSON.stringify(updatedOrders));
    toast.success("Status updated successfully");

    setShowStatusModal(false);
  }

  useEffect(() => {
    if (showStatusModal) {
      setSelectedStatus(rowData?.response);
    }
  }, [showStatusModal]);

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
    localStorage.setItem("All_admin_quotations", JSON.stringify(Orders));
  }, []);

  useEffect(() => {
    dispatch(handleFetchUsersQuotations())
  } , [dispatch])


  return (
    <div>
      <div className="px-2.5">
        <Breadcrumb
          navigationData={[
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Home" },
          ]}
        />
      </div>
      <div className="p-2 rounded-md  mt-3">
        <Table scroll={{ x: "max-content" }} columns={columns} loading={users_quotations_loading} dataSource={users_quotations?.data} />
      </div>

      <Modal
        open={showStatusModal}
        onCancel={() => setShowStatusModal(false)}
        title="Change Quotation Status"
        footer={null}
      >
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-700">Response Status</label>
          <select
            value={selectedStatus ?? rowData?.response}
            onChange={(e) => setSelectedStatus(Number(e.target.value))}
            className="border rounded-md p-2"
          >
            <option value="" selected disabled>
              Change Status
            </option>
            <option value={1}>Responded</option>
            <option value={0}>Pending</option>
          </select>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleEditStatus}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setShowStatusModal(false)}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

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
          dataSource={[userData]}
        />
      </Modal>

      <BanelDetails
        data={rowData}
        quote_id = {rowData?.qoute_id}
        open={showDetailsModal}
        setOpen={setShowDetailsModal}
        item={rowData?.products}
      />
    </div>
  );
}
