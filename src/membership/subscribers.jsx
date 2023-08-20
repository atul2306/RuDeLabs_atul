import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { Pagination, Table } from "antd";
import Data from "../assets/jsons/subscription";
import FeatherIcon from "feather-icons-react";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import AddVendor from "../vendors/addVendor";

const Subscribers = () => {
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
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Provider Name",
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
              {record.Name} <span>{record.email}</span>
            </Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
        title: "Subscription",
        dataIndex: "Subscription",
        sorter: (a, b) => a.Subscription.length - b.Subscription.length,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount.length - b.Amount.length,
    },
    {
      title: "Subscription Duration",
      dataIndex: "Durations",
      sorter: (a, b) => a.Durations.length - b.Durations.length,
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      sorter: (a, b) => a.StartDate.length - b.StartDate.length,
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      sorter: (a, b) => a.EndDate.length - b.EndDate.length,
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
                <h5>Subscribers</h5>
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
                          {/* <i className="fe fe-grid" /> */}
                          <FeatherIcon icon="grid"/>
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="active btn-filters"
                        to="#"
                      >
                        <span>
                          {/* <i className="fe fe-list" /> */}
                          <FeatherIcon icon="list"/>
                        </span>{" "}
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
                  <div className="card-body subscribers">
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
            {/* /Table */}
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

export default Subscribers;
