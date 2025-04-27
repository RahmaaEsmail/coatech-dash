import { Modal, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleUpdateQuote } from "../../../../features/quotatationsSlice";
import { handleFetchUsersQuotations } from "../../../../features/usersSlice";
import { configs } from "../../../../configs";

export default function BanelDetails({ open, setOpen, item, quote_id, data }) {
  const dispatch = useDispatch();
  const { update_loading } = useSelector((state) => state?.quotations);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [currentItem, setCurrentItem] = useState([]);
  const userInfo =
    JSON.parse(localStorage.getItem(configs.COATECH_USER_PROFILE)) || {};

  useEffect(() => {
    if (item) {
      setCurrentItem(item);
      if (!rowData?.id && Array.isArray(item)) {
        const defaultProduct = item[0];
        setRowData(defaultProduct);
      }
    }
  }, [item]);

  const variation_columns = [
    {
      dataIndex: "color",
      key: "color",
      title: "Color",
    },
    {
      title: "Details",
      key: "details",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {Object.entries(row || {}).map(([key, value]) =>
            value ? (
              <span
                key={key}
                className={`text-xs px-2 py-1 rounded-full ${
                  key.includes("color")
                    ? "bg-green-100 text-green-800"
                    : key.includes("finish")
                    ? "bg-yellow-100 text-yellow-800"
                    : key.includes("gloss")
                    ? "bg-blue-100 text-blue-800"
                    : key.includes("powder")
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {key}: {value}
              </span>
            ) : null
          )}
        </div>
      ),
    },
  ];

  const product_columns = [
    { dataIndex: "product_id", key: "product_id", title: "#" },
    {
      dataIndex: "product_image",
      key: "product_image",
      title: "Image",
      render: (src) => (
        <img
          src={src}
          className="w-[100px] h-[100px] rounded-md object-cover"
          alt="product"
        />
      ),
    },
    {
      dataIndex: "product_color",
      key: "product_color",
      title: "Color",
      render: (row) => (
        <div
          className={`w-10 h-10 rounded-full`}
          style={{ backgroundColor: row }}
        ></div>
      ),
    },
    {
      title: "User Weight",
      render: (record) => (
        <p>
          {record?.product_quantity} {record?.type || ""}
        </p>
      ),
    },
    {
      title: "Admin Weight",
      render: (record) =>
        record?.new_quantity ? (
          <p>
            {record?.new_quantity} {record?.type}
          </p>
        ) : (
          "--"
        ),
    },
    {
      title: "Price",
      render: (record) =>
        record?.price
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(record?.price || 0)
          : "--",
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setRowData(record);
              setShowDetailsModal(true);
            }}
            className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white"
          >
            Details
          </button>
          {userInfo?.admin_role !== "user" && (
            <button
              onClick={() => {
                setRowData(record);
                setShowEditPrice(true);
              }}
              className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white"
            >
              Edit
            </button>
          )}
        </div>
      ),
    },
  ].filter(Boolean);

  const handleEditNote = () => {
    const data_send = {
      qoute_id: quote_id,
      product_ids: [],
      admin_notes: rowData?.admin_notes,
    };
    dispatch(handleUpdateQuote({ body: data_send }))
      .unwrap()
      .then((res) => {
        if (res?.message === "Quote updated successfully") {
          toast.success(res?.message);
          dispatch(handleFetchUsersQuotations())
            .unwrap()
            .then((res) => {
              const updatedData = res?.data?.find(
                (item) => item?.qoute_id == quote_id
              );
              console.log(updatedData);
              if (updatedData) {
                setRowData((prev) => ({
                  ...prev,
                  admin_notes: updatedData?.admin_notes,
                }));
              }

              if (updatedData?.products) {
                setCurrentItem(updatedData.products);
              }
            });
          setShowNoteModal(false);
        } else {
          toast.error(res?.message || "Error");
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleSubmit = () => {
    const data_send = {
      qoute_id: quote_id,
      product_ids: [
        {
          price: rowData?.price,
          qoute_product_id: rowData?.qoute_product_id,
          new_quantity: rowData?.new_quantity,
          product_id: rowData?.product_id,
        },
      ],
    };

    dispatch(handleUpdateQuote({ body: data_send }))
      .unwrap()
      .then((res) => {
        if (res?.message === "Quote updated successfully") {
          toast.success(res?.message);
          setShowEditPrice(false);

          const updatedItems = currentItem.map((item) =>
            item.product_id === rowData.product_id
              ? {
                  ...item,
                  price: rowData.price,
                  new_quantity: rowData.new_quantity,
                }
              : item
          );
          setCurrentItem([...updatedItems]);

          setRowData((prev) => ({
            ...prev,
            price: rowData.price,
            new_quantity: rowData.new_quantity,
          }));
          dispatch(handleFetchUsersQuotations());
        } else {
          toast.error(res?.message || "Error");
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    console.log(data);
    setRowData({
      ...rowData ,
      admin_notes : data?.admin_notes
    })
  }, [data]);

  return (
    <>
      <Modal
        open={showDetailsModal}
        width={800}
        footer={null}
        onCancel={() => setShowDetailsModal(false)}
      >
        <h3 className="text-lg font-semibold mb-3">Banel Variations</h3>
        <Table
          scroll={{ x: "max-content" }}
          columns={variation_columns}
          dataSource={
            rowData?.props?.length > 2
              ? [JSON?.parse(rowData?.props)?.formData]
              : []
          }
          rowKey={(row) => row.color || Math.random()}
        />
      </Modal>

      <Modal
        open={open}
        width={700}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <div className="flex justify-between items-center my-5">
          <h3 className="font-semibold text-[17px]">Product Details</h3>
          {userInfo?.admin_role !== "user" && (
            <button
              onClick={() => setShowNoteModal(true)}
              className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white"
            >
              Edit
            </button>
          )}
        </div>
        <Table
          scroll={{ x: "max-content" }}
          columns={product_columns}
          dataSource={currentItem || []}
          rowKey="product_id"
        />
        <div className="grid grid-cols-3 gap-3 items-center mt-4 text-[16px]">
          {currentItem?.length > 0 && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-(--main-blue-color)">
                Number Of Products:
              </p>
              <p>{currentItem?.length}</p>
            </div>
          )}

          {currentItem?.some((product) =>
            parseFloat(product?.product_quantity)
          ) && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-(--main-blue-color)">
                Total Weight:
              </p>
              <p>
                {currentItem?.reduce((total, product) => {
                  const kgValue = parseFloat(product?.product_quantity);
                  return total + (isNaN(kgValue) ? 0 : kgValue);
                }, 0)}{" "}
                Kg
              </p>
            </div>
          )}

          {currentItem?.some((product) => Number(product?.price)) && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-(--main-blue-color)">
                Total Price:
              </p>
              <p>
                {new Intl.NumberFormat("en-EG", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  currentItem?.reduce(
                    (total, prod) => total + Number(prod?.price || 0),
                    0
                  )
                )}
              </p>
            </div>
          )}
        </div>

        {data?.admin_id && (
          <div className="flex flex-col mt-4">
            <p className="font-bold text-(--main-blue-color)">Admin Name:</p>
            <p className="text-[16px] font-bold">{data?.admin?.admin_name}</p>
          </div>
        )}

        {data?.admin_id && (
          <div className="flex flex-col mt-4 text-[16px]">
            <p className="font-bold text-(--main-blue-color)">Notes:</p>
            <p>{rowData?.admin_notes}</p>{" "}
          </div>
        )}
      </Modal>

      <Modal
        open={showNoteModal}
        footer={null}
        onCancel={() => setShowNoteModal(false)}
        title="Edit Note"
      >
        <div className="input-group">
          <label>Notes</label>
          <textarea
            value={rowData?.admin_notes || ""}
            onChange={(e) =>
              setRowData({ ...rowData, admin_notes: e.target.value })
            }
            className="min-h-[100px] border border-[#ccc] rounded-[6px] p-[7px_10px]"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleEditNote}
            className="bg-(--main-blue-color) text-white px-4 py-2 rounded-md"
          >
            {update_loading ? "Loading..." : "Save"}
          </button>
          <button
            onClick={() => setShowNoteModal(false)}
            className="border border-(--main-blue-color) text-(--main-blue-color) px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        open={showEditPrice}
        footer={null}
        title="Edit Quotation Price"
        onCancel={() => setShowEditPrice(false)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="input-group w-full">
              <label>Price</label>
              <input
                type="number"
                value={rowData?.price || ""}
                onChange={(e) =>
                  setRowData({ ...rowData, price: e.target.value })
                }
                className="focus:!border-[2px] focus:!border-(--main-blue-color)"
              />
            </div>
            <div className="input-group w-full">
              <label>Weight ({rowData?.type})</label>
              <input
                type="text"
                value={rowData?.new_quantity || ""}
                onChange={(e) =>
                  setRowData({ ...rowData, new_quantity: e.target.value })
                }
                className="focus:!border-[2px] focus:!border-(--main-blue-color)"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSubmit}
              className="bg-(--main-blue-color) text-white px-4 py-2 rounded-md"
            >
              {update_loading ? "Loading..." : "Edit"}
            </button>
            <button
              onClick={() => setShowEditPrice(false)}
              className="border border-(--main-blue-color) text-(--main-blue-color) px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
