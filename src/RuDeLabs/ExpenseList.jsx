import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import "../_components/antd.css";
import { Button, DatePicker, Input, Pagination, Space, Table } from "antd";
import Data from "../assets/jsons/expenses";
import FeatherIcon from "feather-icons-react";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import AddVendor from "../vendors/addVendor";
import RuDeLabsSideBar from "../layouts/RuDeLabsSideBar";
import { SearchOutlined } from "@ant-design/icons";

import RudeLabsHeader from "../layouts/RuDeLabsHeader";
import { useEffect } from "react";
import StartFireBase from "./firebase/FireBaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  AddExpenseAction,
  ExpenseAmountAction,
} from "./redux/action/ExpenseAction";
import {
  AddInvoiceAction,
  ResetStoreAction,
  TotalAmountAction,
} from "./redux/action/InvoiceAction";

const RuDeLabsExpenseList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [selectedRowId, setSelectedRowId] = useState("");
  const [selectedRowAmount, setSelectedRowAmount] = useState("");
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  const getDataFromDb = async () => {
    const db = StartFireBase();
    const getDataInvoice = await getDocs(collection(db, "invoice"));
    const getDataExpense = await getDocs(collection(db, "expense"));
    dispatch(ResetStoreAction());

    getDataExpense.forEach((expense) => {
      const amount = expense.data();
      const idAdded = { ...amount, id: expense.id };
      if (amount.Status === "Paid")
        dispatch(TotalAmountAction({ val: amount.Amount, sign: "-" }));

      const action = AddExpenseAction({ ...idAdded });
      dispatch(action);
    });
    getDataInvoice.forEach((invoice) => {
      const amount = invoice.data();
      const idAdded = { ...amount, id: invoice.id };
      if (amount.Status === "Paid")
        dispatch(TotalAmountAction({ val: amount.Total, sign: "+" }));

      const action = AddInvoiceAction({ ...idAdded });
      dispatch(action);
    });
  };

  useEffect(() => {
    getDataFromDb();
  }, []);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const formatTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const expense = useSelector((state) => state.allExpense.expenses);
  const amount = useSelector((state) => state.allAmount);

  const updatedExpense = expense.map((data) => {
    const expense_Data = data.Expense.seconds;
    return {
      ...data,
      Expense: formatTimestampToDateTime(expense_Data),
    };
  });

  const handleOptionSelect = async (option) => {
    try {
      const db = StartFireBase();
      const docRef = doc(db, "expense", selectedRowId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        // const documentData = docSnapshot.data();
        await updateDoc(docRef, {
          Status: option,
        });
        getDataFromDb();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onRowClick = (record) => {
    if (Number(selectedRowAmount) > Number(amount)) {
      setValid(true);
    }
    
    return {
      onClick: () => {
        setSelectedRowId(record.id);
        setSelectedRowAmount(record.Amount);
      },
    };
  };

  const checkValid = () => {
    
  };

  // const datasource = Data?.Data;

  const columns = [
    {
      title: "Expense ID",
      dataIndex: "ExpenseID",
      sorter: (a, b) => a.ExpenseID.length - b.ExpenseID.length,
      ...getColumnSearchProps("ExpenseID"),
    },
    {
      title: "Product",
      dataIndex: "Product",
      sorter: (a, b) => a.Product.length - b.Product.length,
      ...getColumnSearchProps("Product"),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount.length - b.Amount.length,
      ...getColumnSearchProps("Amount"),
    },
    {
      title: "Expense Date",
      dataIndex: "Expense",
      sorter: (a, b) => a.Created.length - b.Created.length,
      ...getColumnSearchProps("Expense"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <div>
            {text === "Paid" && (
              <span className="badge bg-success-light text-success-light">
                {text}
              </span>
            )}
            {text === "Pending" && (
              <span className="badge bg-warning-light text-warning-light">
                {text}
              </span>
            )}
          </div>
          {text === "Pending" && (
            <div className="dropdown dropdown-action">
              <Link
                className=" btn-action-icon "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={checkValid}
              >
                <i className="fas fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <ul>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={(event) => {
                        event.preventDefault();
                        if(!valid)
                        handleOptionSelect("Paid");
                      }}
                    >
                      Paid
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={(event) => {
                        event.preventDefault();
                        if(!valid)
                        handleOptionSelect("Pending");
                      }}
                    >
                      Pending
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
  ];

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <RudeLabsHeader onMenuClick={(value) => toggleMobileMenu()} />
        <RuDeLabsSideBar />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="row">
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div className="dash-count">
                        <div className="dash-title">Remaining Amount</div>
                        <div className="dash-counts">
                          <p>{amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Page Header */}
            <div className="page-header">
              <div className="content-page-header">
                <h5>Expenses</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link
                        className="btn btn-primary"
                        to="/RuDeLabsCreateExpense"
                      >
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Add Expense
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card-table">
                  <div className="card-body purchase">
                    <div className="table-responsive table-hover">
                      <Table
                        pagination={{
                          total: updatedExpense.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={updatedExpense}
                        onRow={onRowClick}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Table */}
          </div>
        </div>

        {/* <AddVendor 
          setShow={setShow}
          show={show}
        /> */}

        {/* <div className="modal custom-modal fade" id="add_expenses" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Expenses</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Expense ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Expense ID"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Amount </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Amount"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Expense Date</label>
                            <div className="cal-icon cal-icon-info">
                              <DatePicker
                                className="datetimepicker form-control"
                                selected={expenseDate}
                              />
                            </div>
                          </div>
                        </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Payment Status</label>
                              <Select2
                                // className="w-100"
                                data={payment}
                                options={{
                                  placeholder: "Select Payment Status",
                                }}
                                
                              />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  href="/RuDeLabsExpenseList"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  href="/RuDeLabsExpenseList"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                >
                  Add Expenses
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default RuDeLabsExpenseList;
