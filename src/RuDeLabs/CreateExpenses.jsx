import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { Logo, signature, circle1, circle2 } from "../_components/imagepath";
import FeatherIcon from "feather-icons-react";
import Select2 from "react-select2-wrapper";
import RuDeLabsSideBar from "../layouts/RuDeLabsSideBar";
import RudeLabsHeader from "../layouts/RuDeLabsHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  AddInvoiceAction,
  ResetStoreAction,
  TotalAmountAction,
} from "./redux/action/InvoiceAction";
import StartFireBase from "./firebase/FireBaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { async } from "regenerator-runtime";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { event } from "jquery";
import { AddExpenseAction } from "./redux/action/ExpenseAction";
const RuDeLabsCreateExpense = () => {
  const [menu, setMenu] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(0);
  const [expenseStatus, setExpenseStatus] = useState("");

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const dispatch = useDispatch();

  const saveInvoice = async () => {
    const db = StartFireBase();

    try {
      await addDoc(collection(db, "expense"), {
        ExpenseID: expenseId,
        Product: product,
        Amount: amount,
        Expense: expenseDate,
        Status: "Pending",
      });
    } catch (error) {
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
      if (amount.Status === "Paid")
        dispatch(TotalAmountAction({ val: amount.Total, sign: "+" }));

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
                <h5>Add Expenses</h5>
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
                            <label>Expense ID</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Expense Id"
                              onChange={(e) => setExpenseId(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Product</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Product"
                              onChange={(e) => setProduct(e.target.value)}
                            />
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
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Expense Date</label>
                            <div className="cal-icon cal-icon-info">
                              <DatePicker
                                className="datetimepicker form-control"
                                selected={expenseDate}
                                onChange={(date) => setExpenseDate(date)}
                              ></DatePicker>
                            </div>
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
                        to="/RuDeLabsExpenseList"
                      >
                        Cancel
                      </Link>
                      <Link
                        type="submit"
                        className="btn btn-primary"
                        onClick={saveInvoice}
                        to="/RuDeLabsExpenseList"
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

export default RuDeLabsCreateExpense;
