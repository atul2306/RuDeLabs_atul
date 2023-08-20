import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import "../_components/antd.css";
import { Table } from "antd";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import Data from "../assets/jsons/ledger";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import AddVendor from "./addVendor";
import DatePicker from "react-datepicker";

const AddLedger = () => {
  const [menu, setMenu] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("w-100"));
  }, []);

  const datasource = Data?.Data;

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text, record) => (
        <>
          <h2 className="table-avatar">
            <Link to="/profile" className="avatar avatar-sm me-2">
              <img
                className="avatar-img rounded-circle"
                src={record.img}
                alt="User Image"
              />
            </Link>
            <Link to="/profile">
              {record.Name} <span>{record.Phone}</span>
            </Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Reference",
      dataIndex: "Reference",
      sorter: (a, b) => a.Reference.length - b.Reference.length,
    },
    {
      title: "Created",
      dataIndex: "Created",
      sorter: (a, b) => a.Created.length - b.Created.length,
    },
    {
      title: "Mode",
      dataIndex: "Mode",
      render: (text, record) => (
        <div>
          {text === "Credit" && (
            <span className="text-success-light">{text}</span>
          )}
          {text === "Debit" && (
            <span className="text-danger-light">{text}</span>
          )}
        </div>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action">
          <Link
            to="#"
            className=" btn-action-icon "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <ul>
              <li>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_ledger"
                >
                  <i className="far fa-edit me-2" />
                  Edit
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_modal"
                >
                  <i className="far fa-trash-alt me-2" />
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ),
      sorter: (a, b) => a.Action.length - b.Action.length,
    },
  ];

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="content-page-header">
                <h5>Ledger</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link className="btn btn-filters w-auto popup-toggle">
                        <span className="me-2">
                          <FeatherIcon icon="filter" />
                        </span>
                        Filter{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn-filters" to="#">
                        <span>
                          <FeatherIcon icon="grid" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="active btn-filters" to="#">
                        <span>
                          <FeatherIcon icon="list" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-primary"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add_ledger"
                      >
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Create Ledger
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
                  <div className="card-body ledger">
                    <div className="table-responsive table-striped table-hover">
                      <Table
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={datasource}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Table */}
          </div>
        </div>

        <AddVendor />

        {/* Add Ledger */}
        <div className="modal custom-modal fade" id="add_ledger" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Ledger</h4>
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
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Date</label>
                      <div className="cal-icon cal-icon-info">
                        <DatePicker
                          className="datetimepicker form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        ></DatePicker>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Reference</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Reference Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group d-inline-flex align-center mb-0">
                      <label className="me-5 mb-0">Mode</label>
                      <div>
                        <label className="custom_radio me-3 mb-0">
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked="true"
                          />
                          <span className="checkmark" /> Debit
                        </label>
                        <label className="custom_radio mb-0">
                          <input type="radio" name="payment" />
                          <span className="checkmark" /> Credit
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                >
                  Submit
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Ledger */}

        {/* Edit Ledger */}
        <div className="modal custom-modal fade" id="edit_ledger" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Edit Ledger</h4>
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
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="John Smith"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="19 Dec 2022"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Reference</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={25689825}
                        placeholder="Enter Reference Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-0">
                      <label>Mode</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Credit"
                        placeholder="Enter Reference Number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Ledger */}

        {/* Delete Ledger */}
        <div
          className="modal custom-modal fade"
          id="delete_modal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Ledger</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="reset"
                        data-bs-dismiss="modal"
                        className="w-100 btn btn-primary paid-continue-btn"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="w-100 btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Ledger */}
      </div>
    </>
  );
};

export default AddLedger;
