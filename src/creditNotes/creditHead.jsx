import React from "react";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";

const CreditHead = ({show,setShow}) => {
  
  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Credit Notes</h5>
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
                  Filter
                </Link>
              </li>
              <li>
                <Link className="btn-filters" to="#">
                  <span>
                    {/* <i className="fe fe-settings" /> */}
                    <FeatherIcon icon="settings"/>
                  </span>
                </Link>
              </li>
              <li>
                <Link className="btn-filters" to="#">
                  <span>
                    {/* <i className="fe fe-grid" /> */}
                    <FeatherIcon icon="grid"/>
                  </span>
                </Link>
              </li>
              <li>
                <Link className="active btn-filters" to="#">
                  <span>
                    {/* <i className="fe fe-list" /> */}
                    <FeatherIcon icon="list"/>
                  </span>
                </Link>
              </li>
              <li>
                <Link className="btn btn-primary" to="/add-credit-notes">
                  <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                  Credit Notes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default CreditHead;
