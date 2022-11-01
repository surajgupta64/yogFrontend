import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormSwitch,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const OfferMarketing = () => {
    const [action, setAction] = useState(false)
    const [ServiceName, setServiceName] = useState("");
    const [ServiceDuration, setServiceDuration] = useState("");
    const [ServiceFees, setServiceFees] = useState("");
    const [DealName, setDealName] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [Discount, setDiscount] = useState("");
    const [NetFees, setNetFees] = useState("");
    const [status, setStatus] = useState(false);
    const url = 'https://yoga-power-node-api.herokuapp.com'


    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const username = user.user.username;
    const token = user.token;
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetch(`${url}/offer/all`, {
            method: "get",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => setResult(json));
    }, []);


    const [result1, setResult1] = useState([]);
    useEffect(() => {
        axios.get(`${url}/service/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult1(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);
    console.log(result);

    const savePackage = () => {
        let data = { ServiceName, ServiceDuration, ServiceFees, DealName, StartDate, EndDate, Discount, NetFees, status }
        // console.warn(data);
        fetch(`${url}/offer/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            // console.warn("resp",resp);;
            resp.json().then(() => {
                alert("successfully submitted")
                setServiceName('')
                setServiceDuration('')
                setServiceFees('')
                setDealName('')
                setStartDate('')
                setEndDate('')
                setDiscount('')
                setNetFees('')
                setStatus(false)
            })
        })
    }

    const getUpdate = (id) => {
        axios.get(`${url}/offer/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(json => {
            setServiceName(json.data.ServiceName)
            setServiceDuration(json.data.duration)
            setServiceFees(json.data.fees)
            setDealName(json.data.dealName)
            setStartDate(moment(json.data.startDate).utc().format('YYYY-MM-DD'))
            setEndDate(moment(json.data.endDate).utc().format('YYYY-MM-DD'))
            setDiscount(json.data.discount)
            setNetFees(json.data.netfees)
        })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Offer Master</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <CRow className="mt-2">
                                <CCol xs={4}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Currency"
                                    >
                                        {result1.map((item, index) => (
                                            <option key={index} value={item.ServiceName}>{item.ServiceName}</option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                                <CCol xs={5}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Currency"
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol xs={3}>
                                    <CButton>Go</CButton>
                                </CCol>
                            </CRow>
                        </div>
                        <div>
                            <CRow>
                                <CCol>
                                    <CButton className="ms-1 mt-2" onClick={() => setAction(!action)}>{action ? 'close' : 'Add New Offer'}</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                    {action &&
                        <div>
                            <CRow className='mt-3'>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Service Name"
                                        value={ServiceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        placeholder="Enter Service Name"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Service Duration"
                                        value={ServiceDuration}
                                        onChange={(e) => setServiceDuration(e.target.value)}
                                        placeholder="Enter Service Duration"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Service Fees"
                                        value={ServiceFees}
                                        onChange={(e) => setServiceFees(e.target.value)}
                                        placeholder="Enter Service Fees"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Deal Name"
                                        value={DealName}
                                        onChange={(e) => setDealName(e.target.value)}
                                        placeholder="Enter Deal Name"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="date"
                                        id="exampleFormControlInput1"
                                        label="Start Date"
                                        value={StartDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="Enter Start Date"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="date"
                                        id="exampleFormControlInput1"
                                        label="End Date"
                                        value={EndDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="Enter End Date"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Discount"
                                        value={Discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        placeholder="Enter Discount"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Net Fees"
                                        value={NetFees}
                                        onChange={(e) => setNetFees(e.target.value)}
                                        placeholder="Enter Discount"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSwitch size="xl" label="Status" style={{ defaultChecked: 'false' }}
                                        value={status}
                                        onChange={() => setStatus(!status)} />
                                    <CButton className="mt-2" onClick={savePackage}>Save</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    }
                </CForm>
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Date</CTableHeaderCell>
                            <CTableHeaderCell>Service</CTableHeaderCell>
                            <CTableHeaderCell>Deal Name</CTableHeaderCell>
                            <CTableHeaderCell>Start Date</CTableHeaderCell>
                            <CTableHeaderCell>End Date</CTableHeaderCell>
                            <CTableHeaderCell>Services Duration</CTableHeaderCell>
                            <CTableHeaderCell>Services Fee</CTableHeaderCell>
                            <CTableHeaderCell>Discount Rate</CTableHeaderCell>
                            <CTableHeaderCell>Discount Value</CTableHeaderCell>
                            <CTableHeaderCell>Status</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {result.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{item.Package_Name}</CTableDataCell>
                                <CTableDataCell>{item.duration}</CTableDataCell>
                                <CTableDataCell>{item.Package_Name}</CTableDataCell>
                                <CTableDataCell>{item.duration}</CTableDataCell>
                                <CTableDataCell>{item.Package_Name}</CTableDataCell>
                                <CTableDataCell>{item.duration}</CTableDataCell>
                                <CTableDataCell>{item.Package_Name}</CTableDataCell>
                                <CTableDataCell>{item.duration}</CTableDataCell>
                                <CTableDataCell>{item.fees}</CTableDataCell>
                                <CTableDataCell><CFormSwitch size="xl" style={{ cursor: 'pointer' }} value={item.status} checked={item.status} onChange={(e) => setUpdateStatus(!item.status)} /></CTableDataCell>
                                <CTableDataCell> <FaEdit style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => getUpdate(item._id)} size='20px' /> <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /> </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard >
    );
};

export default OfferMarketing;