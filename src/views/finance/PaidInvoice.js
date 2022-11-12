import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import moment from 'moment'
const url = 'https://yog-api.herokuapp.com'

const PaidInvoice = () => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
        getInvoice()
    }, []);

    function getInvoice() {
        axios.get(`${url}/invoice/all`, {
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
    }

    function deleteData(id) {
        if (confirm('You want to delete this')) {
            fetch(`${url}/invoice/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getInvoice()
                })
            })
        }
        return
    }


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Paid Invoice</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex justify-content-center mb-2'>
                            <CCol lg={5} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect
                                        id="inputGroupSelect04"
                                        aria-label="Example select with button addon"
                                    >
                                        <option>Name</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                    <CFormInput
                                        placeholder="Search"
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2"
                                    />
                                    <CButton type="button" color="primary">
                                        Search
                                    </CButton>
                                </CInputGroup>
                            </CCol>
                            <CCol></CCol>
                        </CRow>
                        <CRow >
                            <CCol lg={2} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        All
                                    </CInputGroupText>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Sep</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={2} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Invoice Type</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={2} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Service</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={2} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Sales Rep</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={2} sm={6} className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01">
                                        <option>Select Trainer</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={2} sm={6} className='mb-2' >
                                <CButton color="primary" className='float-end '>
                                    <CIcon icon={cilPlus} />
                                    {' '}New Invoice
                                </CButton>
                            </CCol>
                        </CRow>

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">MemberID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Member Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Invoice No
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        End Date
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Counseller</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amonut</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pending</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {result1.filter((list) => list.username === username && list.paidAmount > 0)
                                    .map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{centerCode}MEM{index + 1}</CTableDataCell>
                                            <CTableDataCell>{item.MemberName}</CTableDataCell>
                                            <CTableDataCell>{item.InvoiceNo}</CTableDataCell>
                                            <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                            <CTableDataCell>{moment(item.startDate).format("MM-DD-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{moment(item.endDate).format("MM-DD-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{item.counseller}</CTableDataCell>
                                            <CTableDataCell>{item.totalAmount}</CTableDataCell>
                                            <CTableDataCell>{item.tax}%</CTableDataCell>
                                            <CTableDataCell>{item.paidAmount}</CTableDataCell>
                                            <CTableDataCell>{item.pendingAmount}</CTableDataCell>
                                            <CTableDataCell><MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => deleteData(item._id)} size='20px' /></CTableDataCell>
                                        </CTableRow>
                                    ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PaidInvoice
