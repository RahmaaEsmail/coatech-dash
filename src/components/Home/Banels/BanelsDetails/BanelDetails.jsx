import { Modal, Table } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function BanelDetails({ open, setOpen, item }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [quotationData, setQuotationData] = useState({
    price: null,
    weight: null,
    notes: "",
    status : "",
  });
  const [showNoteModal, setShowNoteModal] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user_info"));

  const [allQuotations, setAllQuotations] = useState(
    JSON.parse(localStorage.getItem("All_admin_quotations")) || []
  );

  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  // useEffect(() => {
  //   setQuotationData({
  //     price: rowData?.price,
  //     weight: rowData?.quantity?.split("kg")[0],
  //     notes: currentItem?.notes,
  //   });
  // }, [rowData]);

  useEffect(() => {
    console.log(rowData);
    setCurrentItem(item);

    // إذا مفيش rowData حالياً، خليه ياخد أول منتج كـ default للعرض
    if (!rowData?.id && item?.products?.length) {
      const defaultProduct = item.products[0];
      setRowData(defaultProduct);
      setQuotationData({
        price: rowData?.price,
        // weight: rowDD?.quantity,
        notes: item?.notes || "",
      });
    }
  }, [item]);

  useEffect(() => {
    console.log(quotationData?.weight);
  }, [quotationData]);

  const variation_columns = [
    {
      dataIndex: "color",
      key: "color",
      title: "Name",
    },
    {
      title: "Details",
      key: "details",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.catalog && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              Catalog: {row.catalog}
            </span>
          )}
          {row.powder_type && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Powder: {row.powder_type}
            </span>
          )}
          {row.finish && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Finish: {row.finish}
            </span>
          )}
          {row.gloss_level && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Gloss: {row.gloss_level}
            </span>
          )}
          {row.clear_coats && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Coats: {row.clear_coats}
            </span>
          )}
          {row.attribute && (
            <span
              style={{ backgroundColor: row.attribute }}
              className="text-white text-xs px-2 py-1 rounded-full"
            >
              Attribute: {row.attribute}
            </span>
          )}
        </div>
      ),
    },
  ];

  const product_columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "banel_img",
      key: "banel_img",
      title: "Image",
      render: (src) => (
        <img
          src={src}
          className="w-[100px] h-[100px] rounded-md object-cover"
        />
      ),
    },
    {
      dataIndex: "color",
      key: "color",
      title: "Name",
    },
    {
      dataIndex: "quantity",
      key: "quantity",
      title: "Weight",
      render: (row) => <p>{row || "--"}</p>,
    },
    {
      dataIndex: "price",
      key: "price",
      title: "Price",
      render: (row) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(row),
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
          {userInfo?.role === "admin" && (
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
  ];

  const handleEditPrice = () => {
    if (quotationData?.weight % 25 !== 0) {
      toast.warn("Please enter a valid weight that is a multiple of 25 kg.");
      return;
    }

    const updatedQuotations = allQuotations.map((quote) => {
      if (quote.id === currentItem.id) {
        const updatedProducts = quote.products.map((product) =>
          product.id === rowData.id
            ? {
                ...product,
                price: Number(quotationData.price),
                quantity: `${quotationData?.weight} kg`,
              }
            : product
        );
        return {
          ...quote,
          products: updatedProducts,
          notes: quotationData?.notes,
        };
      }
      return quote;
    });

    localStorage.setItem(
      "All_admin_quotations",
      JSON.stringify(updatedQuotations)
    );
    setAllQuotations(updatedQuotations);

    const updatedCurrentItem = updatedQuotations.find(
      (q) => q.id === currentItem.id
    );
    setCurrentItem(updatedCurrentItem);

    const updatedRow = updatedCurrentItem.products.find(
      (p) => p.id === rowData.id
    );
    setRowData(updatedRow);

    toast.success("Price updated successfully");
    setShowEditPrice(false);
  };

  function handleEditNote() {
    const updatedQuotations = allQuotations.map((quote) => {
      if (quote.id === currentItem.id) {
        return {
          ...quote,
          // response : quotationData?.status,
          notes: quotationData?.notes, // بس بنعدل الـ notes
        };
      }
      return quote;
    });

    localStorage.setItem(
      "All_admin_quotations",
      JSON.stringify(updatedQuotations)
    );
    setAllQuotations(updatedQuotations);

    const updatedCurrentItem = updatedQuotations.find(
      (q) => q.id === currentItem.id
    );
    setCurrentItem(updatedCurrentItem);

    toast.success("Note updated successfully");
    setShowNoteModal(false); // نقفل المودال بعد الحفظ
  }

  useEffect(() => {
    console.log(currentItem);
  }, [currentItem]);

  return (
    <>
      {/* Variations Modal */}
      <Modal
        width={800}
        footer={null}
        open={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
      >
        <h3 className="text-lg font-semibold mb-3">Banel Variations</h3>
        <Table
          scroll={{ x: "max-content" }}
          columns={variation_columns}
          dataSource={rowData?.variations || []}
          rowKey={(row) => row.color}
        />
      </Modal>

      {/* Main Details Modal */}
      <Modal
        open={open}
        width={700}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="flex justify-between items-center my-5">
          <h3 className="font-semibold text-[17px] mb-2">Product Details</h3>
          <button
            onClick={() => {
              setShowNoteModal(true);
            }}
            className="bg-(--main-blue-color) px-4 py-2 rounded-md text-white"
          >
            Edit
          </button>
        </div>

        <Table
          scroll={{ x: "max-content" }}
          columns={product_columns}
          dataSource={currentItem?.products || []}
          rowKey={(row) => row.id}
        />

        <div className="grid grid-cols-3 gap-3 items-center mt-4 text-[16px]">
          {currentItem?.products?.length > 0 && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-(--main-blue-color)">
                Number Of Products:
              </p>
              <p>{currentItem.products.length}</p>
            </div>
          )}

          {currentItem?.products?.some((product) =>
            parseFloat(product?.quantity)
          ) && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-(--main-blue-color)">
                Total Weight:
              </p>
              <p>
                {currentItem.products.reduce((total, product) => {
                  const kgValue = parseFloat(product?.quantity);
                  return total + (isNaN(kgValue) ? 0 : kgValue);
                }, 0)}{" "}
                Kg
              </p>
            </div>
          )}

          {currentItem?.products?.some((product) => Number(product?.price)) && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-(--main-blue-color)">
                Total Price:
              </p>
              <p>
                {new Intl.NumberFormat("en-EG", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  currentItem.products.reduce(
                    (total, prod) => total + Number(prod?.price || 0),
                    0
                  )
                )}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-4 text-[16px]">
          <p className="font-bold text-(--main-blue-color)">Notes:</p>
          <p>{currentItem?.notes}</p>
        </div>
      </Modal>

      <Modal
        open={showNoteModal}
        onCancel={() => setShowNoteModal(false)}
        footer={null}
        title="Edit Note"
      >
        <div className="input-group">
          <label>Notes</label>
          <textarea
            value={quotationData?.notes}
            onChange={(e) =>
              setQuotationData({ ...quotationData, notes: e.target.value })
            }
            className="min-h-[100px] border border-[#ccc] rounded-[6px] p-[7px_10px]"
          />
        </div>

        {/* <div className="input-group my-2">
          <label>Change Status</label>
          <select
                       className="border border-[#ccc] rounded-[6px] p-[7px_10px]"

          value={item?.response || quotationData?.status} onChange={(e) => setQuotationData({...quotationData , status :e.target.value})}>
            <option selected disabled value="">Change Status</option>
            <option value={1}>Support Reply</option>
            <option value={0}>Pending</option>
          </select>
        </div> */}

        <div className="flex gap-2 mt-3 items-center">
          <button
            onClick={() => {
              if (!quotationData?.notes?.trim()) {
                toast.warn("Please enter a note before saving.");
                return;
              }
              handleEditNote();
              setShowNoteModal(false);
            }}
            className="border p-2 border-(--main-blue-color) text-white bg-(--main-blue-color) flex justify-center items-center rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setShowNoteModal(false)}
            className="border p-2 border-(--main-blue-color) text-(--main-blue-color) flex justify-center items-center rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Edit Price Modal */}
      <Modal
        open={showEditPrice}
        onCancel={() => setShowEditPrice(false)}
        title="Edit Quotation Price"
        footer={null}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className="input-group w-full">
              <label>Price</label>
              <input
                type="number"
                value={quotationData?.price || rowData?.price}
                onChange={(e) =>
                  setQuotationData({ ...quotationData, price: e.target.value })
                }
                className="focus:!border-[2px] focus:!border-(--main-blue-color)"
              />
            </div>

            <div className="input-group w-full">
              <label>Weight in (Kg)</label>
              <input
                type="text"
                value={
                  quotationData?.weight || rowData?.quantity?.split("kg")[0]
                }
                onChange={(e) =>
                  setQuotationData({ ...quotationData, weight: e.target.value })
                }
                className="focus:!border-[2px] focus:!border-(--main-blue-color)"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-3 items-center">
            <button
              onClick={handleEditPrice}
              className="border p-2 border-(--main-blue-color) text-white bg-(--main-blue-color) flex justify-center items-center rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => setShowEditPrice(false)}
              className="border p-2 border-(--main-blue-color) text-(--main-blue-color) flex justify-center items-center rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
