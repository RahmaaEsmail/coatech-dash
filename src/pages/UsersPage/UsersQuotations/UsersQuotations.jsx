import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleFetchSpecificUser } from "../../../features/usersSlice";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { Table } from "antd";
import BanelDetails from "../../../components/Home/Banels/BanelsDetails/BanelDetails";
import { ErrorBoundary } from "react-error-boundary";

export default function UsersQuotations({ data }) {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const { specific_user, specific_user_loading } = useSelector(
    (state) => state?.users
  );
  const [rowData, setRowData] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    dispatch(handleFetchSpecificUser({ user_id }));
  }, [dispatch, user_id]);

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
      render: (row) => 
     {
      return    (
        <div className="flex gap-1 items-center">
          <button
            onClick={() => {
              setShowDetailsModal(true);
              setRowData(row);
              console.log(row)
            }}
            className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white transition"
          >
            Details
          </button>
        </div>
      )
     }
    },
  ];


  return (
    <div className="px-2.5">
      <div>
        <Breadcrumb
          navigationData={[
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Users", route: "/users" },
            { id: 2, name: "User Details", route: `/users/${user_id}` },
            { id: 3, name: "User Quotations" },
          ]}
        />
      </div>

      <ErrorBoundary
        resetKeys={[specific_user?.qoutes]}
        fallback={
          <h2 className="my-3 text-center font-bold text-white bg-(--main-red-color) rounded-md p-3">
            There's Error while loading Data , Check Internet Connections
          </h2>
        }
      >
        <div className="rounded-md mt-3">
          <Table
           scroll={{x:"max-content"}}
            columns={columns}
            loading={specific_user_loading}
            dataSource={specific_user?.qoutes || []}
          />
        </div>
      

      {rowData && (
        <BanelDetails
          data={rowData}
          quote_id={rowData?.qoute_id}
          open={showDetailsModal}
          setOpen={setShowDetailsModal}
          item={rowData?.products || []}
        />
      )}
      </ErrorBoundary>
    </div>
  );
}
