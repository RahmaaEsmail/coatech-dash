import { Table } from "antd";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { ALL_USERS } from "../../utils/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchAllUsers } from "../../features/usersSlice";
import { ErrorBoundary } from "react-error-boundary";

export default function UsersPage() {
  const navigate = useNavigate();
  const { users, getUserLoading } = useSelector((state) => state?.users);
  const dispatch = useDispatch();
  const [filteredValues, setFilteredValues] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const columns = [
    {
      dataIndex: "user_id",
      key: "user_id",
      title: "#",
    },
    {
      dataIndex: "user_name",
      key: "user_name",
      title: "Name",
    },
    {
      dataIndex: "user_email",
      key: "user_email",
      title: "Email",
      render: (row) => <a href={`mailto:${row}`}>{row}</a>,
    },
    {
      dataIndex: "created_at",
      key: "created_at",
      title: "Created At",
      render: (row) => <p>{new Date(row)?.toLocaleDateString()}</p>,
    },
    {
      dataIndex: "address",
      key: "address",
      title: "Address",
      render: (row) => <p>{row ? row : "--"}</p>,
    },
    {
      dataIndex: "",
      title: "Quotations",
      render: (row) => (
        <div>
          <button
            onClick={() => {
              navigate(`/users/${row?.user_id}`);
              // setShowOrderDetails(true);
              // setRowData(row)
            }}
            className="bg-(--main-blue-color) text-white rounded-md p-2"
          >
            Details
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!users?.data?.length) dispatch(handleFetchAllUsers());
  }, [dispatch, users?.data]);

  useEffect(() => {
    const val = searchValue?.trim()?.toLowerCase();
    const timeOut = setTimeout(() => {
      if (!val) {
        setFilteredValues(users?.data);
        return;
      }
      const data = users?.data?.filter(
        (item) =>
          item?.user_name?.toLowerCase()?.includes(val) ||
          item?.user_email?.toLowerCase()?.includes(val) ||
          item?.address?.toLowerCase()?.includes(val)
      );
      setFilteredValues(data);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [searchValue, users?.data]);

  return (
    <div className="px-2.5">
      <div>
        <Breadcrumb
          navigationData={[
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Users" },
          ]}
        />
      </div>

      <div className="input-group my-5">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <ErrorBoundary
        fallback={
          <h2 className="my-3 text-center font-bold text-white bg-(--main-red-color) rounded-md p-3">
            There's Error while loading Data , Check Internet Connections
          </h2>
        }
        resetKeys={[users?.data]}
      >
        <div className="">
          <Table
          scroll={{x :"max-content"}}
            loading={getUserLoading}
            columns={columns}
            dataSource={filteredValues || []}
            rowKey="id"
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}
