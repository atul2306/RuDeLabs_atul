import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { img10 } from "../_components/imagepath";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

const EditCustomer = () => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const [currencyOptions, setcurrencyOptions] = useState([
    { id: 1, text: "₹" },
    { id: 2, text: "$" },
    { id: 3, text: "£" },
    { id: 4, text: "€" },
  ]);

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
                <h5>Edit Customers</h5>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <form action="#">
                  <div className="card-body">
                    <div className="form-group-item">
                      <h5 className="form-title">Basic Details</h5>
                      <div className="profile-picture">
                        <div className="upload-profile">
                          <div className="profile-img">
                            <img
                              id="blah"
                              className="avatar"
                              src={img10}
                              alt=""
                            />
                          </div>
                          <div className="add-profile">
                            <h5>Upload a New Photo</h5>
                            <span>Profile-pic.jpg</span>
                          </div>
                        </div>
                        <div className="img-upload">
                          <label className="btn btn-primary">
                            Upload <input type="file" />
                          </label>
                          <Link className="btn btn-remove">Remove</Link>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
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
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue="john@example.com"
                              placeholder="Enter Email Address"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Phone</label>
                            <IntlTelInput
                              containerClassName="intl-tel-input"
                              inputClassName="form-control mail-icon2"
                              placeholder="989-438-3131" 
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Currency</label>
                            <Select2
                            className="w-100"
                            data={currencyOptions}
                            options={{
                              placeholder: "Currency",
                            }}
                          />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="www.example.com"
                              placeholder="Enter Website Address"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Notes</label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue="Lorem Ipsum is simply dummy"
                              placeholder="Enter Your Notes"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group-item">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="billing-btn mb-2">
                            <h5 className="form-title">Billing Address</h5>
                          </div>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="John Smith"
                              placeholder="Enter Name"
                            />
                          </div>
                          <div className="form-group">
                            <label>Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="4581 Sunny Glen Lane"
                              placeholder="Enter Address 1"
                            />
                          </div>
                          <div className="form-group">
                            <label>Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Cleveland, OH 44106"
                              placeholder="Enter Address 1"
                            />
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Country</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Australia"
                                  placeholder="Country"
                                />
                              </div>
                              <div className="form-group">
                                <label>City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Melbourne"
                                  placeholder="City"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>State</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Victoria"
                                  placeholder="State"
                                />
                              </div>
                              <div className="form-group">
                                <label>Pincode</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={3000}
                                  placeholder="Pincode"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="billing-btn">
                            <h5 className="form-title mb-0">
                              Shipping Address
                            </h5>
                            <Link to="#" className="btn btn-primary">
                              Copy from Billing
                            </Link>
                          </div>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="John Smith"
                              placeholder="Enter Name"
                            />
                          </div>
                          <div className="form-group">
                            <label>Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="4581 Sunny Glen Lane"
                              placeholder="Enter Address 1"
                            />
                          </div>
                          <div className="form-group">
                            <label>Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Cleveland, OH 44106"
                              placeholder="Enter Address 1"
                            />
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>Country</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Australia"
                                  placeholder="Country"
                                />
                              </div>
                              <div className="form-group">
                                <label>City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Melbourne"
                                  placeholder="City"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                              <div className="form-group">
                                <label>State</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Victoria "
                                  placeholder="State"
                                />
                              </div>
                              <div className="form-group">
                                <label>Pincode</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={3000}
                                  placeholder="Pincode"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group-customer customer-additional-form">
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <h5 className="form-title">
                              Additional Details{" "}
                              <span className="optional">(Optional)</span>
                            </h5>
                          </div>
                          <div className="form-group">
                            <label>
                              Discount <span className="optional">(%)</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={1}
                              placeholder="Enter Discount"
                            />
                          </div>
                          <div className="form-group notes-form-group">
                            <label>Notes</label>
                            <textarea
                              className="form-control"
                              placeholder="Enter Your Description"
                              defaultValue={"Lorem Ipsum is simply dummy"}
                            />
                          </div>
                          <div className="form-group">
                            <div className="check-mark-status d-flex justify-content-between">
                              <h6 className="label-text">TDS</h6>
                              <div className="status-toggle">
                                <input
                                  id="rating_1"
                                  className="check"
                                  type="checkbox"
                                  defaultChecked="true"
                                />
                                <label
                                  htmlFor="rating_1"
                                  className="checktoggle checkbox-bg"
                                >
                                  checkbox
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <h5 className="form-title">
                              Company Details{" "}
                              <span className="optional">(Optional)</span>
                            </h5>
                          </div>
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Kanakku"
                              placeholder="Enter Company Name"
                            />
                          </div>
                          <div className="form-group">
                            <label>GST No</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={123456}
                              placeholder="Enter GST Nuber"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                          <div className="form-group">
                            <h5 className="form-title">
                              Opening Balance{" "}
                              <span className="optional">(Optional)</span>
                            </h5>
                          </div>
                          <div className="form-group">
                            <label>Opening Balance</label>
                            <div className="">
                              <label className="custom_radio me-3">
                                <input
                                  type="radio"
                                  name="payment"
                                  defaultChecked="true"
                                />
                                <span className="checkmark" /> Debit
                              </label>
                              <label className="custom_radio">
                                <input type="radio" name="payment" />
                                <span className="checkmark" /> Credit
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Debit Amount</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="$200"
                              placeholder="Enter Debit Amount"
                            />
                          </div>
                          <div className="form-group">
                            <label>Balance</label>
                            <input
                              type="text"
                              className="form-control bg-blue-light border-0"
                              placeholder="$ 100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="add-customer-btns text-end">
                      <Link
                        to="#"
                        type="reset"
                        className="btn customer-btn-cancel"
                      >
                        Cancel
                      </Link>
                      <Link
                        to="/customers"
                        type="submit"
                        className="btn customer-btn-save"
                      >
                        Save Changes
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditCustomer;
