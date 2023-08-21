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
import { useDispatch } from "react-redux";
import { AddInvoiceAction, ResetStoreAction, TotalAmountAction} from "./redux/action/InvoiceAction"
import StartFireBase from "./database/FireBaseConfig"
import { addDoc ,collection, getDocs } from "firebase/firestore"
import { async } from "regenerator-runtime";
import { Redirect  } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const RuDeLabsCreateInvoice = () => {
  const [menu, setMenu] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [invoiceNo , setInvoiceNo] =  useState()
  const [organisation , setOrganisation] =  useState()
  const [invoiceDate , setInvoiceDate] =  useState(new Date())
  const [dueDate , setDueDate] =  useState(new Date())
  const [amount , setAmount] =  useState(0)
  
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const dispatch = useDispatch()
  

  const saveInvoice = async()=>{

    
      const db = StartFireBase();
    dispatch(TotalAmountAction(amount))
     
        try {
          await addDoc(collection(db, "invoice"), {
            Total: amount,
            Due: dueDate,
            Invoice: invoiceNo,
            Created: invoiceDate,
            Name: organisation,
            Status:"Paid"
          });
        
          
          
        } catch (error) {
          // Handle any errors that occurred during addDoc or getDocs
          console.log(error);
        }
        
      

     
     
  
   
  }
   
   const getDataFromDb = async()=>{
      
    const db =  StartFireBase()
    const getData = await getDocs(collection(db,"invoice"))
    dispatch(ResetStoreAction());
    
    getData.forEach((invoice) => {
      const amount = invoice.data();
     dispatch(TotalAmountAction(amount.Total))

      const action = AddInvoiceAction({...invoice.data()})
       dispatch(action)
       // setReadData((initial)=>[...initial,{...invoice.data().data}])
    });
   }
   
  useEffect(()=>{
     
    getDataFromDb()

  },[])

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
                              onChange={(e)=>setInvoiceNo(e.target.value)}
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
                              onChange={(e)=>setOrganisation(e.target.value)}
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
                              onChange={(e)=>setAmount(e.target.value)}
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
                      <Link type="submit" className="btn btn-primary" onClick={saveInvoice} to="/RuDeLabsInvoiceList" >
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
