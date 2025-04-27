import React, { useCallback, useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCreateAdmin,
  handleEditAdmin,
  handleGetAllAdmins,
} from "../../features/adminSlice";
import { Modal, Switch, Table } from "antd";
import { toast } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

export default function AdminPage() {
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const { admins, admin_loading } = useSelector((state) => state?.admins);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFromData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "",
  });

  const columns = [
    {
      id: "#",
      dataIndex: "admin_id",
      key: "admin_id",
    },
    {
      dataIndex: "admin_name",
      title: "Admin Name",
    },
    {
      dataIndex: "admin_phone",
      title: "Admin Phone",
      render: (row) => <a href={`tel:${row}`}>{row}</a>,
    },
    {
      dataIndex: "admin_email",
      title: "Admin Email",
      render: (row) => <a href={`mailto:${row}`}>{row}</a>,
    },
    {
      dataIndex: "admin_role",
      title: "Role",
    },
    {
      dataIndex: "admin_status",
      render: (row) => (
        <p
          className={`${
            row == "enabled"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          } p-2 rounded-md flex justify-center items-center `}
        >
          {row}
        </p>
      ),
    },
    {
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setRowData(row);
              setOpenEditModal(true);
            }}
            className="my-3 mx-2.5 ms-auto bg-(--main-blue-color) text-white p-3 rounded-md flex justify-center items-center"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!admins?.data?.length) dispatch(handleGetAllAdmins());
  }, [dispatch, admins?.data]);

  function handleSubmit() {
    const data_send = {
      ...formData,
    };
    console.log(data_send);
    dispatch(handleCreateAdmin({ body: data_send }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.message == "Admin created successfully") {
          toast.success(res?.message);
          setOpenAddModal(false);
          dispatch(handleGetAllAdmins());
          setFromData({
            email: "",
            password: "",
            name: "",
            phone: "",
            role: "",
          });
        } else {
          toast.error(res || res?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleEdit() {
    console.log(rowData);
    const data_send = {
      ...rowData,
      old_password: rowData?.password,
    };
    console.log(data_send);
    dispatch(handleEditAdmin({ body: data_send }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.message == "Admin updated successfully") {
          toast.success(res?.message);
          setOpenEditModal(false);
          dispatch(handleGetAllAdmins());
        } else {
          toast.error(res || res?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const filteredValues = useMemo(() => {
    if (!admins?.data) return [];

    if (!searchValue?.trim()?.length) return admins?.data;

    const val = searchValue?.trim()?.toLowerCase();

    return admins?.data?.filter(
      (item) =>
        item?.admin_name?.toLowerCase()?.includes(val) ||
        item?.admin_phone?.toLowerCase()?.includes(val) ||
        item?.admin_email?.toLowerCase()?.includes(val) ||
        item?.admin_status?.toLowerCase()?.includes(val)
    );
  }, [admins?.data, searchValue]);

  return (
    <div className="px-2.5">
      <div className="">
        <Breadcrumb
          navigationData={[
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Admin" },
          ]}
        />
      </div>

      <button
        onClick={() => setOpenAddModal(true)}
        className="my-3 mx-2.5 ms-auto bg-(--main-blue-color) text-white p-3 rounded-md flex justify-center items-center"
      >
        Add
      </button>

      <div className="input-group mb-5">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <ErrorBoundary
        fallback={
          <h2>There's Error while loading Data , Check Internet Connections</h2>
        }
      >
        <Table
          scroll={{ x: "max-content" }}
          loading={admin_loading}
          columns={columns}
          dataSource={filteredValues}
        />
      </ErrorBoundary>

      <Modal
        footer={null}
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        onClose={() => setOpenAddModal(false)}
        title="Create Admin"
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="input-group">
            <label>Name</label>
            <input
              onChange={(e) =>
                setFromData({ ...formData, name: e.target.value })
              }
              value={formData?.name}
              type="text"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              onChange={(e) =>
                setFromData({ ...formData, email: e.target.value })
              }
              value={formData?.email}
              type="email"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 my-4 gap-2">
          <div className="input-group">
            <label>Phone</label>
            <input
              onChange={(e) =>
                setFromData({ ...formData, phone: e.target.value })
              }
              value={formData?.phone}
              type="text"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              onChange={(e) =>
                setFromData({ ...formData, password: e.target.value })
              }
              value={formData?.password}
              type="password"
            />
          </div>
        </div>

        <div className="input-group">
          <label>User Role</label>
          <select
            value={formData?.role}
            onChange={(e) => setFromData({ ...formData, role: e.target.value })}
          >
            <option value={""} disabled selected>
              Choose Role
            </option>
            <option value={"suber_admin"}>suber_admin</option>
            <option value="sales">sales</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="my-3 mx-2.5 ms-auto bg-(--main-blue-color) text-white p-3 rounded-md flex justify-center items-center"
        >
          {admin_loading ? "Loading..." : "Submit"}
        </button>
      </Modal>

      <Modal
        footer={null}
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onClose={() => setOpenEditModal(false)}
        title="Edit Admin"
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="input-group">
            <label>Name</label>
            <input
              onChange={(e) =>
                setRowData({ ...rowData, admin_name: e.target.value })
              }
              value={rowData?.admin_name}
              type="text"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              onChange={(e) =>
                setRowData({ ...rowData, admin_email: e.target.value })
              }
              value={rowData?.admin_email}
              type="email"
            />
          </div>
        </div>

        <div className="my-4 gap-2">
          <div className="input-group">
            <label>Phone</label>
            <input
              onChange={(e) =>
                setRowData({ ...rowData, admin_phone: e.target.value })
              }
              value={rowData?.admin_phone}
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="input-group">
            <label>Old Password</label>
            <input
              onChange={(e) =>
                setRowData({ ...rowData, old_password: e.target.value })
              }
              value={rowData?.old_password}
              type="password"
            />
          </div>

          <div className="input-group">
            <label>New Password</label>
            <input
              onChange={(e) =>
                setRowData({ ...rowData, new_password: e.target.value })
              }
              value={rowData?.new_password}
              type="password"
            />
          </div>
        </div>

        <div className="my-3 flex gap-2 items-center">
          <label className="text-(--main-blue-color) font-medium text-lg">
            {rowData?.admin_status == "enabled" ? "Enable" : "Disable"}
          </label>
          <Switch
            checked={rowData?.admin_status === "enabled"}
            onChange={(checked) => {
              setRowData({
                ...rowData,
                admin_status: checked ? "enabled" : "disabled",
              });
            }}
          />
        </div>

        {/* <div className="input-group">
          <label>User Role</label>
          <select
            value={formData?.role}
            onChange={(e) => setFromData({ ...formData, role: e.target.value })}
          >
            <option value={""} disabled selected>
              Choose Role
            </option>
            <option value={"suber_admin"}>suber_admin</option>
            <option value="seller">seller</option>
          </select>
        </div> */}

        <button
          onClick={handleEdit}
          className="my-3 mx-2.5 ms-auto bg-(--main-blue-color) text-white p-3 rounded-md flex justify-center items-center"
        >
          {admin_loading ? "Loading..." : "Submit"}
        </button>
      </Modal>
    </div>
  );
}
