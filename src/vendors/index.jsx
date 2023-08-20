import React, { useState } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import "../_components/antd.css";
import { Table } from "antd";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import Data from "../assets/jsons/vendors";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import AddVendor from "./addVendor";

const Vendors = () => {

  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const datasource = Data?.Data;

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (text, record) => (
        <>
          <h2 className="table-avatar">
            <Link to="/profile" className="avatar avatar-md me-2">
              <img
                className="avatar-img rounded-circle"
                src={record.img}
                alt="User Image"
              />
            </Link>
            <Link to="/profile">
              {record.Name} <span>{record.email}</span>
            </Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      sorter: (a, b) => a.Phone.length - b.Phone.length,
    },
    {
      title: "Created",
      dataIndex: "Created",
      sorter: (a, b) => a.Created.length - b.Created.length,
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      sorter: (a, b) => a.Balance.length - b.Balance.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) => (
        <>
          <div className="d-flex align-items-center">
            <Link to="/add-ledger" className="btn btn-greys me-2">
              <i className="fa fa-eye me-1" /> Ledger
            </Link>
            <div className="dropdown dropdown-action">
              <Link
                to="#"
                className=" btn-action-icon "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <ul>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_vendor"
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
          </div>
        </>
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
              <div className="content-page-header ">
                <h5>Vendors</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link className="btn btn-filters w-auto popup-toggle"
                      onClick={() => setShow(!show)}
                      >
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
                      <Link className="active btn-filters me-2" to="#">
                        <span>
                          <FeatherIcon icon="list" />
                        </span>
                      </Link>
                    </li>
                    <li className="">
                      <div className="dropdown dropdown-action">
                        <Link
                          to="#"
                          className="btn-filters me-2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            <FeatherIcon icon="download" />
                          </span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="d-block">
                            <li>
                              <Link
                                className="d-flex align-items-center download-item"
                                to="#"
                                download=""
                              >
                                <i className="far fa-file-pdf me-2" />
                                PDF
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex align-items-center download-item"
                                to="#"
                                download=""
                              >
                                <i className="far fa-file-text me-2" />
                                CVS
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link className="btn-filters" to="#">
                        <span>
                          <FeatherIcon icon="printer" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn btn-import" to="#">
                        <span>
                          <FeatherIcon icon="check-square" className="me-2" />{" "}
                          Import
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-primary"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add_vendor"
                      >
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Add Vendors
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div id="filter_inputs" className="card filter-card">
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Search Filter */}
            <div className="row">
              <div className="col-sm-12">
                <div className=" card-table">
                  <div className="card-body vendors">
                    <div className="table-responsive table-hover table-striped">
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
          </div>
        </div>

        <AddVendor 
          setShow={setShow}
          show={show}
        />

        <div className="modal custom-modal fade" id="add_vendor" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Vendor</h4>
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
                  <div className="col-lg-12 col-sm-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-12">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-12">
                    <div className="form-group mb-0">
                      <label>Balance</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Balance Amount"
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
                  Add Vendor
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="modal custom-modal fade" id="edit_vendor" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Edit Vendor</h4>
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
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="john@example.com"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="+1 989-438-3131"
                        placeholder="Enter Reference Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-0">
                      <label>Balance</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="$4200"
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

        <div
          className="modal custom-modal fade"
          id="delete_modal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Vendor</h3>
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

      </div>
    </>
  );
};

export default Vendors;
