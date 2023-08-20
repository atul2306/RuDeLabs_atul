import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import "../_components/antd.css";
import { Pagination, Table } from "antd";
import Data from "../assets/jsons/transaction";
import FeatherIcon from "feather-icons-react";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import AddVendor from "../vendors/addVendor";

const Transaction = () => {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const datasource = Data?.Data;
  console.log(datasource);

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      sorter: (a, b) => a.Id.length - b.Id.length,
    },
    {
      title: "Type",
      dataIndex: "Type",
      sorter: (a, b) => a.Type.length - b.Type.length,
    },
    {
        title: "Amount",
        dataIndex: "Amount",
        render: (text, record) => (
          <div>
            {text === "+$350" && <span className="text-danger">{text}</span>}
            {text === "+$650" && (
              <span className="text-success-light">{text}</span>
            )}
            {text === "+100" && (
              <span className="text-success-light">{text}</span>
            )}
            {text === "-$650" && (
              <span className="text-success-light">{text}</span>
            )}
            {text === "+$100" && (
              <span className="text-success-light">{text}</span>
            )}
          </div>
        ),
        sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Payment Type",
      dataIndex: "Payment",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <div>
          {text === "Completed" && (
            <span className="badge badge-pill bg-success-light">{text}</span>
          )}
          {text === "Cancel" && (
            <span className="badge badge-pill bg-danger-light">{text}</span>
          )}
        </div>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
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
                <h5>Transactions</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link className="btn btn-filters w-auto popup-toggle"
                        onClick={() => setShow(!show)}
                      >
                        <span className="me-2">
                          {/* <i className="fe fe-filter" /> */}
                          <FeatherIcon icon="filter"/>
                        </span>
                        Filter{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn-filters" to="#">
                        <span>
                          {/* <i className="fe fe-list" /> */}
                          <FeatherIcon icon="list"/>
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="active btn-filters"
                        to="#"
                      >
                        <span>
                          {/* <i className="fe fe-grid" /> */}
                          <FeatherIcon icon="grid"/>
                        </span>{" "}
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
                <div className="card-table">
                  <div className="card-body Transaction">
                    <div className="table-responsive table-hover">
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

      </div>
    </>
  );
};

export default Transaction;
