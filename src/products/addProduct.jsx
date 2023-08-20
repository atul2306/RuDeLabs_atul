import React, { useState } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Select2 from "react-select2-wrapper";
import { DropIcon } from "../_components/imagepath";
import TextEditor from "./editor";

const AddProduct = () => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const [category, setCategory] = useState([
    { id: 1, text: "Select Item Category" },
    { id: 2, text: "Category 1" },
    { id: 3, text: "Category 2" },
    { id: 4, text: "Category 3" },
  ]);

  const [units, setUnits] = useState([
    { id: 1, text: "Select Item Category" },
    { id: 2, text: "Pieces" },
    { id: 3, text: "Box" },
    { id: 4, text: "Kilograms" },
  ]);

  const [discount, setDiscount] = useState([
    { id: 1, text: "Enter Discount Amount" },
    { id: 2, text: "5%" },
    { id: 3, text: "10%" },
    { id: 4, text: "15%" },
  ]);

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="content-page-header">
              <h5>Add Products / Services</h5>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card-body">
                  <div className="form-group-item">
                    <h5 className="form-title">Basic Details</h5>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Item Type</label>
                          <div className="align-center">
                            <div className="form-control me-3">
                              <label className="custom_radio me-3 mb-0">
                                <input
                                  type="radio"
                                  className="form-control"
                                  name="payment"
                                  defaultChecked="true"
                                />
                                <span className="checkmark" /> Product
                              </label>
                            </div>
                            <div className="form-control">
                              <label className="custom_radio mb-0">
                                <input type="radio" name="payment" />
                                <span className="checkmark" /> Service
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Item Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Item Category</label>
                          <Select2
                                  // className="w-100"
                                  data={category}
                                  options={{
                                    placeholder: "Select Item Category",
                                  }}
                                />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Price</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Item Price"
                            name="name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Units</label>
                          <Select2
                                  // className="w-100"
                                  data={units}
                                  options={{
                                    placeholder: "Select Item Category",
                                  }}
                                />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group-item">
                    <div className="form-group">
                      <h5 className="form-title">Additional Details</h5>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label>Generate Barcode</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Barcode Number"
                          />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label>Purchase Price Without Tax</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address 1"
                          />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label>Purchase Price With Tax</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Tax Amount"
                          />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label>Quantity</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="eg 10"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="form-group" id="summernote_container">
                          <label className="form-control-label">Details</label>
                          <TextEditor/>
                          {/* <textarea
                            className="summernote form-control"
                            placeholder="Description"
                            defaultValue={""}
                          /> */}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="form-group">
                          <label>Image</label>
                          <div className="form-group service-upload mb-0">
                            <span>
                              <img
                                src={DropIcon}
                                alt="upload"
                              />
                            </span>
                            <h6 className="drop-browse align-center">
                              Drop your files here or
                              <span className="text-primary ms-1">browse</span>
                            </h6>
                            <p className="text-muted">Maximum size: 50MB</p>
                            <input type="file" multiple="" id="image_sign" />
                            <div id="frames" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group-item border-0 pb-0">
                    <div className="form-group">
                      <h5 className="form-title">Discount Details</h5>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Discount (%)</label>
                          <ul className="form-group-plus css-equal-heights">
                            <li>
                          <Select2
                                  // className="w-100"
                                  data={discount}
                                  options={{
                                    placeholder: "Select Item Category",
                                  }}
                                />
                            </li>
                            <li>
                              <span className="btn btn-gray form-plus-btn">
                                %
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Discount Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Discount Amount"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Minimum Stock Qty</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="eg 10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      type="reset"
                      className="btn btn-primary cancel me-2"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Item
                    </button>
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

export default AddProduct;
