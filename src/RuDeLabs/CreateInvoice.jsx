import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import RuDeLabsSideBar from "../layouts/RuDeLabsSideBar";
import RudeLabsHeader from "../layouts/RuDeLabsHeader";
import { useDispatch } from "react-redux";
import {
  AddInvoiceAction,
  ResetStoreAction,
  TotalAmountAction,
  TotalAmountReceivedAction,
} from "./redux/action/InvoiceAction";
import StartFireBase from "./firebase/FireBaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { AddExpenseAction } from "./redux/action/ExpenseAction";
const RuDeLabsCreateInvoice = () => {
  const [menu, setMenu] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState();
  const [organisation, setOrganisation] = useState();
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [amount, setAmount] = useState(0);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const dispatch = useDispatch();

  const saveInvoice = async () => {
    const db = StartFireBase();

    dispatch(TotalAmountAction(amount));

    try {
      await addDoc(collection(db, "invoice"), {
        Total: amount,
        Due: dueDate,
        Invoice: invoiceNo,
        Created: invoiceDate,
        Name: organisation,
        Status: "Pending",
      });
    } catch (error) {
      // Handle any errors that occurred during addDoc or getDocs
      console.log(error);
    }
  };

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
      if (amount.Status === "Paid") {
        dispatch(TotalAmountAction({ val: amount.Total, sign: "+" }));
        dispatch(TotalAmountReceivedAction(amount.Total));
      }

      const action = AddInvoiceAction({ ...idAdded });
      dispatch(action);
    });
  };

  useEffect(() => {
    getDataFromDb();
  }, []);

  useEffect(() => {
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("w-100"));
  }, []);

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <RudeLabsHeader onMenuClick={(value) => toggleMobileMenu()} />
        <RuDeLabsSideBar />

        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>Add Invoice</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group-item border-0 mb-0">
                      <div className="row align-item-center">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Invoice Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Invoice Number"
                              onChange={(e) => setInvoiceNo(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Organisation Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Organisation Name"
                              onChange={(e) => setOrganisation(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Invoice Date</label>
                            <div className="cal-icon cal-icon-info">
                              <DatePicker
                                className="datetimepicker form-control"
                                selected={invoiceDate}
                                onChange={(date) => setInvoiceDate(date)}
                              ></DatePicker>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Due Date</label>
                            <div className="cal-icon cal-icon-info">
                              <DatePicker
                                className="datetimepicker form-control"
                                selected={dueDate}
                                onChange={(date) => setDueDate(date)}
                              ></DatePicker>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Amount</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Amount( in Rs )"
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group-item border-0 p-0">
                      <div className="row">
                        <div className="col-xl-6 col-lg-12">
                          <div className="form-group-bank"></div>
                        </div>
                      </div>
                    </div>
                    <div className="add-customer-btns text-end">
                      <Link
                        type="reset"
                        className="btn btn-primary cancel me-2"
                        to="/RuDeLabsInvoiceList"
                      >
                        Cancel
                      </Link>
                      <Link
                        type="submit"
                        className="btn btn-primary"
                        onClick={saveInvoice}
                        to="/RuDeLabsInvoiceList"
                      >
                        Save Changes
                      </Link>
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
export default RuDeLabsCreateInvoice;
