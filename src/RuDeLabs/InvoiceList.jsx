import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../_components/antd.css";
import { Button, Input, Pagination, Space, Table } from "antd";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import Highlighter from 'react-highlight-words'
import AddVendor from "../vendors/addVendor";
import RuDeLabsSideBar from "../layouts/RuDeLabsSideBar";
import RudeLabsHeader from "../layouts/RuDeLabsHeader";
import StartFireBase from "./database/FireBaseConfig";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { AddInvoiceAction, ResetStoreAction, TotalAmountAction } from "./redux/action/InvoiceAction";
import {SearchOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useRef } from "react";
 
const RuDeLabsInvoiceList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
   
  const [menu, setMenu] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [show, setShow] = useState(false);
  const [invoiceData, setInvoiceData]= useState([])
  const dispatch= useDispatch()

  const getDataFromDb = async()=>{
    
    const db =  StartFireBase()
    const getData = await getDocs(collection(db,"invoice"))
    dispatch(ResetStoreAction());

    getData.forEach((invoice) => {
      const amount = invoice.data();
     dispatch(TotalAmountAction(amount.Total))
      const action = AddInvoiceAction({...invoice.data()})
       dispatch(action)
    });
   }
   
  useEffect(()=>{
      
    getDataFromDb()

  },[])

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  
  const formatTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(); // Adjust the format as needed
  };


  const invoice = useSelector((state)=>state.allInvoice.invoices)
  const amount = useSelector((state)=>state.allAmount)
  
  const updatedInvoice = invoice.map((data) => {
     const Due_Data= data.Due.seconds
     const Created_Data= data.Created.seconds
    return {
      ...data,
      Due: formatTimestampToDateTime(Due_Data),
      Created: formatTimestampToDateTime(Created_Data),
      
      
    };
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "Invoice",
      render: (text, record) => (
        <Link to="/invoice-details" className="invoice-link">
          {record.Invoice}
        </Link>
      ),
      sorter: (a, b) => a.Invoice.length - b.Invoice.length,
      ...getColumnSearchProps("Invoice")
    },
    {
      title: "Created On",
      dataIndex: "Created",
      sorter: (a, b) => a.Created.length - b.Created.length,
      ...getColumnSearchProps("Created")

    },
    {
      title: "Invoice To",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.length - b.Name.length,
      ...getColumnSearchProps("Name")

    },
    {
      title: "Total Amount",
      dataIndex: "Total",
      sorter: (a, b) => a.Total.length - b.Total.length,
      ...getColumnSearchProps("Total")
      
    },
    {
      title: "Due Date",
      dataIndex: "Due",
      sorter: (a, b) => a.Due.length - b.Due.length,
      ...getColumnSearchProps("Due")

    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <span className="badge bg-success-light">{text}</span>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
      ...getColumnSearchProps("Status")

    },
    
  ];

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <RudeLabsHeader onMenuClick={(value) => toggleMobileMenu()} />
        <RuDeLabsSideBar />
        
        <div className="page-wrapper">
          <div className="content container-fluid">
          <div className="row">
        <div className="col-xl-2 col-lg-4 col-sm-6 col-12 d-flex">
          <div className="card inovices-card w-100">
            <div className="card-body">
              <div className="dash-widget-header">
                <div className="dash-count">
                  <div className="dash-title">Total Amount</div>
                  <div className="dash-counts">
                    <p>${amount}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div> 
            <div className="page-header">
        <div className="content-page-header">
          <h5>Invoices</h5>
          <div className="list-btn">
            <ul className="filter-list">
              <li>
                <Link className="btn btn-primary" to="/RuDeLabsCreateInvoice">
                  <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                  New Invoice
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

            <div className="card invoices-tabs-card">
              <div className="invoices-main-tabs">
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <div className="invoices-tabs">
                      <ul>
                        <li>
                          <Link to="/RuDeLabsInvoiceList" className="active">
                            All Invoice
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card-table">
                  <div className="card-body invoiceList">
                    <div className="table-responsive table-hover">
                      <Table
                        pagination={{
                          total: updatedInvoice.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={updatedInvoice}
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

        <AddVendor 
          setShow={setShow}
          show={show}
        />

        <div className="modal custom-modal fade" id="delete_modal" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Invoice</h3>
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

export default RuDeLabsInvoiceList;


