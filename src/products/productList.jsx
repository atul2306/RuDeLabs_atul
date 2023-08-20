import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import FeatherIcon from "feather-icons-react";
import Data from "../assets/jsons/productList";
import "../_components/antd.css";
import { Table } from "antd";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import AddVendor from "../vendors/addVendor";
import { FilterChart, search } from "../_components/imagepath";

const ProductList = () => {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const datasource = Data?.Data;
  console.log(datasource);

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      sorter: (a, b) => a.Id.length - b.Id.length,
    },
    {
      title: "Item",
      dataIndex: "Item",
      sorter: (a, b) => a.Item.length - b.Item.length,
    },
    {
      title: "Code",
      dataIndex: "Code",
      sorter: (a, b) => a.Code.length - b.Code.length,
    },
    {
      title: "Category",
      dataIndex: "Category",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Units",
      dataIndex: "Units",
      sorter: (a, b) => a.Units.length - b.Units.length,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      sorter: (a, b) => a.Quantity.length - b.Quantity.length,
    },
    {
      title: "Sales Price",
      dataIndex: "Sales",
      sorter: (a, b) => a.Sales.length - b.Sales.length,
    },
    {
      title: "Purchase Price",
      dataIndex: "Purchase",
      sorter: (a, b) => a.Purchase.length - b.Purchase.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) => (
        <div className="d-flex align-items-center">
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
                  <Link className="dropdown-item" to="/edit-product">
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
                <h5>Products / Services</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link className="btn btn-filters w-auto popup-toggle"
                      onClick={() => setShow(!show)}
                      >
                        <span className="me-2">
                          {/* <i className="fe fe-filter" /> */}
                          <FeatherIcon icon="filter" />
                        </span>
                        Filter{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn-filters" to="#">
                        <span>
                          {/* <i className="fe fe-grid" /> */}
                          <FeatherIcon icon="grid" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="active btn-filters me-2" to="#">
                        <span>
                          {/* <i className="fe fe-list" /> */}
                          <FeatherIcon icon="list" />
                        </span>{" "}
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
                            {/* <i className="fe fe-download" /> */}
                            <FeatherIcon icon="download" />
                          </span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
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
                      <Link className="btn-filters me-2" to="#">
                        <span>
                          {/* <i className="fe fe-printer" /> */}
                          <FeatherIcon icon="printer" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn btn-import me-2" to="#">
                        <span>
                          {/* <i className="fe fe-inbox me-2" />  */}
                          <FeatherIcon icon="inbox" className="me-2"/>
                          Import
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link className="btn btn-primary" to="/add-product">
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Add Product
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
            {/* All Invoice */}
            <div className="card invoices-tabs-card">
              <div className="invoices-main-tabs">
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <div className="invoices-tabs">
                      <ul>
                        <li>
                          <Link to="/product-list" className="active">
                            Product
                          </Link>
                        </li>
                        <li>
                          <Link to="/category">Category</Link>
                        </li>
                        <li>
                          <Link to="/units">Units</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /All Invoice */}
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className=" card-table">
                  <div className="card-body">
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

        <div className={`toggle-sidebar ${show ? 'open-filter' : '' }`}>
          <div className="sidebar-layout-filter">
            <div className="sidebar-header">
              <h5>Filter</h5>
              <Link to="#" className="sidebar-closes" onClick={() => setShow(!show)}>
                <i className="fa-regular fa-circle-xmark" />
              </Link>
            </div>
            <div className="sidebar-body">
              <form action="#" autoComplete="off">
                {/* Customer */}
                <div className="accordion" id="accordionMain1">
                  <div className="card-header-new" id="headingOne">
                    <h6 className="filter-title">
                      <Link
                        to="#"
                        className="w-100"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Customer
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h6>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample1"
                  >
                    <div className="card-body-chat">
                      <div className="row">
                        <div className="col-md-12">
                          <div id="checkBoxes1">
                            <div className="form-custom">
                              <input
                                type="text"
                                className="form-control"
                                id="member_search1"
                                placeholder="Search here"
                              />
                              <span>
                                <img
                                  src={search}
                                  alt="img"
                                />
                              </span>
                            </div>
                            <div className="selectBox-cont">
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> Brian Johnson
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> Russell Copeland
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> Greg Lynch
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> John Blair
                              </label>
                              {/* View All */}
                              <div className="view-content">
                                <div className="viewall-One">
                                  <label className="custom_check w-100">
                                    <input type="checkbox" name="username" />
                                    <span className="checkmark" /> Barbara Moore
                                  </label>
                                  <label className="custom_check w-100">
                                    <input type="checkbox" name="username" />
                                    <span className="checkmark" /> Hendry Evan
                                  </label>
                                  <label className="custom_check w-100">
                                    <input type="checkbox" name="username" />
                                    <span className="checkmark" /> Richard Miles
                                  </label>
                                </div>
                                <div className="view-all">
                                  <Link to="#" className="viewall-button-One">
                                    <span className="me-2">View All</span>
                                    <span>
                                      <i className="fa fa-circle-chevron-down" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                              {/* /View All */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Customer */}
                {/* Select Date */}
                <div className="accordion" id="accordionMain2">
                  <div className="card-header-new" id="headingTwo">
                    <h6 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Select Date
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h6>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample2"
                  >
                    <div className="card-body-chat">
                      <div className="form-group">
                        <label className="form-control-label">From</label>
                        <div className="cal-icon">
                          <input
                            type="email"
                            className="form-control datetimepicker"
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-control-label">To</label>
                        <div className="cal-icon">
                          <input
                            type="email"
                            className="form-control datetimepicker"
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Select Date */}
                {/* By Status */}
                <div className="accordion" id="accordionMain3">
                  <div className="card-header-new" id="headingThree">
                    <h6 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        By Status
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h6>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample3"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes2">
                        <div className="form-custom">
                          <input
                            type="text"
                            className="form-control"
                            id="member_search2"
                            placeholder="Search here"
                          />
                          <span>
                            <img src={search} alt="img" />
                          </span>
                        </div>
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> All Invoices
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Paid
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Overdue
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Draft
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Recurring
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Cancelled
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /By Status */}
                {/* Category */}
                <div className="accordion accordion-last" id="accordionMain4">
                  <div className="card-header-new" id="headingFour">
                    <h6 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="true"
                        aria-controls="collapseFour"
                      >
                        Category
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h6>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample4"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes3">
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> Advertising
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> Food
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> Repairs
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> Software
                          </label>
                          {/* View All */}
                          <div className="view-content">
                            <div className="viewall-Two">
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> Stationary
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> Medical
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" /> Designing
                              </label>
                            </div>
                            <div className="view-all">
                              <Link to="#" className="viewall-button-Two">
                                <span className="me-2">View All</span>
                                <span>
                                  <i className="fa fa-circle-chevron-down" />
                                </span>
                              </Link>
                            </div>
                          </div>
                          {/* /View All */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Category */}
                <button
                  type="submit"
                  className="d-inline-flex align-items-center justify-content-center btn w-100 btn-primary"
                >
                  <span>
                    <img
                      src={FilterChart}
                      className="me-2"
                      alt="Generate report"
                    />
                  </span>
                  Generate report
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="modal custom-modal fade" id="delete_modal" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Products / Services</h3>
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

export default ProductList;
