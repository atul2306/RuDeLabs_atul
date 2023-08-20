import React, { useState } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import {
  ArchiveBook,
  Clipboard,
  MessageEdit,
  Recepit,
  Rotate,
  TransactionMinus,
  img5,
} from "../_components/imagepath";
import FeatherIcon from "feather-icons-react";
import Data from "../assets/jsons/customerDetails";
import { Table } from "antd";
import {
    onShowSizeChange,
    itemRender,
  } from "../_components/paginationfunction";
import "../_components/antd.css";
import { Link } from "react-router-dom";

const CustomerDetails = () => {

  const [menu, setMenu] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const datasource = Data?.Data;
  console.log(datasource);

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "Invoice",
      sorter: (a, b) => a.Invoice.length - b.Invoice.length,
    },
    {
      title: "Category",
      dataIndex: "Category",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Created On",
      dataIndex: "Created",
      sorter: (a, b) => a.Created.length - b.Created.length,
    },
    {
      title: "Total Amount",
      dataIndex: "Total",
      sorter: (a, b) => a.Total.length - b.Total.length,
    },
    {
      title: "Paid Amount",
      dataIndex: "Paid",
      sorter: (a, b) => a.Paid.length - b.Paid.length,
    },
    {
      title: "Payment Mode",
      dataIndex: "Payment",
      sorter: (a, b) => a.Payment.length - b.Payment.length,
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      sorter: (a, b) => a.Balance.length - b.Balance.length,
    },
    {
      title: "Due Date",
      dataIndex: "Due",
      sorter: (a, b) => a.Due.length - b.Due.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <span className="badge bg-success-light">{text}</span>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) => (
        <>
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className=" btn-action-icon "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <ul>
                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i className="far fa-trash-alt me-2"></i>
                    Delete
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/customer-details-paid">
                    <i className="far fa-bell me-2"></i>
                    Active
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/customer-details-cancel">
                    <i className="far fa-bell-slash me-2"></i>
                    In Active
                  </Link>
                </li>
              </ul>
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
          <div className="content customer-details container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="content-page-header">
                <h5>Customer Details</h5>
              </div>
            </div>
            {/* /Page Header */}
            <div className="card customer-details-group">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-img d-inline-flex">
                          <img className="rounded-circle" src={img5} alt="" />
                        </span>
                        <div className="customer-details-cont">
                          <h6>John Smith</h6>
                          <p>Cl-12345</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-mail">
                            <FeatherIcon icon="mail" />
                          </i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Email Address</h6>
                          <p>john@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-phone">
                            <FeatherIcon icon="phone" />
                          </i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Phone Number</h6>
                          <p>585-785-4840</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-airplay">
                            <FeatherIcon icon="airplay" />
                          </i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Company Name</h6>
                          <p>Kanakku Corporation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-globe">
                            <FeatherIcon icon="globe" />
                          </i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Website</h6>
                          <p className="customer-mail">www.example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-briefcase">
                            <FeatherIcon icon="briefcase" />
                          </i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Company Address</h6>
                          <p>4712 Cherry Ridge Drive Rochester, NY 14620.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            {/* Inovices card */}
            <div className="row">
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-info-light">
                        <img src={Recepit} alt="" />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Total Invoice</div>
                        <div className="dash-counts">
                          <p>$298</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of Invoice{" "}
                        <span className="rounded-circle bg-light-gray">02</span>
                      </p>
                      <p className="inovice-trending text-success-light">
                        02{" "}
                        <span className="ms-2">
                          {/* <i className="fe fe-trending-up" /> */}
                          <FeatherIcon icon="trending-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-primary-light">
                        <img src={TransactionMinus} alt="" />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Total Outstanding</div>
                        <div className="dash-counts">
                          <p>$325,215</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of Invoice{" "}
                        <span className="rounded-circle bg-light-gray">03</span>
                      </p>
                      <p className="inovice-trending text-success-light">
                        04{" "}
                        <span className="ms-2">
                          {/* <i className="fe fe-trending-up" /> */}
                          <FeatherIcon icon="trending-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-warning-light">
                        <img src={ArchiveBook} alt="" />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Total Overdue</div>
                        <div className="dash-counts">
                          <p>$7825</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of Invoice{" "}
                        <span className="rounded-circle bg-light-gray">01</span>
                      </p>
                      <p className="inovice-trending text-danger-light">
                        03{" "}
                        <span className="ms-2">
                          {/* <i className="fe fe-trending-down" /> */}
                          <FeatherIcon icon="trending-down" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-primary-light">
                        <img src={Clipboard} alt="" />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Cancelled</div>
                        <div className="dash-counts">
                          <p>100</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of Invoice{" "}
                        <span className="rounded-circle bg-light-gray">04</span>
                      </p>
                      <p className="inovice-trending text-danger-light">
                        05{" "}
                        <span className="ms-2">
                          {/* <i className="fe fe-trending-down" /> */}
                          <FeatherIcon icon="trending-down" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-green-light">
                        <img src={MessageEdit} alt="" />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Draft</div>
                        <div className="dash-counts">
                          <p>$125,586</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of Invoice{" "}
                        <span className="rounded-circle bg-light-gray">06</span>
                      </p>
                      <p className="inovice-trending text-danger-light">
                        02{" "}
                        <span className="ms-2">
                          {/* <i className="fe fe-trending-down" /> */}
                          <FeatherIcon icon="trending-down" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-danger-light">
                        <img src={Rotate} alt="" />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Recurring</div>
                        <div className="dash-counts">
                          <p>$86,892</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of Invoice{" "}
                        <span className="rounded-circle bg-light-gray">03</span>
                      </p>
                      <p className="inovice-trending text-success-light">
                        02{" "}
                        <span className="ms-2">
                          {/* <i className="fe fe-trending-up" /> */}
                          <FeatherIcon icon="trending-up" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Inovices card */}
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card-table">
                  <div className="card-body">
                    <div className="table-responsive table-hover customer-details table-striped">
                      <Table
                    //  className="table table-stripped table-hover datatable"
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        rowSelection={rowSelection}
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={datasource}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Table */}
            {/* Delete Items Modal */}
            <div
              className="modal custom-modal fade"
              id="delete_modal"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Delete Customer Details</h3>
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <Link
                            to="#"
                            data-bs-dismiss="modal"
                            className="btn btn-primary paid-continue-btn"
                          >
                            Delete
                          </Link>
                        </div>
                        <div className="col-6">
                          <Link
                            to="#"
                            data-bs-dismiss="modal"
                            className="btn btn-primary paid-cancel-btn"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Delete Items Modal */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
